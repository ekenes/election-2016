import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import FeatureLayer = require("esri/layers/FeatureLayer");
import Expand = require("esri/widgets/Expand");
import PopupTemplate = require("esri/PopupTemplate");
import ExpressionInfo = require("esri/popup/ExpressionInfo");
import FieldInfo = require("esri/popup/FieldInfo");
import FieldInfoFormat = require("esri/popup/support/FieldInfoFormat");
import FieldsContent = require("esri/popup/content/FieldsContent");

import { SimpleRenderer } from "esri/renderers";
import { CIMSymbol } from "esri/symbols";

( async () => {
  const map = new EsriMap({
    basemap: {
      portalItem: {
        id: "3582b744bba84668b52a16b0b6942544"
      }
    }
  });

  const maxSize = 60;
  const maxDataValue = 50000;
  const maxScale = 18056*4*4*4;

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-85, 38],
    zoom: 5,
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

  const layer = new FeatureLayer({
    portalItem: {
      id: "ba48def248cb45bebb234aa346c97676"
    },
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
                          color: [0, 0, 230, 255]
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
                          color: [0, 0, 230, 255],
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
                offsetX: 0,
                offsetY: 10,
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
                          color: [230, 0, 0, 255]
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
                          color: [230, 0, 0, 255],
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
                offsetX: 10,
                offsetY: 0,
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
                          color: [21, 209, 21, 255],
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
                          color: [21, 209, 21, 255],
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
                  var boundedDataValue = when(
                    value > ${maxDataValue}, ${maxDataValue},
                    value > 0 && value <= 100, 4,
                    value
                  );
                  return boundedDataValue * (${maxSize} / ${maxDataValue} ) * (${maxScale} / $view.scale);
                `,
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
                  var boundedDataValue = when(
                    value > ${maxDataValue}, ${maxDataValue},
                    value > 0 && value <= 100, 100,
                    value
                  );
                  return boundedDataValue * (${maxSize} / ${maxDataValue} ) * (${maxScale} / $view.scale);
                `,
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
                  var boundedDataValue = when(
                    value > ${maxDataValue}, ${maxDataValue},
                    value > 0 && value <= 100, 4,
                    value
                  );
                  return boundedDataValue * (${maxSize} / ${maxDataValue} ) * (${maxScale} / $view.scale);
                `,
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
                  var boundedDataValue = when(
                    value > ${maxDataValue}, ${maxDataValue},
                    value > 0 && value <= 100, 4,
                    value
                  );
                  return boundedDataValue * (${maxSize} / ${maxDataValue} ) * (${maxScale} / $view.scale);
                `,
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
                  var boundedDataValue = when(
                    value > ${maxDataValue}, ${maxDataValue},
                    value > 0 && value <= 100, 4,
                    value
                  );
                  return boundedDataValue * (${maxSize} / ${maxDataValue} ) * (${maxScale} / $view.scale);
                `,
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
                  var boundedDataValue = when(
                    value > ${maxDataValue}, ${maxDataValue},
                    value > 0 && value <= 100, 4,
                    value
                  );
                  return boundedDataValue * (${maxSize} / ${maxDataValue} ) * (${maxScale} / $view.scale);
                `,
                returnType: "Default"
              }
            }
          ]
        }
      })
    }),
    popupTemplate: new PopupTemplate({
      title: "",
      content: [
        new FieldsContent({
          fieldInfos: [
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
            }),
            new FieldInfo({
              fieldName: "expression/dem12change16"
            }),
            new FieldInfo({
              fieldName: "expression/rep12change16"
            }),
            new FieldInfo({
              fieldName: "expression/oth12change16"
            })
          ]
        })
      ],
      expressionInfos: [
        new ExpressionInfo({
          title: "Democrat change from 2012",
          name: "dem12change16",
          expression: `
            var votes16 = $feature.PRS_DEM_16;
            var votes12 = $feature.PRS_DEM_12;
            var diff = votes16 - votes12;
            var change = ( (votes16 - votes12) / votes12 );
            return \`\${Text(diff, "#,###")} (\${Text(change, "#%")})\`
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
            return \`\${Text(diff, "#,###")} (\${Text(change, "#%")})\`
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
            return \`\${Text(diff, "#,###")} (\${Text(change, "#%")})\`
          `
        })
      ]
    })
    // popupTemplate: {
    //   content: [
    //     {
    //       type: "fields",
    //       fieldInfos: [{
    //         fieldName: "B03002_006E",
    //         label: "Asian",
    //         format: {
    //           places: 0,
    //           digitSeparator: true
    //         }
    //       }, {
    //         fieldName: "B03002_012E",
    //         label: "Hispanic",
    //         format: {
    //           places: 0,
    //           digitSeparator: true
    //         }
    //       }, {
    //         fieldName: "B03002_004E",
    //         label: "Black",
    //         format: {
    //           places: 0,
    //           digitSeparator: true
    //         }
    //       }]
    //     }
    //   ]
    // }
  });
  view.map.add(layer);


})();
