import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import FeatureLayer = require("esri/layers/FeatureLayer");
import Expand = require("esri/widgets/Expand");
import PopupTemplate = require("esri/PopupTemplate");
import ExpressionInfo = require("esri/popup/ExpressionInfo");
import FieldInfo = require("esri/popup/FieldInfo");
import FieldInfoFormat = require("esri/popup/support/FieldInfoFormat");
import FieldsContent = require("esri/popup/content/FieldsContent");
import OpacityVariable = require("esri/renderers/visualVariables/OpacityVariable");
import SizeVariable = require("esri/renderers/visualVariables/SizeVariable");
import Swipe = require("esri/widgets/Swipe");
import Legend = require("esri/widgets/Legend");

import { SimpleRenderer } from "esri/renderers";
import { CIMSymbol, SimpleFillSymbol, SimpleMarkerSymbol } from "esri/symbols";
import { UniqueValueRenderer } from "esri/rasterRenderers";

( async () => {
  const map = new EsriMap({
    basemap: {
      portalItem: {
        id: "3582b744bba84668b52a16b0b6942544"
      }
    }
  });

  const maxSize = 15;
  const minDataValue = 100;
  const maxDataValue = 5000;
  const maxScale = 4622324;
  const referenceScale = 2311162;

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-112, 40],
    scale: referenceScale,
    constraints: {
      minScale: 0,
      maxScale: maxScale/16
    },
    highlightOptions: {
      fillOpacity: 0
    }
  });

  view.watch("scale", function(scale){
    console.log(scale);
  });

  // PRS_DEM_12
  // PRS_REP_12
  // PRS_OTH_12

  // PRS_DEM_16
  // PRS_REP_16
  // PRS_OTH_16

  const turnoutLayer = new FeatureLayer({
    portalItem: {
      id: "91910117e36f49ee9a88b84fa5053c67"
    },
    opacity: 1,
    renderer: new UniqueValueRenderer({
      valueExpression: `
        var dem12 = $feature.PRS_DEM_12;
        var rep12 = $feature.PRS_REP_12;
        var oth12 = $feature.PRS_OTH_12;

        var winner12 = Decode( Max([dem12, rep12, oth12]),
          dem12, 'Democrat 2012',
          rep12, 'Republican 2012',
          oth12, 'Other 2012',
        'n/a' );

        var dem16 = $feature.PRS_DEM_16;
        var rep16 = $feature.PRS_REP_16;
        var oth16 = $feature.PRS_OTH_16;

        var winner16 = Decode( Max([dem16, rep16, oth16]),
          dem16, 'Democrat 2016',
          rep16, 'Republican 2016',
          oth16, 'Other 2016',
        'n/a' );

        return Concatenate([winner12, winner16], ", ");
      `,
      valueExpressionTitle: "Outright winner",
      defaultSymbol: new SimpleFillSymbol({
        color: "rgba(128,128,128)",
        style: "solid"
      }),
      uniqueValueInfos: [{
        value: "Republican 2012, Republican 2016",
        label: "Republican 2012-2016",
        symbol: new SimpleMarkerSymbol({
          color: "rgba(230, 0, 0, 1)",
          outline: null,
          size: 30
        })
      }, {
        value: "Democrat 2012, Democrat 2016",
        label: "Democrat 2012-2016",
        symbol: new SimpleMarkerSymbol({
          color: "rgba(0, 0, 230, 1)",
          outline: null,
          size: 30
        })
      }, {
        value: "Other 2012, Other 2016",
        label: "Other 2012-2016",
        symbol: new SimpleMarkerSymbol({
          color: "rgba(21, 209, 21, 1)",
          outline: null,
          size: 30
        })
      }, {
        value: "Democrat 2012, Republican 2016",
        label: "Democrat 2012, Republican 2016",
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
                  offsetY: 0,
                  anchorPointUnits: "Relative",
                  size: 30,
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
                        type: "CIMPointSymbol",
                        symbolLayers: [
                          {
                            type: "CIMHatchFill",
                            enable: true,
                            lineSymbol: {
                              type: "CIMLineSymbol",
                              symbolLayers: [
                                {
                                  type: "CIMSolidStroke",
                                  effects: [
                                    {
                                      type: "CIMGeometricEffectDashes",
                                      dashTemplate: [2, 2],
                                      lineDashEnding: "FullPattern"
                                    }
                                  ],
                                  enable: true,
                                  width: 1,
                                  color: [0, 0, 230, 255]
                                }
                              ]
                            },
                            rotation: 45, // rotation of the lines
                            separation: 4 // distance between lines in hatch fill
                          },
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
                }
              ]
            }
          }
        })
      }, {
        value: "Democrat 2012, Other 2016",
        label: "Democrat 2012, Other 2016",
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
                  offsetY: 0,
                  anchorPointUnits: "Relative",
                  size: 30,
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
                        type: "CIMPointSymbol",
                        symbolLayers: [
                          {
                            type: "CIMHatchFill",
                            enable: true,
                            lineSymbol: {
                              type: "CIMLineSymbol",
                              symbolLayers: [
                                {
                                  type: "CIMSolidStroke",
                                  effects: [
                                    {
                                      type: "CIMGeometricEffectDashes",
                                      dashTemplate: [2, 2],
                                      lineDashEnding: "FullPattern"
                                    }
                                  ],
                                  enable: true,
                                  width: 1,
                                  color: [0, 0, 230, 255]
                                }
                              ]
                            },
                            rotation: 45, // rotation of the lines
                            separation: 4 // distance between lines in hatch fill
                          },
                          {
                            type: "CIMSolidFill",
                            enable: true,
                            color: [21, 209, 21, 255]
                          }
                        ]
                      }
                    }
                  ],
                  scaleSymbolsProportionally: true,
                  respectFrame: true,
                }
              ]
            }
          }
        })
      }, {
        value: "Republican 2012, Democrat 2016",
        label: "Republican 2012, Democrat 2016",
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
                  offsetY: 0,
                  anchorPointUnits: "Relative",
                  size: 30,
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
                        type: "CIMPointSymbol",
                        symbolLayers: [
                          {
                            type: "CIMHatchFill",
                            enable: true,
                            lineSymbol: {
                              type: "CIMLineSymbol",
                              symbolLayers: [
                                {
                                  type: "CIMSolidStroke",
                                  effects: [
                                    {
                                      type: "CIMGeometricEffectDashes",
                                      dashTemplate: [2, 2],
                                      lineDashEnding: "FullPattern"
                                    }
                                  ],
                                  enable: true,
                                  width: 1,
                                  color: [230, 0, 0, 255]
                                }
                              ]
                            },
                            rotation: 45, // rotation of the lines
                            separation: 4 // distance between lines in hatch fill
                          },
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
                }
              ]
            }
          }
        })
      }, {
        value: "Republican 2012, Other 2016",
        label: "Republican 2012, Other 2016",
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
                  offsetY: 0,
                  anchorPointUnits: "Relative",
                  size: 30,
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
                        type: "CIMPointSymbol",
                        symbolLayers: [
                          {
                            type: "CIMHatchFill",
                            enable: true,
                            lineSymbol: {
                              type: "CIMLineSymbol",
                              symbolLayers: [
                                {
                                  type: "CIMSolidStroke",
                                  effects: [
                                    {
                                      type: "CIMGeometricEffectDashes",
                                      dashTemplate: [2, 2],
                                      lineDashEnding: "FullPattern"
                                    }
                                  ],
                                  enable: true,
                                  width: 1,
                                  color: [230, 0, 0, 255]
                                }
                              ]
                            },
                            rotation: 45, // rotation of the lines
                            separation: 4 // distance between lines in hatch fill
                          },
                          {
                            type: "CIMSolidFill",
                            enable: true,
                            color: [21, 209, 21, 255]
                          }
                        ]
                      }
                    }
                  ],
                  scaleSymbolsProportionally: true,
                  respectFrame: true,
                }
              ]
            }
          }
        })
      }, {
        value: "Other 2012, Republican 2016",
        label: "Other 2012, Republican 2016",
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
                  offsetY: 0,
                  anchorPointUnits: "Relative",
                  size: 30,
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
                        type: "CIMPointSymbol",
                        symbolLayers: [
                          {
                            type: "CIMHatchFill",
                            enable: true,
                            lineSymbol: {
                              type: "CIMLineSymbol",
                              symbolLayers: [
                                {
                                  type: "CIMSolidStroke",
                                  effects: [
                                    {
                                      type: "CIMGeometricEffectDashes",
                                      dashTemplate: [2, 2],
                                      lineDashEnding: "FullPattern"
                                    }
                                  ],
                                  enable: true,
                                  width: 1,
                                  color: [21, 209, 21, 255]
                                }
                              ]
                            },
                            rotation: 45, // rotation of the lines
                            separation: 4 // distance between lines in hatch fill
                          },
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
                }
              ]
            }
          }
        })
      }, {
        value: "Other 2012, Democrat 2016",
        label: "Other 2012, Democrat 2016",
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
                  offsetY: 0,
                  anchorPointUnits: "Relative",
                  size: 30,
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
                        type: "CIMPointSymbol",
                        symbolLayers: [
                          {
                            type: "CIMHatchFill",
                            enable: true,
                            lineSymbol: {
                              type: "CIMLineSymbol",
                              symbolLayers: [
                                {
                                  type: "CIMSolidStroke",
                                  effects: [
                                    {
                                      type: "CIMGeometricEffectDashes",
                                      dashTemplate: [2, 2],
                                      lineDashEnding: "FullPattern"
                                    }
                                  ],
                                  enable: true,
                                  width: 1,
                                  color: [21, 209, 21, 255]
                                }
                              ]
                            },
                            rotation: 45, // rotation of the lines
                            separation: 4 // distance between lines in hatch fill
                          },
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
                }
              ]
            }
          }
        })
      }],
      visualVariables: [
        new SizeVariable({
          valueExpression: `
            var dem16 = $feature.PRS_DEM_16;
            var rep16 = $feature.PRS_REP_16;
            var oth16 = $feature.PRS_OTH_16;
            var all = [dem16, rep16, oth16];
            return Sum(all);
          `,
          valueExpressionTitle: "Voter turnout",
          minDataValue: 100,
          minSize: 2,
          maxDataValue: 1000000,
          maxSize: 30
        }),
        new OpacityVariable({
          valueExpression: `
            var dem16 = $feature.PRS_DEM_16;
            var rep16 = $feature.PRS_REP_16;
            var oth16 = $feature.PRS_OTH_16;
            var all = [dem16, rep16, oth16];
            return (Max(all) / Sum(all)) * 100;
          `,
          stops: [
            { value: 90, opacity: 0.95 },
            { value: 10, opacity: 0.05 }
          ]
        })
      ]
    }),
  });

  const polygonLayer = new FeatureLayer({
    portalItem: {
      id: "91910117e36f49ee9a88b84fa5053c67"
    },
    opacity: 1,
    renderer: new UniqueValueRenderer({
      valueExpression: `
        var dem12 = $feature.PRS_DEM_12;
        var rep12 = $feature.PRS_REP_12;
        var oth12 = $feature.PRS_OTH_12;

        var winner12 = Decode( Max([dem12, rep12, oth12]),
          dem12, 'Democrat 2012',
          rep12, 'Republican 2012',
          oth12, 'Other 2012',
        'n/a' );

        var dem16 = $feature.PRS_DEM_16;
        var rep16 = $feature.PRS_REP_16;
        var oth16 = $feature.PRS_OTH_16;

        var winner16 = Decode( Max([dem16, rep16, oth16]),
          dem16, 'Democrat 2016',
          rep16, 'Republican 2016',
          oth16, 'Other 2016',
        'n/a' );

        console(Concatenate([winner12, winner16], ", "))

        return Concatenate([winner12, winner16], ", ");
      `,
      valueExpressionTitle: "Outright winner",
      defaultSymbol: new SimpleFillSymbol({
        color: "rgba(128,128,128)",
        style: "solid"
      }),
      uniqueValueInfos: [{
        value: "Republican 2012, Republican 2016",
        label: "Republican 2012-2016",
        symbol: new SimpleFillSymbol({
          color: "rgba(230, 0, 0, 1)",
          outline: null
        })
      }, {
        value: "Democrat 2012, Democrat 2016",
        label: "Democrat 2012-2016",
        symbol: new SimpleFillSymbol({
          color: "rgba(0, 0, 230, 1)",
          outline: null
        })
      }, {
        value: "Other 2012, Other 2016",
        label: "Other 2012-2016",
        symbol: new SimpleFillSymbol({
          color: "rgba(21, 209, 21, 1)",
          outline: null
        })
      }, {
        value: "Democrat 2012, Republican 2016",
        label: "Democrat 2012, Republican 2016",
        symbol: new CIMSymbol({
          data: {
            type: "CIMSymbolReference",
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMHatchFill",
                  enable: true,
                  lineSymbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 2],
                            lineDashEnding: "FullPattern"
                          }
                        ],
                        enable: true,
                        width: 1,
                        color: [0, 0, 230, 255]
                      }
                    ]
                  },
                  rotation: 45, // rotation of the lines
                  separation: 4 // distance between lines in hatch fill
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [230, 0, 0, 255]
                }
              ]
            }
          }
        })
      }, {
        value: "Democrat 2012, Other 2016",
        label: "Democrat 2012, Other 2016",
        symbol: new CIMSymbol({
          data: {
            type: "CIMSymbolReference",
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMHatchFill",
                  enable: true,
                  lineSymbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 2],
                            lineDashEnding: "FullPattern"
                          }
                        ],
                        enable: true,
                        width: 1,
                        color: [0, 0, 230, 255]
                      }
                    ]
                  },
                  rotation: 45, // rotation of the lines
                  separation: 4 // distance between lines in hatch fill
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [21, 209, 21, 255]
                }
              ]
            }
          }
        })
      }, {
        value: "Republican 2012, Democrat 2016",
        label: "Republican 2012, Democrat 2016",
        symbol: new CIMSymbol({
          data: {
            type: "CIMSymbolReference",
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMHatchFill",
                  enable: true,
                  lineSymbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 2],
                            lineDashEnding: "FullPattern"
                          }
                        ],
                        enable: true,
                        width: 1,
                        color: [230, 0, 0, 255]
                      }
                    ]
                  },
                  rotation: 45, // rotation of the lines
                  separation: 4 // distance between lines in hatch fill
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [0, 0, 230, 255]
                }
              ]
            }
          }
        })
      }, {
        value: "Republican 2012, Other 2016",
        label: "Republican 2012, Other 2016",
        symbol: new CIMSymbol({
          data: {
            type: "CIMSymbolReference",
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMHatchFill",
                  enable: true,
                  lineSymbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 2],
                            lineDashEnding: "FullPattern"
                          }
                        ],
                        enable: true,
                        width: 1,
                        color: [230, 0, 0, 255]
                      }
                    ]
                  },
                  rotation: 45, // rotation of the lines
                  separation: 4 // distance between lines in hatch fill
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [21, 209, 21, 255]
                }
              ]
            }
          }
        })
      }, {
        value: "Other 2012, Republican 2016",
        label: "Other 2012, Republican 2016",
        symbol: new CIMSymbol({
          data: {
            type: "CIMSymbolReference",
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMHatchFill",
                  enable: true,
                  lineSymbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 2],
                            lineDashEnding: "FullPattern"
                          }
                        ],
                        enable: true,
                        width: 1,
                        color: [21, 209, 21, 255]
                      }
                    ]
                  },
                  rotation: 45, // rotation of the lines
                  separation: 4 // distance between lines in hatch fill
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [230, 0, 0, 255]
                }
              ]
            }
          }
        })
      }, {
        value: "Other 2012, Democrat 2016",
        label: "Other 2012, Democrat 2016",
        symbol: new CIMSymbol({
          data: {
            type: "CIMSymbolReference",
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMHatchFill",
                  enable: true,
                  lineSymbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 2],
                            lineDashEnding: "FullPattern"
                          }
                        ],
                        enable: true,
                        width: 1,
                        color: [21, 209, 21, 255]
                      }
                    ]
                  },
                  rotation: 45, // rotation of the lines
                  separation: 4 // distance between lines in hatch fill
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [0, 0, 230, 255]
                }
              ]
            }
          }
        })
      }],
      visualVariables: [
        new SizeVariable({
          valueExpression: `
            var dem16 = $feature.PRS_DEM_16;
            var rep16 = $feature.PRS_REP_16;
            var oth16 = $feature.PRS_OTH_16;
            var all = [dem16, rep16, oth16];
            return Sum(all);
          `,
          valueExpressionTitle: "Voter turnout",
          minDataValue: 100,
          minSize: 2,
          maxDataValue: 1000000,
          maxSize: 30
        }),
        new OpacityVariable({
          valueExpression: `
            var dem16 = $feature.PRS_DEM_16;
            var rep16 = $feature.PRS_REP_16;
            var oth16 = $feature.PRS_OTH_16;
            var all = [dem16, rep16, oth16];
            return (Max(all) / Sum(all)) * 100;
          `,
          stops: [
            { value: 90, opacity: 0.95 },
            { value: 33, opacity: 0.05 }
          ]
        })
      ]
    }),
  });

  const sizeExpressionBase = `
    var sizeFactor = When(
      percentStateVotes >= 10, 40,
      percentStateVotes >= 5, 30 + ((10/5) * (percentStateVotes - 5)),
      percentStateVotes >= 1, 20 + ((10/4) * (percentStateVotes - 1)),
      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),
      percentStateVotes > 0, percentStateVotes * 20,
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

  const offsetExpressionBase = `
    var sizeFactor = When(
      percentStateVotes >= 10, 40,
      percentStateVotes >= 5, 30 + ((10/5) * (percentStateVotes - 5)),
      percentStateVotes >= 1, 20 + ((10/4) * (percentStateVotes - 1)),
      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),
      percentStateVotes > 0, percentStateVotes * 20,
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

  const pointLayer = new FeatureLayer({
    portalItem: {
      id: "ba48def248cb45bebb234aa346c97676"
    },
    labelsVisible: false,
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
                  ${offsetExpressionBase}
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
                  ${offsetExpressionBase}
                  return offset * -1;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-positive-votes",
              propertyName: "OffsetY",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Republican votes",
                expression: `
                  var rep16 = $feature.PRS_REP_16;
                  var rep12 = $feature.PRS_REP_12;
                  var change = rep16 - rep12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "republican-negative-votes",
              propertyName: "OffsetY",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Republican votes",
                expression: `
                  var rep16 = $feature.PRS_REP_16;
                  var rep12 = $feature.PRS_REP_12;
                  var change = rep16 - rep12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-positive-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Increase in Other votes",
                expression: `
                  var oth16 = $feature.PRS_OTH_16;
                  var oth12 = $feature.PRS_OTH_12;
                  var change = oth16 - oth12;
                  var value = IIF( change > 0, change, 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetExpressionBase}
                  return offset;
                `,
                returnType: "Default"
              }
            },
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "other-negative-votes",
              propertyName: "OffsetX",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Decrease in Other votes",
                expression: `
                  var oth16 = $feature.PRS_OTH_16;
                  var oth12 = $feature.PRS_OTH_12;
                  var change = oth16 - oth12;
                  var value = IIF( change < 0, Abs(change), 0);
                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;
                  ${offsetExpressionBase}
                  return offset;
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
  });
  view.map.add(pointLayer);
  // var trailingLayer = turnoutLayer; // polygonLayer;
  // view.map.add(trailingLayer);

  // const swipe = new Swipe({
  //   view,
  //   leadingLayers: [ pointLayer ],
  //   trailingLayers: [ trailingLayer],
  //   position: 100
  // });
  // view.ui.add(swipe);

  // const legend = new Legend({
  //   view
  // });
  // view.ui.add(legend, "bottom-left");

})();
