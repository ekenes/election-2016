import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import FeatureLayer = require("esri/layers/FeatureLayer");
import PopupTemplate = require("esri/PopupTemplate");
import ExpressionInfo = require("esri/popup/ExpressionInfo");
import FieldInfo = require("esri/popup/FieldInfo");
import FieldInfoFormat = require("esri/popup/support/FieldInfoFormat");
import Swipe = require("esri/widgets/Swipe");
import Legend = require("esri/widgets/Legend");
import Expand = require("esri/widgets/Expand");
import LabelClass = require("esri/layers/support/LabelClass");
import Color = require("esri/Color");
import Font = require("esri/symbols/Font");

import { SimpleRenderer } from "esri/renderers";
import { CIMSymbol, SimpleFillSymbol, TextSymbol } from "esri/symbols";
import { UniqueValueRenderer } from "esri/rasterRenderers";
import { TextContent } from "esri/popup/content";

( async () => {
  const map = new EsriMap({
    basemap: {
      portalItem: {
        id: "fbfb62f3599f41e5a77845f863e2872f"
      }
    }
  });

  const maxScale = 4622324/16;
  const referenceScale = 2311162;

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-95, 40],
    scale: referenceScale * 8,
    constraints: {
      minScale: 0,
      maxScale
    },
    highlightOptions: {
      fillOpacity: 0
    }
  });

  // PRS_DEM_12
  // PRS_REP_12
  // PRS_OTH_12

  // PRS_DEM_16
  // PRS_REP_16
  // PRS_OTH_16

  // ↑↓

  const rColorCIM = [220, 75, 0, 255]; // [237, 81, 81, 255];
  const dColorCIM = [60, 108, 204, 255]; // [20, 158, 206, 255];
  const oColorCIM = [224, 206, 0, 255]; // [167, 198, 54, 255];   145, 217, 0
  const borderColorCIM100 = [133, 32, 1, 255];

  const rColor = "rgba(220, 75, 0, 1)"// "#ed5151";  dc4b00
  const dColor = "rgba(60, 108, 204,1)"// "#149ece";  3c6ccc
  const oColor = "rgba(224, 206, 0, 1)";// "rgba(224, 206, 0, 1)"// "#a7c636";  #91d900  #a87132
  const haloColor = "#f7f7f7";
  const oHaloColor = "rgba(181, 166, 0, 1)";// = "#4b4b4b";
  const haloSize = 1;

  const polygonLayer = new FeatureLayer({
    portalItem: {
      id: "4f03bcde997e4badbef186d0c05f5a9a"
    },
    title: "U.S. states",
    opacity: 0.3,
    renderer: new UniqueValueRenderer({
      valueExpression: `
        var dem16 = $feature.SUM_PRS_DEM_16;
        var rep16 = $feature.SUM_PRS_REP_16;
        var oth16 = $feature.SUM_PRS_OTH_16;

        var winner16 = Decode( Max([dem16, rep16, oth16]),
          dem16, 'Democrat',
          rep16, 'Republican',
          oth16, 'Other',
        'n/a' );

        return winner16
      `,
      valueExpressionTitle: "Winner by party",
      defaultSymbol: null,
      uniqueValueInfos: [{
        value: "Republican",
        label: "Republican",
        symbol: new SimpleFillSymbol({
          color: rColor,
          outline: null
        })
      }, {
        value: "Democrat",
        label: "Democrat",
        symbol: new SimpleFillSymbol({
          color: dColor,
          outline: null
        })
      }]
    }),
    popupTemplate: new PopupTemplate({
      title: "{STATE}",
      fieldInfos: [
        new FieldInfo({
          fieldName: "SUM_PRS_DEM_12",
          label: "2012 Democrat votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_REP_12",
          label: "2012 Republican votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_OTH_12",
          label: "2012 Other votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_DEM_16",
          label: "2016 Democrat votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_REP_16",
          label: "2016 Republican votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_OTH_16",
          label: "2016 Other votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        })
      ],
      content: [
        new TextContent({
          text: `
            The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>
            candidate won {STATE} by a margin of {expression/winner-margin} points.
            The {expression/winner-votes} votes cast for the winner comprise
            {expression/winner-percent-state-votes} of the total votes cast in the state.
          `
        }),
        new TextContent({
          text: `
            <div class="table-container">
              Votes in 2016 and the change from 2012
              <br/>
              <br/>
              <table class="esri-widget popup">
                <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
                <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{SUM_PRS_DEM_16}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem12diff16}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem12change16}</span></td></tr>
                <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{SUM_PRS_REP_16}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep12diff16}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep12change16}</span></td></tr>
                <tr class="oth"><td><span style='color:${oHaloColor}; font-weight:bolder'>Other</span></td><td class="num">{SUM_PRS_OTH_16}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth12diff16}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth12change16}</span></td></tr>
              </table>
            </div>
          `
        })
      ],
      expressionInfos: [
        new ExpressionInfo({
          title: "winner % of state votes",
          name: "winner-percent-state-votes",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            var winnerTotal = Max(all);
            return Text(winnerTotal/Sum(all), "#%");
          `
        }),
        new ExpressionInfo({
          title: "winner votes",
          name: "winner-votes",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            return Text(Max(all), "#,###");
          `
        }),
        new ExpressionInfo({
          title: "winner-color",
          name: "winner-color",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            Decode( Max(all),
              dem, "${dColor}",
              rep, "${rColor}",
              oth, "${oColor}",
            "#000000"
            );
          `
        }),
        new ExpressionInfo({
          title: "winner",
          name: "winner",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            Decode( Max(all),
              dem, "Democrat",
              rep, "Republican",
              oth, "other",
            "tie"
            );
          `
        }),
        new ExpressionInfo({
          title: "Democrat change from 2012",
          name: "dem12change16",
          expression: `
            var votes16 = $feature.SUM_PRS_DEM_16;
            var votes12 = $feature.SUM_PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return changeText;
          `
        }),
        new ExpressionInfo({
          title: "Republican change from 2012",
          name: "rep12change16",
          expression: `
            var votes16 = $feature.SUM_PRS_REP_16;
            var votes12 = $feature.SUM_PRS_REP_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return changeText;
          `
        }),
        new ExpressionInfo({
          title: "Other change from 2012",
          name: "oth12change16",
          expression: `
            var votes16 = $feature.SUM_PRS_OTH_16;
            var votes12 = $feature.SUM_PRS_OTH_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return changeText;
          `
        }),
        new ExpressionInfo({
          title: "Democrat diff from 2012",
          name: "dem12diff16",
          expression: `
            var votes16 = $feature.SUM_PRS_DEM_16;
            var votes12 = $feature.SUM_PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return diffText;
          `
        }),
        new ExpressionInfo({
          title: "Republican diff from 2012",
          name: "rep12diff16",
          expression: `
            var votes16 = $feature.SUM_PRS_REP_16;
            var votes12 = $feature.SUM_PRS_REP_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return diffText;
          `
        }),
        new ExpressionInfo({
          title: "Other diff from 2012",
          name: "oth12diff16",
          expression: `
            var votes16 = $feature.SUM_PRS_OTH_16;
            var votes12 = $feature.SUM_PRS_OTH_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return diffText;
          `
        }),
        new ExpressionInfo({
          title: "change-color",
          name: "dem-change-color",
          expression: `
            var votes16 = $feature.SUM_PRS_DEM_16;
            var votes12 = $feature.SUM_PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return IIF(diff > 0, "green", "red");
          `
        }),
        new ExpressionInfo({
          title: "change-color",
          name: "rep-change-color",
          expression: `
            var votes16 = $feature.SUM_PRS_REP_16;
            var votes12 = $feature.SUM_PRS_REP_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return IIF(diff > 0, "green", "red");
          `
        }),
        new ExpressionInfo({
          title: "change-color",
          name: "oth-change-color",
          expression: `
            var votes16 = $feature.SUM_PRS_OTH_16;
            var votes12 = $feature.SUM_PRS_OTH_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return IIF(diff > 0, "green", "red");
          `
        }),
        new ExpressionInfo({
          title: "winner-margin",
          name: "winner-margin",
          expression: `
            var fields = [
              $feature.SUM_PRS_DEM_16,
              $feature.SUM_PRS_REP_16,
              $feature.SUM_PRS_OTH_16
            ];

            var top2 = Top(Reverse(Sort(fields)), 2);
            var winner = First(top2);
            var secondPlace = top2[1];
            var total = Sum(fields);
            return Text( (winner - secondPlace) / total, "#.#%");
          `
        })
      ]
    })
  });

  const polygonChangeLayer = new FeatureLayer({
    portalItem: {
      id: "4f03bcde997e4badbef186d0c05f5a9a"
    },
    title: "U.S. states",
    opacity: 0.3,
    renderer: new UniqueValueRenderer({
      valueExpression: `
        var dem12 = $feature.SUM_PRS_DEM_12;
        var rep12 = $feature.SUM_PRS_REP_12;
        var oth12 = $feature.SUM_PRS_OTH_12;

        var winner12 = Decode( Max([dem12, rep12, oth12]),
          dem12, 'Democrat 2012',
          rep12, 'Republican 2012',
          oth12, 'Other 2012',
        'n/a' );

        var dem16 = $feature.SUM_PRS_DEM_16;
        var rep16 = $feature.SUM_PRS_REP_16;
        var oth16 = $feature.SUM_PRS_OTH_16;

        var winner16 = Decode( Max([dem16, rep16, oth16]),
          dem16, 'Democrat 2016',
          rep16, 'Republican 2016',
          oth16, 'Other 2016',
        'n/a' );

        return Concatenate([winner12, winner16], ", ");
      `,
      valueExpressionTitle: "Flipped states",
      defaultSymbol: null,
      uniqueValueInfos: [{
        value: "Democrat 2012, Republican 2016",
        label: "Flipped Republican in 2016",
        symbol: new SimpleFillSymbol({
          color: rColor,
          outline: null
        })
      }, {
        value: "Republican 2012, Democrat 2016",
        label: "Flipped Democrat in 2016",
        symbol: new SimpleFillSymbol({
          color: dColor,
          outline: null
        })
      }]
    }),
    popupTemplate: new PopupTemplate({
      title: "{STATE}",
      fieldInfos: [
        new FieldInfo({
          fieldName: "SUM_PRS_DEM_12",
          label: "2012 Democrat votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_REP_12",
          label: "2012 Republican votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_OTH_12",
          label: "2012 Other votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_DEM_16",
          label: "2016 Democrat votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_REP_16",
          label: "2016 Republican votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        }),
        new FieldInfo({
          fieldName: "SUM_PRS_OTH_16",
          label: "2016 Other votes",
          format: new FieldInfoFormat({
            places: 0,
            digitSeparator: true
          })
        })
      ],
      content: [
        new TextContent({
          text: `
            The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>
            candidate won {STATE} by a margin of {expression/winner-margin} points.
            The {expression/winner-votes} votes cast for the winner comprise
            {expression/winner-percent-state-votes} of the total votes cast in the state.
          `
        }),
        new TextContent({
          text: `
            <div class="table-container">
              Votes in 2016 and the change from 2012
              <br/>
              <br/>
              <table class="esri-widget popup">
                <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
                <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{SUM_PRS_DEM_16}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem12diff16}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem12change16}</span></td></tr>
                <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{SUM_PRS_REP_16}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep12diff16}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep12change16}</span></td></tr>
                <tr class="oth"><td><span style='color:${oHaloColor}; font-weight:bolder'>Other</span></td><td class="num">{SUM_PRS_OTH_16}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth12diff16}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth12change16}</span></td></tr>
              </table>
            </div>
          `
        })
      ],
      expressionInfos: [
        new ExpressionInfo({
          title: "winner % of state votes",
          name: "winner-percent-state-votes",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            var winnerTotal = Max(all);
            return Text(winnerTotal/Sum(all), "#%");
          `
        }),
        new ExpressionInfo({
          title: "winner votes",
          name: "winner-votes",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            return Text(Max(all), "#,###");
          `
        }),
        new ExpressionInfo({
          title: "winner-color",
          name: "winner-color",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            Decode( Max(all),
              dem, "${dColor}",
              rep, "${rColor}",
              oth, "${oColor}",
            "#000000"
            );
          `
        }),
        new ExpressionInfo({
          title: "winner",
          name: "winner",
          expression: `
            var dem = $feature.SUM_PRS_DEM_16;
            var rep = $feature.SUM_PRS_REP_16;
            var oth = $feature.SUM_PRS_OTH_16;
            var all = [dem, rep, oth];

            Decode( Max(all),
              dem, "Democrat",
              rep, "Republican",
              oth, "other",
            "tie"
            );
          `
        }),
        new ExpressionInfo({
          title: "Democrat change from 2012",
          name: "dem12change16",
          expression: `
            var votes16 = $feature.SUM_PRS_DEM_16;
            var votes12 = $feature.SUM_PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return changeText;
          `
        }),
        new ExpressionInfo({
          title: "Republican change from 2012",
          name: "rep12change16",
          expression: `
            var votes16 = $feature.SUM_PRS_REP_16;
            var votes12 = $feature.SUM_PRS_REP_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return changeText;
          `
        }),
        new ExpressionInfo({
          title: "Other change from 2012",
          name: "oth12change16",
          expression: `
            var votes16 = $feature.SUM_PRS_OTH_16;
            var votes12 = $feature.SUM_PRS_OTH_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return changeText;
          `
        }),
        new ExpressionInfo({
          title: "Democrat diff from 2012",
          name: "dem12diff16",
          expression: `
            var votes16 = $feature.SUM_PRS_DEM_16;
            var votes12 = $feature.SUM_PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return diffText;
          `
        }),
        new ExpressionInfo({
          title: "Republican diff from 2012",
          name: "rep12diff16",
          expression: `
            var votes16 = $feature.SUM_PRS_REP_16;
            var votes12 = $feature.SUM_PRS_REP_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return diffText;
          `
        }),
        new ExpressionInfo({
          title: "Other diff from 2012",
          name: "oth12diff16",
          expression: `
            var votes16 = $feature.SUM_PRS_OTH_16;
            var votes12 = $feature.SUM_PRS_OTH_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
            var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
            return diffText;
          `
        }),
        new ExpressionInfo({
          title: "change-color",
          name: "dem-change-color",
          expression: `
            var votes16 = $feature.SUM_PRS_DEM_16;
            var votes12 = $feature.SUM_PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return IIF(diff > 0, "green", "red");
          `
        }),
        new ExpressionInfo({
          title: "change-color",
          name: "rep-change-color",
          expression: `
            var votes16 = $feature.SUM_PRS_REP_16;
            var votes12 = $feature.SUM_PRS_REP_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return IIF(diff > 0, "green", "red");
          `
        }),
        new ExpressionInfo({
          title: "change-color",
          name: "oth-change-color",
          expression: `
            var votes16 = $feature.SUM_PRS_OTH_16;
            var votes12 = $feature.SUM_PRS_OTH_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return IIF(diff > 0, "green", "red");
          `
        }),
        new ExpressionInfo({
          title: "winner-margin",
          name: "winner-margin",
          expression: `
            var fields = [
              $feature.SUM_PRS_DEM_16,
              $feature.SUM_PRS_REP_16,
              $feature.SUM_PRS_OTH_16
            ];

            var top2 = Top(Reverse(Sort(fields)), 2);
            var winner = First(top2);
            var secondPlace = top2[1];
            var total = Sum(fields);
            return Text( (winner - secondPlace) / total, "#.#%");
          `
        })
      ]
    })
  });

  const sizeExpressionBase = `
    var sizeFactor = When(
      percentStateVotes >= 30, 40,
      percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),
      percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),
      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),
      percentStateVotes > 0, 6 + ((4/0.5) * percentStateVotes),
      // percentStateVotes > 0, (20 * percentStateVotes),
      0
    );

    var scaleFactorBase = ( ${referenceScale} / $view.scale );

    var scaleFactor = When(
      scaleFactorBase >= 1, 1,  // 1
      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6
      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45
      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125
      scaleFactorBase * 3  // 0.1875
    );
    return sizeFactor * scaleFactor;
  `;

  const offsetXExpressionBase = `
    var sizeFactor = When(
      percentStateVotes >= 30, 40,
      percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),
      percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),
      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),
      percentStateVotes > 0, 6 + ((4/0.5) * percentStateVotes),
      // percentStateVotes > 0, (20 * percentStateVotes),
      0
    );

    var scaleFactorBase = ( ${referenceScale} / $view.scale );

    var scaleFactor = When(
      scaleFactorBase >= 1, 1,  // 1
      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6
      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45
      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125
      scaleFactorBase * 3  // 0.1875
    );
    var diameter = sizeFactor * scaleFactor;
    var offset = diameter / 2;
  `;

  const offsetYExpressionBase = `
    var sizeFactor = When(
      percentStateVotes >= 30, 40,
      percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),
      percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),
      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),
      percentStateVotes > 0, 6 + ((4/0.5) * percentStateVotes),
      // percentStateVotes > 0, (20 * percentStateVotes),
      0
    );

    var scaleFactorBase = ( ${referenceScale} / $view.scale );

    var scaleFactor = When(
      scaleFactorBase >= 1, 1,  // 1
      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6
      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45
      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125
      scaleFactorBase * 3  // 0.1875
    );
    var diameter = sizeFactor * scaleFactor;
    var offset = diameter * 0.67;
  `;

  const popupTemplate = new PopupTemplate({
    title: "{Name_1}, {STATE_NAME}",
    fieldInfos: [
      new FieldInfo({
        fieldName: "PRS_DEM_12",
        label: "2012 Democrat votes",
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: "PRS_REP_12",
        label: "2012 Republican votes",
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: "PRS_OTH_12",
        label: "2012 Other votes",
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: "PRS_DEM_16",
        label: "2016 Democrat votes",
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: "PRS_REP_16",
        label: "2016 Republican votes",
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: "PRS_OTH_16",
        label: "2016 Other votes",
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      })
    ],
    content: [
      new TextContent({
        text: `
          The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>
          candidate won this county by a margin of {expression/winner-margin}.
          The {expression/winner-votes} votes cast for the winner comprise
          {expression/winner-percent-state-votes} of the total votes cast in the state.
        `
      }),
      new TextContent({
        text: `
          <div class="table-container">
            Votes in 2016 and the change from 2012
            <br/>
            <br/>
            <table class="esri-widget popup">
              <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
              <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{PRS_DEM_16}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem12diff16}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem12change16}</span></td></tr>
              <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{PRS_REP_16}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep12diff16}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep12change16}</span></td></tr>
              <tr class="oth"><td><span style='color:${oHaloColor}; font-weight:bolder'>Other</span></td><td class="num">{PRS_OTH_16}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth12diff16}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth12change16}</span></td></tr>
            </table>
          </div>
        `
      })
    ],
    expressionInfos: [
      new ExpressionInfo({
        title: "winner % of state votes",
        name: "winner-percent-state-votes",
        expression: `
          var dem = $feature.PRS_DEM_16;
          var rep = $feature.PRS_REP_16;
          var oth = $feature.PRS_OTH_16;
          var all = [dem, rep, oth];

          var winnerTotal = Max(all);
          return Text(winnerTotal/$feature.TOTAL_STATE_VOTES_16, "#%");
        `
      }),
      new ExpressionInfo({
        title: "winner votes",
        name: "winner-votes",
        expression: `
          var dem = $feature.PRS_DEM_16;
          var rep = $feature.PRS_REP_16;
          var oth = $feature.PRS_OTH_16;
          var all = [dem, rep, oth];

          return Text(Max(all), "#,###");
        `
      }),
      new ExpressionInfo({
        title: "winner-color",
        name: "winner-color",
        expression: `
          var dem = $feature.PRS_DEM_16;
          var rep = $feature.PRS_REP_16;
          var oth = $feature.PRS_OTH_16;
          var all = [dem, rep, oth];

          Decode( Max(all),
            dem, "${dColor}",
            rep, "${rColor}",
            oth, "${oColor}",
          "#000000"
          );
        `
      }),
      new ExpressionInfo({
        title: "winner",
        name: "winner",
        expression: `
          var dem = $feature.PRS_DEM_16;
          var rep = $feature.PRS_REP_16;
          var oth = $feature.PRS_OTH_16;
          var all = [dem, rep, oth];

          Decode( Max(all),
            dem, "Democrat",
            rep, "Republican",
            oth, "other",
          "tie"
          );
        `
      }),
      new ExpressionInfo({
        title: "Democrat change from 2012",
        name: "dem12change16",
        expression: `
          var votes16 = $feature.PRS_DEM_16;
          var votes12 = $feature.PRS_DEM_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: "Republican change from 2012",
        name: "rep12change16",
        expression: `
          var votes16 = $feature.PRS_REP_16;
          var votes12 = $feature.PRS_REP_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: "Other change from 2012",
        name: "oth12change16",
        expression: `
          var votes16 = $feature.PRS_OTH_16;
          var votes12 = $feature.PRS_OTH_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: "Democrat diff from 2012",
        name: "dem12diff16",
        expression: `
          var votes16 = $feature.PRS_DEM_16;
          var votes12 = $feature.PRS_DEM_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: "Republican diff from 2012",
        name: "rep12diff16",
        expression: `
          var votes16 = $feature.PRS_REP_16;
          var votes12 = $feature.PRS_REP_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: "Other diff from 2012",
        name: "oth12diff16",
        expression: `
          var votes16 = $feature.PRS_OTH_16;
          var votes12 = $feature.PRS_OTH_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: "change-color",
        name: "dem-change-color",
        expression: `
          var votes16 = $feature.PRS_DEM_16;
          var votes12 = $feature.PRS_DEM_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          return IIF(diff > 0, "green", "red");
        `
      }),
      new ExpressionInfo({
        title: "change-color",
        name: "rep-change-color",
        expression: `
          var votes16 = $feature.PRS_REP_16;
          var votes12 = $feature.PRS_REP_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          return IIF(diff > 0, "green", "red");
        `
      }),
      new ExpressionInfo({
        title: "change-color",
        name: "oth-change-color",
        expression: `
          var votes16 = $feature.PRS_OTH_16;
          var votes12 = $feature.PRS_OTH_12;
          var diff = votes16 - votes12;
          var change = ( (votes16 - votes12) / votes12 );
          return IIF(diff > 0, "green", "red");
        `
      }),
      new ExpressionInfo({
        title: "winner-margin",
        name: "winner-margin",
        expression: `
          var fields = [
            $feature.PRS_DEM_16,
            $feature.PRS_REP_16,
            $feature.PRS_OTH_16
          ];

          var top2 = Top(Reverse(Sort(fields)), 2);
          var winner = First(top2);
          var secondPlace = top2[1];
          var total = Sum(fields);
          return Text( (winner - secondPlace) / total, "#.#%");
        `
      })
    ]
  });

  const changeLayer = new FeatureLayer({
    portalItem: {
      id: "ba48def248cb45bebb234aa346c97676"
    },
    legendEnabled: false,
    renderer: new SimpleRenderer({
      symbol: new CIMSymbol({
        data: {
          type: "CIMSymbolReference",
          symbol: {
            type: "CIMPointSymbol",
            symbolLayers: [
              {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: "Relative",
                primitiveName: "democrat-positive-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: dColorCIM
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true
              },
              {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: "Relative",
                primitiveName: "democrat-negative-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMLineSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidStroke",
                          enable: true,
                          color: dColorCIM,
                          width: 2
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              }, {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: "Relative",
                primitiveName: "republican-positive-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: rColorCIM
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              }, {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: "Relative",
                primitiveName: "republican-negative-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMLineSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidStroke",
                          enable: true,
                          color: rColorCIM,
                          width: 2
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              },
              {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: "Relative",
                primitiveName: "other-positive-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: oColorCIM,
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              }, {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: "Relative",
                primitiveName: "other-negative-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMLineSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidStroke",
                          enable: true,
                          color: oColorCIM,
                          width: 2
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              }
            ]
          },
          primitiveOverrides: [
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "democrat-positive-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Democrat votes",
                expression: `
                  var dem16 = $feature.PRS_DEM_16;
                  var dem12 = $feature.PRS_DEM_12;
                  var change = dem16 - dem12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;

                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "democrat-negative-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Democrat votes",
                expression: `
                  var dem16 = $feature.PRS_DEM_16;
                  var dem12 = $feature.PRS_DEM_12;
                  var change = dem16 - dem12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-positive-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Republican votes",
                expression: `
                  var rep16 = $feature.PRS_REP_16;
                  var rep12 = $feature.PRS_REP_12;
                  var change = rep16 - rep12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-negative-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Republican votes",
                expression: `
                  var rep16 = $feature.PRS_REP_16;
                  var rep12 = $feature.PRS_REP_12;
                  var change = rep16 - rep12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-positive-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Other votes",
                expression: `
                  var oth16 = $feature.PRS_OTH_16;
                  var oth12 = $feature.PRS_OTH_12;
                  var change = oth16 - oth12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-negative-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Other votes",
                expression: `
                  var oth16 = $feature.PRS_OTH_16;
                  var oth12 = $feature.PRS_OTH_12;
                  var change = oth16 - oth12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },

             // offset overrides

            {
              type: "CIMPrimitiveOverride",
              primitiveName: "democrat-positive-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Democrat votes",
                expression: `
                  var dem16 = $feature.PRS_DEM_16;
                  var dem12 = $feature.PRS_DEM_12;
                  var change = dem16 - dem12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetXExpressionBase}
                  return offset * -1;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "democrat-negative-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Democrat votes",
                expression: `
                  var dem16 = $feature.PRS_DEM_16;
                  var dem12 = $feature.PRS_DEM_12;
                  var change = dem16 - dem12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetXExpressionBase}
                  return offset * -1;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-positive-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Republican votes",
                expression: `
                  var rep16 = $feature.PRS_REP_16;
                  var rep12 = $feature.PRS_REP_12;
                  var change = rep16 - rep12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetXExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-negative-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Republican votes",
                expression: `
                  var rep16 = $feature.PRS_REP_16;
                  var rep12 = $feature.PRS_REP_12;
                  var change = rep16 - rep12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetXExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-positive-votes",
              propertyName: "OffsetY",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Other votes",
                expression: `
                  var oth16 = $feature.PRS_OTH_16;
                  var oth12 = $feature.PRS_OTH_12;
                  var change = oth16 - oth12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetYExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-negative-votes",
              propertyName: "OffsetY",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Other votes",
                expression: `
                  var oth16 = $feature.PRS_OTH_16;
                  var oth12 = $feature.PRS_OTH_12;
                  var change = oth16 - oth12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetYExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            }
          ]
        }
      })
    }),
    labelsVisible: true,
    labelingInfo: [

      // DEMOCRAT label classes

      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 10",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_DEM_16;
            var value12 = $feature.PRS_DEM_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -50,
          yoffset: -25
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 10",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_DEM_16;
            var value12 = $feature.PRS_DEM_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 5",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_DEM_16;
            var value12 = $feature.PRS_DEM_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 1",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_DEM_16;
            var value12 = $feature.PRS_DEM_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -30,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_DEM_16;
            var value12 = $feature.PRS_DEM_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -20,
          yoffset: -10
        })
      }),


      // REPUBLICAN label classes

      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 10",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_REP_16;
            var value12 = $feature.PRS_REP_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 60,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 10",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_REP_16;
            var value12 = $feature.PRS_REP_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 35,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 5",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_REP_16;
            var value12 = $feature.PRS_REP_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 1",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_REP_16;
            var value12 = $feature.PRS_REP_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_REP_16;
            var value12 = $feature.PRS_REP_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 10,
          yoffset: -10
        })
      }),

      // OTHER label classes

      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 10",
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_OTH_16;
            var value12 = $feature.PRS_OTH_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 10",
        labelExpressionInfo: {
          expression: `
          var value16 = $feature.PRS_OTH_16;
          var value12 = $feature.PRS_OTH_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 5)
        `,
        labelExpressionInfo: {
          expression: `
          var value16 = $feature.PRS_OTH_16;
          var value12 = $feature.PRS_OTH_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 30
        })
      }),

      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 1)
        `,
        labelExpressionInfo: {
          expression: `
          var value16 = $feature.PRS_OTH_16;
          var value12 = $feature.PRS_OTH_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 0.5)
        `,
        labelExpressionInfo: {
          expression: `
            var value16 = $feature.PRS_OTH_16;
            var value12 = $feature.PRS_OTH_12;
            var change = value16 - value12;
            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 10,
          yoffset: 10
        })
      })

    ],
    popupTemplate
  });

  const results2016Layer = new FeatureLayer({
    portalItem: {
      id: "ba48def248cb45bebb234aa346c97676"
    },
    legendEnabled: false,
    renderer: new SimpleRenderer({
      symbol: new CIMSymbol({
        data: {
          type: "CIMSymbolReference",
          symbol: {
            type: "CIMPointSymbol",
            symbolLayers: [
              {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: "Relative",
                primitiveName: "other-positive-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: oColorCIM,
                        }, {
                          type: "CIMSolidStroke",
                          enable: true,
                          color: [161, 148, 0, 255],
                          width: 1
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              },
              {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: "Relative",
                primitiveName: "democrat-positive-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: dColorCIM
                        }, {
                          type: "CIMSolidStroke",
                          enable: true,
                          color: [42, 78, 150, 255],
                          width: 1
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true
              },
              {
                type: "CIMVectorMarker",
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: "Relative",
                primitiveName: "republican-positive-votes",
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [8.5, 0.2],
                          [7.06, 0.33],
                          [5.66, 0.7],
                          [4.35, 1.31],
                          [3.16, 2.14],
                          [2.14, 3.16],
                          [1.31, 4.35],
                          [0.7, 5.66],
                          [0.33, 7.06],
                          [0.2, 8.5],
                          [0.33, 9.94],
                          [0.7, 11.34],
                          [1.31, 12.65],
                          [2.14, 13.84],
                          [3.16, 14.86],
                          [4.35, 15.69],
                          [5.66, 16.3],
                          [7.06, 16.67],
                          [8.5, 16.8],
                          [9.94, 16.67],
                          [11.34, 16.3],
                          [12.65, 15.69],
                          [13.84, 14.86],
                          [14.86, 13.84],
                          [15.69, 12.65],
                          [16.3, 11.34],
                          [16.67, 9.94],
                          [16.8, 8.5],
                          [16.67, 7.06],
                          [16.3, 5.66],
                          [15.69, 4.35],
                          [14.86, 3.16],
                          [13.84, 2.14],
                          [12.65, 1.31],
                          [11.34, 0.7],
                          [9.94, 0.33],
                          [8.5, 0.2]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: rColorCIM
                        }, {
                          type: "CIMSolidStroke",
                          enable: true,
                          color: [153, 54, 3, 255],
                          width: 1
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              }
            ]
          },
          primitiveOverrides: [
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "democrat-positive-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Democrat votes",
                expression: `
                  var percentStateVotes = ( $feature.PRS_DEM_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;

                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-positive-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Republican votes",
                expression: `
                  var percentStateVotes = ( $feature.PRS_REP_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;

                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-positive-votes",
              propertyName: "Size",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Other votes",
                expression: `
                  var percentStateVotes = ( $feature.PRS_OTH_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;

                ` + sizeExpressionBase,
                returnType: "Default"
              }
            },

             // offset overrides

            {
              type: "CIMPrimitiveOverride",
              primitiveName: "democrat-positive-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Democrat votes",
                expression: `
                  var percentStateVotes = ( $feature.PRS_DEM_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;

                  ${offsetXExpressionBase}
                  return offset * -1;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-positive-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Republican votes",
                expression: `
                  var percentStateVotes = ( $feature.PRS_REP_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetXExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-positive-votes",
              propertyName: "OffsetY",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Other votes",
                expression: `
                  var percentStateVotes = ( $feature.PRS_OTH_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;

                  ${offsetYExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            }
          ]
        }
      })
    }),
    labelsVisible: true,
    labelingInfo: [

      // DEMOCRAT label classes

      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 10",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_DEM_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -50,
          yoffset: -25
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 10",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_DEM_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 5",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_DEM_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 1",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_DEM_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -30,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_DEM_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -20,
          yoffset: -10
        })
      }),


      // REPUBLICAN label classes

      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 10",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_REP_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 50,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 10",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_REP_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 40,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 5",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_REP_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 30,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 1",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_REP_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_REP_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 10,
          yoffset: -10
        })
      }),

      // OTHER label classes

      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 10",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_OTH_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: "ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 10",
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_OTH_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 5)
        `,
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_OTH_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 30
        })
      }),

      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 1)
        `,
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_OTH_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 20,
          yoffset: 20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 0.5)
        `,
        labelExpressionInfo: {
          expression: `
            Text($feature.PRS_OTH_16, '#,###');
          `
        },
        deconflictionStrategy: "none",
        labelPlacement: "center-center",
        symbol: new TextSymbol({
          font: new Font({
            weight: "bold",
            family: "Noto Sans",
            size: "10pt"
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oHaloColor),
          xoffset: 10,
          yoffset: 10
        })
      })

    ],
    popupTemplate
  });

  view.map.add(polygonLayer);
  view.map.add(polygonChangeLayer);
  view.map.add(changeLayer);
  view.map.add(results2016Layer);

  const swipe = new Swipe({
    view,
    leadingLayers: [ changeLayer, polygonChangeLayer ],
    trailingLayers: [ results2016Layer, polygonLayer ],
    position: 90
  });
  view.ui.add(swipe);

  const totalLegend = document.getElementById("total-legend") as HTMLDivElement;
  const changeLegend = document.getElementById("change-legend") as HTMLDivElement;
  const infoToggle = document.getElementById("info-toggle") as HTMLDivElement;

  new Legend({
    view,
    container: "change-legend-container",
    layerInfos: [{
      layer: polygonChangeLayer
    }] as any
  });
  view.ui.add("change-legend", "bottom-left");

  new Legend({
    view,
    container: "total-legend-container",
    layerInfos: [{
      layer: polygonLayer
    }] as any
  });

  view.ui.add(changeLegend, "bottom-left");
  view.ui.add(totalLegend, "bottom-right");
  view.ui.add(infoToggle, "top-left");

  let visibilityEnabled = true;
  const toggleInfoVisibility = function () {
    changeLegend.style.display = changeLegend.style.display === "none" ? "block" : "none";
    totalLegend.style.display = totalLegend.style.display === "none" ? "block" : "none";
    visibilityEnabled = !visibilityEnabled;
  }

  infoToggle.addEventListener("click", toggleInfoVisibility);

  swipe.watch( "position", (position) => {
    if (!visibilityEnabled){
      return;
    }

    const threshold = 50;
    if (position <= 85){
      totalLegend.style.display = "block";
      const opacity = (35 - (position - threshold)) * 3.5;
      totalLegend.style.opacity = ( opacity * 0.01 ).toString();
    } else {
      totalLegend.style.display = "none";
    }

    if (position <= 50){
      changeLegend.style.display = "block";
      const opacity = (35 - (threshold - position)) * 3.5;
      changeLegend.style.opacity = ( opacity * 0.01 ).toString();
    }

    if (position <= 15){
      changeLegend.style.opacity = "0";
      changeLegend.style.display = "none";
    }
  });

  function updateLegendHeight () {
    changeLegend.style.height = null;
    changeLegend.style.overflow = null;

    totalLegend.style.height = null;
    totalLegend.style.overflow = null;

    if(view.heightBreakpoint === "small"){
      changeLegend.style.height = "450px";
      changeLegend.style.overflow = "auto";

      totalLegend.style.height = "450px";
      totalLegend.style.overflow = "auto";

    }
    if (view.heightBreakpoint === "xsmall"){
      changeLegend.style.height = "300px";
      changeLegend.style.overflow = "auto";

      totalLegend.style.height = "300px";
      totalLegend.style.overflow = "auto";
    }
  }

  view.watch("heightBreakpoint", updateLegendHeight);
  await view.when(updateLegendHeight);

})();
