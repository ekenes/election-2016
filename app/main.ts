import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import FeatureLayer = require("esri/layers/FeatureLayer");
import PopupTemplate = require("esri/PopupTemplate");
import ExpressionInfo = require("esri/popup/ExpressionInfo");
import FieldInfo = require("esri/popup/FieldInfo");
import FieldInfoFormat = require("esri/popup/support/FieldInfoFormat");
import Swipe = require("esri/widgets/Swipe");
import Legend = require("esri/widgets/Legend");
import LabelClass = require("esri/layers/support/LabelClass");
import Color = require("esri/Color");
import Font = require("esri/symbols/Font");

import { SimpleRenderer } from "esri/renderers";
import { CIMSymbol, SimpleFillSymbol, TextSymbol } from "esri/symbols";
import { UniqueValueRenderer } from "esri/rasterRenderers";
import { TextContent } from "esri/popup/content";
import { years, fieldInfos, referenceScale, maxScale, dColor, rColor, oTextColor, oColor, dColorCIM, oColorCIM, rColorCIM, haloColor, haloSize, scaleThreshold, stateReferenceScale } from "./config";
import { colorDiffPopupBase, votesNextBase, diffTextBase, diffLabelText, sizeExpressionBase, offsetYTotalExpressionBase, offsetXTotalExpressionBase, offsetXExpressionBase, sizeTotalExpressionBase, offsetYTotalChangeExpressionBase, offsetXTotalChangeExpressionBase, sizeTotalChangeExpressionBase, offsetYExpressionBase } from "./expressionUtils";
import { createCircleSymbolLayer, cimCircleGeometry } from "./symbolUtils";

( async () => {
  const map = new EsriMap({
    basemap: {
      portalItem: {
        id: `fbfb62f3599f41e5a77845f863e2872f`
      }
    }
  });

  const view = new MapView({
    container: `viewDiv`,
    map: map,
    center: [-95, 40],
    scale: referenceScale * 8,
    constraints: {
      minScale: 0,
      maxScale
    },
    highlightOptions: {
      fillOpacity: 0
    },
    breakpoints: {
      large: 1200,
      medium: 992,
      small: 768,
      xsmall: 544
    },
    popup: {
      collapseEnabled: false
    }
  });

  const statePopupTemplate = new PopupTemplate({
    title: `{STATE}`,
    fieldInfos: [
      new FieldInfo({
        fieldName: fieldInfos.democrat.state.previous.name,
        label: fieldInfos.democrat.state.previous.label,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.republican.state.previous.name,
        label: fieldInfos.republican.state.previous.label,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.other.state.previous.name,
        label: fieldInfos.other.state.previous.label,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.democrat.state.next.name,
        label: fieldInfos.democrat.state.next.label,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.republican.state.next.name,
        label: fieldInfos.republican.state.next.label,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.other.state.next.name,
        label: fieldInfos.other.state.next.label,
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
            Votes in ${years.next} and the change from ${years.previous}
            <br/>
            <br/>
            <table class="esri-widget popup">
              <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
              <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{${fieldInfos.democrat.state.next.name}}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}change${years.next}}</span></td></tr>
              <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{${fieldInfos.republican.state.next.name}}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}change${years.next}}</span></td></tr>
              <tr class="oth"><td><span style='color:${oTextColor}; font-weight:bolder'>Other</span></td><td class="num">{${fieldInfos.other.state.next.name}}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}change${years.next}}</span></td></tr>
            </table>
          </div>
        `
      })
    ],
    expressionInfos: [
      new ExpressionInfo({
        title: `winner % of state votes`,
        name: `winner-percent-state-votes`,
        expression: `
          ${votesNextBase}

          var winnerTotal = Max(all);
          return Text(winnerTotal/Sum(all), "#%");
        `
      }),
      new ExpressionInfo({
        title: `winner votes`,
        name: `winner-votes`,
        expression: `
          ${votesNextBase}

          return Text(Max(all), "#,###");
        `
      }),
      new ExpressionInfo({
        title: `winner-color`,
        name: `winner-color`,
        expression: `
          ${votesNextBase}

          Decode( Max(all),
            dem, "${dColor}",
            rep, "${rColor}",
            oth, "${oColor}",
          "#000000"
          );
        `
      }),
      new ExpressionInfo({
        title: `winner`,
        name: `winner`,
        expression: `
          ${votesNextBase}

          Decode( Max(all),
            dem, "Democrat",
            rep, "Republican",
            oth, "other",
          "tie"
          );
        `
      }),
      new ExpressionInfo({
        title: `Democrat change from ${years.previous}`,
        name: `dem${years.previous}change${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.democrat.state.next.name};
          var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
          ${diffTextBase}
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: `Republican change from ${years.previous}`,
        name: `rep${years.previous}change${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.republican.state.next.name};
          var votesPrevious = $feature.${fieldInfos.republican.state.previous.name};
          ${diffTextBase}
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: `Other change from ${years.previous}`,
        name: `oth${years.previous}change${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.other.state.next.name};
          var votesPrevious = $feature.${fieldInfos.other.state.previous.name};
          ${diffTextBase}
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: `Democrat diff from ${years.previous}`,
        name: `dem${years.previous}diff${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.democrat.state.next.name};
          var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
          ${diffTextBase}
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: `Republican diff from ${years.previous}`,
        name: `rep${years.previous}diff${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.republican.state.next.name};
          var votesPrevious = $feature.${fieldInfos.republican.state.previous.name};
          ${diffTextBase}
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: `Other diff from ${years.previous}`,
        name: `oth${years.previous}diff${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.other.state.next.name};
          var votesPrevious = $feature.${fieldInfos.other.state.previous.name};
          ${diffTextBase}
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: `change-color`,
        name: `dem-change-color`,
        expression: `
          var votesNext = $feature.${fieldInfos.democrat.state.next.name};
          var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
          ${colorDiffPopupBase}
        `
      }),
      new ExpressionInfo({
        title: `change-color`,
        name: `rep-change-color`,
        expression: `
          var votesNext = $feature.${fieldInfos.republican.state.next.name};
          var votesPrevious = $feature.${fieldInfos.republican.state.previous.name};
          ${colorDiffPopupBase}
        `
      }),
      new ExpressionInfo({
        title: `change-color`,
        name: `oth-change-color`,
        expression: `
          var votesNext = $feature.${fieldInfos.other.state.next.name};
          var votesPrevious = $feature.${fieldInfos.other.state.previous.name};
          ${colorDiffPopupBase}
        `
      }),
      new ExpressionInfo({
        title: `winner-margin`,
        name: `winner-margin`,
        expression: `
          var fields = [
            $feature.${fieldInfos.democrat.state.next.name},
            $feature.${fieldInfos.republican.state.next.name},
            $feature.${fieldInfos.other.state.next.name}
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

  const stateElectoralResultsLayer = new FeatureLayer({
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    title: `Results by state`,
    opacity: 0.3,
    renderer: new UniqueValueRenderer({
      valueExpression: `
        var dem = $feature.${fieldInfos.democrat.state.next.name};
        var rep = $feature.${fieldInfos.republican.state.next.name};
        var oth = $feature.${fieldInfos.other.state.next.name};

        var winner = Decode( Max([dem, rep, oth]),
          dem, 'Democrat',
          rep, 'Republican',
          oth, 'Other',
        'n/a' );

        return winner;
      `,
      defaultSymbol: null,
      uniqueValueInfos: [{
        value: `Republican`,
        label: `R - Trump (304)`,
        symbol: new SimpleFillSymbol({
          color: rColor,
          outline: null
        })
      }, {
        value: `Democrat`,
        label: `D - Clinton (227)`,
        symbol: new SimpleFillSymbol({
          color: dColor,
          outline: null
        })
      }]
    }),
    popupTemplate: statePopupTemplate,
    popupEnabled: false
  });

  const swingStatesLayer = new FeatureLayer({
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    title: `Swing states`,
    opacity: 0.3,
    renderer: new UniqueValueRenderer({
      valueExpression: `
        var demPrevious = $feature.${fieldInfos.democrat.state.previous.name};
        var repPrevious = $feature.${fieldInfos.republican.state.previous.name};
        var othPrevious = $feature.${fieldInfos.other.state.previous.name};

        var winnerPrevious = Decode( Max([demPrevious, repPrevious, othPrevious]),
          demPrevious, 'Democrat ${years.previous}',
          repPrevious, 'Republican ${years.previous}',
          othPrevious, 'Other ${years.previous}',
        'n/a' );

        var demNext = $feature.${fieldInfos.democrat.state.next.name};
        var repNext = $feature.${fieldInfos.republican.state.next.name};
        var othNext = $feature.${fieldInfos.other.state.next.name};

        var winnerNext = Decode( Max([demNext, repNext, othNext]),
        demNext, 'Democrat ${years.next}',
        repNext, 'Republican ${years.next}',
        othNext, 'Other ${years.next}',
        'n/a' );

        return Concatenate([winnerPrevious, winnerNext], ", ");
      `,
      defaultSymbol: null,
      uniqueValueInfos: [{
        value: `Democrat ${years.previous}, Republican ${years.next}`,
        label: `Flipped Republican in ${years.next}`,
        symbol: new SimpleFillSymbol({
          color: rColor,
          outline: null
        })
      }, {
        value: `Republican ${years.previous}, Democrat ${years.next}`,
        label: `Flipped Democrat in ${years.next}`,
        symbol: new SimpleFillSymbol({
          color: dColor,
          outline: null
        })
      }]
    }),
    popupTemplate: statePopupTemplate,
    popupEnabled: false
  });

  const popupTemplate = new PopupTemplate({
    title: `{Name_1}, {STATE_NAME}`,
    fieldInfos: [
      new FieldInfo({
        fieldName: fieldInfos.democrat.county.previous.name,
        label: `${years.previous} Democrat votes`,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.republican.county.previous.name,
        label: `${years.previous} Republican votes`,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.other.county.previous.name,
        label: `${years.previous} Other votes`,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.democrat.county.next.name,
        label: `${years.next} Democrat votes`,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.republican.county.next.name,
        label: `${years.next} Republican votes`,
        format: new FieldInfoFormat({
          places: 0,
          digitSeparator: true
        })
      }),
      new FieldInfo({
        fieldName: fieldInfos.other.county.next.name,
        label: `${years.next} Other votes`,
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
            Votes in ${years.next} and the change from ${years.previous}
            <br/>
            <br/>
            <table class="esri-widget popup">
              <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
              <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{${fieldInfos.democrat.county.next.name}}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}change${years.next}}</span></td></tr>
              <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{${fieldInfos.republican.county.next.name}}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}change${years.next}}</span></td></tr>
              <tr class="oth"><td><span style='color:${oTextColor}; font-weight:bolder'>Other</span></td><td class="num">{${fieldInfos.other.county.next.name}}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}change${years.next}}</span></td></tr>
            </table>
          </div>
        `
      })
    ],
    expressionInfos: [
      new ExpressionInfo({
        title: `winner % of state votes`,
        name: `winner-percent-state-votes`,
        expression: `
          var dem = $feature.${fieldInfos.democrat.county.next.name};
          var rep = $feature.${fieldInfos.republican.county.next.name};
          var oth = $feature.${fieldInfos.other.county.next.name};
          var all = [dem, rep, oth];

          var winnerTotal = Max(all);
          return Text(winnerTotal/$feature.${fieldInfos.normalizationFields.county.next}, "#%");
        `
      }),
      new ExpressionInfo({
        title: `winner votes`,
        name: `winner-votes`,
        expression: `
          var dem = $feature.${fieldInfos.democrat.county.next.name};
          var rep = $feature.${fieldInfos.republican.county.next.name};
          var oth = $feature.${fieldInfos.other.county.next.name};
          var all = [dem, rep, oth];

          return Text(Max(all), "#,###");
        `
      }),
      new ExpressionInfo({
        title: `winner-color`,
        name: `winner-color`,
        expression: `
          var dem = $feature.${fieldInfos.democrat.county.next.name};
          var rep = $feature.${fieldInfos.republican.county.next.name};
          var oth = $feature.${fieldInfos.other.county.next.name};
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
        title: `winner`,
        name: `winner`,
        expression: `
          var dem = $feature.${fieldInfos.democrat.county.next.name};
          var rep = $feature.${fieldInfos.republican.county.next.name};
          var oth = $feature.${fieldInfos.other.county.next.name};
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
        title: `Democrat change from ${years.previous}`,
        name: `dem${years.previous}change${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.democrat.county.next.name};
          var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
          ${diffTextBase}
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: `Republican change from ${years.previous}`,
        name: `rep${years.previous}change${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.republican.county.next.name};
          var votesPrevious = $feature.${fieldInfos.republican.county.previous.name};
          ${diffTextBase}
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: `Other change from ${years.previous}`,
        name: `oth${years.previous}change${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.other.county.next.name};
          var votesPrevious = $feature.${fieldInfos.other.county.previous.name};
          ${diffTextBase}
          return changeText;
        `
      }),
      new ExpressionInfo({
        title: `Democrat diff from ${years.previous}`,
        name: `dem${years.previous}diff${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.democrat.county.next.name};
          var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
          var diff = votesNext - votesPrevious;
          var change = ( (votesNext - votesPrevious) / votesPrevious );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: `Republican diff from ${years.previous}`,
        name: `rep${years.previous}diff${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.republican.county.next.name};
          var votesPrevious = $feature.${fieldInfos.republican.county.previous.name};
          var diff = votesNext - votesPrevious;
          var change = ( (votesNext - votesPrevious) / votesPrevious );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: `Other diff from ${years.previous}`,
        name: `oth${years.previous}diff${years.next}`,
        expression: `
          var votesNext = $feature.${fieldInfos.other.county.next.name};
          var votesPrevious = $feature.${fieldInfos.other.county.previous.name};
          var diff = votesNext - votesPrevious;
          var change = ( (votesNext - votesPrevious) / votesPrevious );
          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
          var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
          return diffText;
        `
      }),
      new ExpressionInfo({
        title: `change-color`,
        name: `dem-change-color`,
        expression: `
          var votesNext = $feature.${fieldInfos.democrat.county.next.name};
          var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
          ${colorDiffPopupBase}
        `
      }),
      new ExpressionInfo({
        title: `change-color`,
        name: `rep-change-color`,
        expression: `
          var votesNext = $feature.${fieldInfos.republican.county.next.name};
          var votesPrevious = $feature.${fieldInfos.republican.county.previous.name};
          ${colorDiffPopupBase}
        `
      }),
      new ExpressionInfo({
        title: `change-color`,
        name: `oth-change-color`,
        expression: `
          var votesNext = $feature.${fieldInfos.other.county.next.name};
          var votesPrevious = $feature.${fieldInfos.other.county.previous.name};
          ${colorDiffPopupBase}
        `
      }),
      new ExpressionInfo({
        title: `winner-margin`,
        name: `winner-margin`,
        expression: `
          var fields = [
            $feature.${fieldInfos.democrat.county.next.name},
            $feature.${fieldInfos.republican.county.next.name},
            $feature.${fieldInfos.other.county.next.name}
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

  const countyChangeLayer = new FeatureLayer({
    minScale: scaleThreshold,
    portalItem: {
      id: `ba48def248cb45bebb234aa346c97676`
    },
    legendEnabled: false,
    renderer: new SimpleRenderer({
      symbol: new CIMSymbol({
        data: {
          type: `CIMSymbolReference`,
          symbol: {
            type: `CIMPointSymbol`,
            symbolLayers: [
              {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `democrat-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `democrat-negative-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMLineSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidStroke`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `republican-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `republican-negative-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMLineSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidStroke`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: `Relative`,
                primitiveName: `other-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: oColorCIM,
                        }, {
                          type: `CIMSolidStroke`,
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

              }, {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: `Relative`,
                primitiveName: `other-negative-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMLineSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidStroke`,
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
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.county.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${sizeExpressionBase}
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-negative-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.county.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${sizeExpressionBase}
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${sizeExpressionBase}
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-negative-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${sizeExpressionBase}
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${sizeExpressionBase}
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-negative-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${sizeExpressionBase}
                `,
                returnType: `Default`
              }
            },

             // offset overrides

            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.county.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetXExpressionBase}
                  return offset * -1;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-negative-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.county.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetXExpressionBase}
                  return offset * -1;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetXExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-negative-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetXExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `OffsetY`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetYExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-negative-votes`,
              propertyName: `OffsetY`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.county.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetYExpressionBase}
                  return offset;
                `,
                returnType: `Default`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 10`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.county.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 5 AND ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 10`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.county.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 1 AND ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 5`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.county.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 0.5 AND ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 1`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.county.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name} - ${fieldInfos.democrat.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 0.5`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.county.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 10`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.county.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 5 AND ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 10`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.county.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 1 AND ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 5`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.county.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 0.5 AND ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 1`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.county.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name} - ${fieldInfos.republican.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 0.5`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.county.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 10`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.other.county.next.name};
            var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 5 AND ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 10`,
        labelExpressionInfo: {
          expression: `
          var valueNext = $feature.${fieldInfos.other.county.next.name};
          var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 1 AND ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 5)
        `,
        labelExpressionInfo: {
          expression: `
          var valueNext = $feature.${fieldInfos.other.county.next.name};
          var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 30
        })
      }),

      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 0.5 AND ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 1)
        `,
        labelExpressionInfo: {
          expression: `
          var valueNext = $feature.${fieldInfos.other.county.next.name};
          var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((${fieldInfos.other.county.next.name} - ${fieldInfos.other.county.previous.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 0.5)
        `,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.other.county.next.name};
            var valuePrevious = $feature.${fieldInfos.other.county.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 10,
          yoffset: 10
        })
      })

    ],
    popupTemplate
  });

  const countyResultsLayer = new FeatureLayer({
    minScale: scaleThreshold,
    portalItem: {
      id: `ba48def248cb45bebb234aa346c97676`
    },
    legendEnabled: false,
    renderer: new SimpleRenderer({
      symbol: new CIMSymbol({
        data: {
          type: `CIMSymbolReference`,
          symbol: {
            type: `CIMPointSymbol`,
            symbolLayers: [
              {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: `Relative`,
                primitiveName: `other-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: oColorCIM,
                        }, {
                          type: `CIMSolidStroke`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `democrat-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: dColorCIM
                        }, {
                          type: `CIMSolidStroke`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `republican-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: rColorCIM
                        }, {
                          type: `CIMSolidStroke`,
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
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var percentStateVotes = ( $feature.${fieldInfos.democrat.county.next.name} / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;

                ` + sizeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var percentStateVotes = ( $feature.${fieldInfos.republican.county.next.name} / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;

                ` + sizeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var percentStateVotes = ( $feature.${fieldInfos.other.county.next.name} / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;

                ` + sizeExpressionBase,
                returnType: `Default`
              }
            },

             // offset overrides

            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var percentStateVotes = ( $feature.${fieldInfos.democrat.county.next.name} / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;

                  ${offsetXExpressionBase}
                  return offset * -1;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var percentStateVotes = ( $feature.${fieldInfos.republican.county.next.name} / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;
                  ${offsetXExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `OffsetY`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var percentStateVotes = ( $feature.${fieldInfos.other.county.next.name} / $feature.${fieldInfos.normalizationFields.county.next} ) * 100;

                  ${offsetYExpressionBase}
                  return offset;
                `,
                returnType: `Default`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 10`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.democrat.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 5 AND ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 10`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.democrat.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 1 AND ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 5`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.democrat.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 0.5 AND ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 1`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.democrat.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.democrat.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 0.5`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.democrat.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 10`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.republican.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 5 AND ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 10`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.republican.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 1 AND ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 5`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.republican.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 0.5 AND ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 1`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.republican.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.republican.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 0.5`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.republican.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        where: `ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 10`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.other.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 5 AND ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 10`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.other.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 40
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 1 AND ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 5)
        `,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.other.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 30
        })
      }),

      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) >= 0.5 AND ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 1)
        `,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.other.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 20
        })
      }),
      new LabelClass({
        minScale: 577791,
        where: `
          (ABS(((${fieldInfos.other.county.next.name}) / ${fieldInfos.normalizationFields.county.next}) * 100) < 0.5)
        `,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.other.county.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        labelPlacement: `center-center`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 10,
          yoffset: 10
        })
      })

    ],
    popupTemplate
  });

  const stateChangeLayer = new FeatureLayer({
    maxScale: scaleThreshold,
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    opacity: 1,
    legendEnabled: false,
    renderer: new SimpleRenderer({
      symbol: new CIMSymbol({
        data: {
          type: `CIMSymbolReference`,
          symbol: {
            type: `CIMPointSymbol`,
            symbolLayers: [
              {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `democrat-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `democrat-negative-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMLineSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidStroke`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `republican-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `republican-negative-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMLineSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidStroke`,
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
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: `Relative`,
                primitiveName: `other-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: oColorCIM,
                        }, {
                          type: `CIMSolidStroke`,
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

              }, {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: `Relative`,
                primitiveName: `other-negative-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMLineSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidStroke`,
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
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.state.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change > 0, change, 0);
                ` + sizeTotalChangeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-negative-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.state.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                ` + sizeTotalChangeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                ` + sizeTotalChangeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-negative-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                ` + sizeTotalChangeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                ` + sizeTotalChangeExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-negative-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                ` + sizeTotalChangeExpressionBase,
                returnType: `Default`
              }
            },

             // offset overrides

            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.state.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change > 0, change, 0);
                  ${offsetXTotalChangeExpressionBase}
                  return offset * -1;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-negative-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Democrat votes`,
                expression: `
                  var votesNext = $feature.${fieldInfos.democrat.state.next.name};
                  var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
                  var change = votesNext - votesPrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  ${offsetXTotalChangeExpressionBase}
                  return offset * -1;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                  ${offsetXTotalChangeExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-negative-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Republican votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.republican.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  ${offsetXTotalChangeExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `OffsetY`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change > 0, change, 0);
                  ${offsetYTotalChangeExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-negative-votes`,
              propertyName: `OffsetY`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Decrease in Other votes`,
                expression: `
                  var valueNext = $feature.${fieldInfos.other.state.next.name};
                  var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
                  var change = valueNext - valuePrevious;
                  var value = IIF( change < 0, Abs(change), 0);
                  ${offsetYTotalChangeExpressionBase}
                  return offset;
                `,
                returnType: `Default`
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
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) >= 500000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.state.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -50,
          yoffset: -25
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) >= 100000 AND ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) < 500000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.state.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) >= 50000 AND ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) < 100000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.state.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) >= 10000 AND ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) < 50000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.state.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -30,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name} - ${fieldInfos.democrat.state.previous.name}) < 10000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.democrat.state.next.name};
            var valuePrevious = $feature.${fieldInfos.democrat.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) >= 500000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.state.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 50,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) >= 100000 AND ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) < 500000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.state.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 35,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) >= 50000 AND ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) < 100000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.state.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) >= 10000 AND ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) < 50000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.state.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name} - ${fieldInfos.republican.state.previous.name}) < 10000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.republican.state.next.name};
            var valuePrevious = $feature.${fieldInfos.republican.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        minScale: 9244700,
        where: `ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) >= 500000`,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.other.state.next.name};
            var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 35
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) >= 100000 AND ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) < 500000`,
        labelExpressionInfo: {
          expression: `
          var valueNext = $feature.${fieldInfos.other.state.next.name};
          var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 30
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `
          (ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) >= 50000 AND ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) < 100000)
        `,
        labelExpressionInfo: {
          expression: `
          var valueNext = $feature.${fieldInfos.other.state.next.name};
          var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 25
        })
      }),

      new LabelClass({
        minScale: 9244700,
        where: `
          (ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) >= 10000 AND ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) < 50000)
        `,
        labelExpressionInfo: {
          expression: `
          var valueNext = $feature.${fieldInfos.other.state.next.name};
          var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 15
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `
          (ABS(${fieldInfos.other.state.next.name} - ${fieldInfos.other.state.previous.name}) < 10000)
        `,
        labelExpressionInfo: {
          expression: `
            var valueNext = $feature.${fieldInfos.other.state.next.name};
            var valuePrevious = $feature.${fieldInfos.other.state.previous.name};
            ${diffLabelText}
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 10,
          yoffset: 10
        })
      })
    ],
    popupTemplate: statePopupTemplate
  });

  const stateResultsLayer = new FeatureLayer({
    maxScale: scaleThreshold,
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    opacity: 1,
    legendEnabled: false,
    renderer: new SimpleRenderer({
      symbol: new CIMSymbol({
        data: {
          type: `CIMSymbolReference`,
          symbol: {
            type: `CIMPointSymbol`,
            symbolLayers: [
              {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: -10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `democrat-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: dColorCIM
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true
              }, {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 10,
                offsetY: 0,
                anchorPointUnits: `Relative`,
                primitiveName: `republican-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: rColorCIM
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,

              },
              {
                type: `CIMVectorMarker`,
                enable: true,
                anchorPoint: { x: 0, y: 0 },
                offsetX: 0,
                offsetY: 10,
                anchorPointUnits: `Relative`,
                primitiveName: `other-positive-votes`,
                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                markerGraphics: [
                  {
                    type: `CIMMarkerGraphic`,
                    geometry: cimCircleGeometry,
                    symbol: {
                      type: `CIMPolygonSymbol`,
                      symbolLayers: [
                        {
                          type: `CIMSolidFill`,
                          enable: true,
                          color: oColorCIM,
                        }, {
                          type: `CIMSolidStroke`,
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

              }
            ]
          },
          primitiveOverrides: [
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Democrat votes`,
                expression: `
                  var value = $feature.${fieldInfos.democrat.state.next.name};
                ` + sizeTotalExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Republican votes`,
                expression: `
                  var value = $feature.${fieldInfos.republican.state.next.name};
                ` + sizeTotalExpressionBase,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `Size`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Other votes`,
                expression: `
                  var value = $feature.${fieldInfos.other.state.next.name};
                ` + sizeTotalExpressionBase,
                returnType: `Default`
              }
            },

             // offset overrides

            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `democrat-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Democrat votes`,
                expression: `
                  var value = $feature.${fieldInfos.democrat.state.next.name};
                  ${offsetXTotalExpressionBase}
                  return offset * -1;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `republican-positive-votes`,
              propertyName: `OffsetX`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Republican votes`,
                expression: `
                  var value = $feature.${fieldInfos.republican.state.next.name};
                  ${offsetXTotalExpressionBase}
                  return offset;
                `,
                returnType: `Default`
              }
            },
            {
              type: `CIMPrimitiveOverride`,
              primitiveName: `other-positive-votes`,
              propertyName: `OffsetY`,
              valueExpressionInfo: {
                type: `CIMExpressionInfo`,
                title: `Increase in Other votes`,
                expression: `
                  var value = $feature.${fieldInfos.other.state.next.name};
                  ${offsetYTotalExpressionBase}
                  return offset;
                `,
                returnType: `Default`
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
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name}) >= 5000000`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.democrat.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -50,
          yoffset: -25
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name}) >= 1000000 AND ABS(${fieldInfos.democrat.state.next.name}) < 5000000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.democrat.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name}) >= 500000 AND ABS(${fieldInfos.democrat.state.next.name}) < 1000000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.democrat.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -40,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name}) >= 100000 AND ABS(${fieldInfos.democrat.state.next.name}) < 500000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.democrat.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(dColor),
          xoffset: -30,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.democrat.state.next.name}) < 100000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.democrat.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name}) >= 5000000`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.republican.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 60,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name}) >= 1000000 AND ABS(${fieldInfos.republican.state.next.name}) < 5000000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.republican.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 35,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name}) >= 500000 AND ABS(${fieldInfos.republican.state.next.name}) < 1000000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.republican.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -20
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name}) >= 100000 AND ABS(${fieldInfos.republican.state.next.name}) < 500000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.republican.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(rColor),
          xoffset: 20,
          yoffset: -10
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.republican.state.next.name}) < 100000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.republican.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
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
        minScale: 9244700,
        where: `ABS(${fieldInfos.other.state.next.name}) >= 5000000`,
        labelExpressionInfo: {
          expression: `
            Text($feature.${fieldInfos.other.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 35
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `ABS(${fieldInfos.other.state.next.name}) >= 1000000 AND ABS(${fieldInfos.other.state.next.name}) < 5000000`,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.other.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 30
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `
          (ABS(${fieldInfos.other.state.next.name}) >= 500000 AND ABS(${fieldInfos.other.state.next.name}) < 1000000)
        `,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.other.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 25
        })
      }),

      new LabelClass({
        minScale: 9244700,
        where: `
          (ABS(${fieldInfos.other.state.next.name}) >= 100000 AND ABS(${fieldInfos.other.state.next.name}) < 500000)
        `,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.other.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 20,
          yoffset: 15
        })
      }),
      new LabelClass({
        minScale: 9244700,
        where: `
          (ABS(${fieldInfos.other.state.next.name}) < 100000)
        `,
        labelExpressionInfo: {
          expression: `
          Text($feature.${fieldInfos.other.state.next.name}, '#,###');
          `
        },
        deconflictionStrategy: `none`,
        symbol: new TextSymbol({
          font: new Font({
            weight: `bold`,
            family: `Noto Sans`,
            size: `10pt`
          }),
          haloColor: new Color(haloColor),
          haloSize,
          color: new Color(oTextColor),
          xoffset: 10,
          yoffset: 10
        })
      })
    ],
    popupTemplate: statePopupTemplate
  });

  view.map.add(stateElectoralResultsLayer);
  view.map.add(swingStatesLayer);
  view.map.add(stateChangeLayer);
  view.map.add(stateResultsLayer);
  view.map.add(countyChangeLayer);
  view.map.add(countyResultsLayer);

  const swipe = new Swipe({
    view,
    leadingLayers: [ countyChangeLayer, stateChangeLayer, swingStatesLayer ],
    trailingLayers: [ countyResultsLayer, stateResultsLayer, stateElectoralResultsLayer ],
    position: 90
  });
  view.ui.add(swipe);

  const totalLegend = document.getElementById(`total-legend`) as HTMLDivElement;
  const changeLegend = document.getElementById(`change-legend`) as HTMLDivElement;
  const infoToggle = document.getElementById(`info-toggle`) as HTMLDivElement;

  new Legend({
    view,
    container: `change-legend-container`,
    layerInfos: [{
      layer: swingStatesLayer
    }] as any
  });
  view.ui.add(`change-legend`, `bottom-left`);

  new Legend({
    view,
    container: `total-legend-container`,
    layerInfos: [{
      layer: stateElectoralResultsLayer
    }] as any
  });

  view.ui.add(changeLegend, `bottom-left`);
  view.ui.add(totalLegend, `bottom-right`);
  view.ui.add(infoToggle, `top-left`);

  let visibilityEnabled = true;
  const toggleInfoVisibility = function () {
    changeLegend.style.display = changeLegend.style.display === `none` ? `block` : `none`;
    totalLegend.style.display = totalLegend.style.display === `none` ? `block` : `none`;
    visibilityEnabled = !visibilityEnabled;
    updateLegendOpacity();
  }

  infoToggle.addEventListener(`click`, toggleInfoVisibility);

  swipe.watch( `position`, updateLegendOpacity);

  function updateLegendOpacity() {
    if (!visibilityEnabled){
      return;
    }

    const threshold = 50;
    if (swipe.position <= 85){
      totalLegend.style.display = `block`;
      const opacity = (35 - (swipe.position - threshold)) * 3.5;
      totalLegend.style.opacity = ( opacity * 0.01 ).toString();
    } else {
      totalLegend.style.display = `none`;
    }

    if (swipe.position <= 50){
      changeLegend.style.display = `block`;
      const opacity = (35 - (threshold - swipe.position)) * 3.5;
      changeLegend.style.opacity = ( opacity * 0.01 ).toString();
    }

    if (swipe.position <= 15){
      changeLegend.style.opacity = `0`;
      changeLegend.style.display = `none`;
    }
  }

  function updateLegendHeight () {
    changeLegend.style.height = null;
    changeLegend.style.overflow = null;

    totalLegend.style.height = null;
    totalLegend.style.overflow = null;

    if(view.heightBreakpoint === `small`){
      changeLegend.style.height = `450px`;
      changeLegend.style.overflow = `auto`;

      totalLegend.style.height = `450px`;
      totalLegend.style.overflow = `auto`;

    }
    if (view.heightBreakpoint === `xsmall`){
      changeLegend.style.height = `300px`;
      changeLegend.style.overflow = `auto`;

      totalLegend.style.height = `300px`;
      totalLegend.style.overflow = `auto`;
    }
  }

  view.watch(`heightBreakpoint`, updateLegendHeight);
  await view.when(updateLegendHeight);

})();
