var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/PopupTemplate", "esri/popup/ExpressionInfo", "esri/popup/FieldInfo", "esri/popup/support/FieldInfoFormat", "esri/popup/content/FieldsContent", "esri/renderers/visualVariables/OpacityVariable", "esri/renderers/visualVariables/SizeVariable", "esri/renderers", "esri/symbols", "esri/rasterRenderers"], function (require, exports, EsriMap, MapView, FeatureLayer, PopupTemplate, ExpressionInfo, FieldInfo, FieldInfoFormat, FieldsContent, OpacityVariable, SizeVariable, renderers_1, symbols_1, rasterRenderers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var map, maxSize, minDataValue, maxDataValue, maxScale, referenceScale, view, turnoutLayer, polygonLayer, sizeExpressionBase, offsetExpressionBase, pointLayer;
        return __generator(this, function (_a) {
            map = new EsriMap({
                basemap: {
                    portalItem: {
                        id: "3582b744bba84668b52a16b0b6942544"
                    }
                }
            });
            maxSize = 15;
            minDataValue = 100;
            maxDataValue = 5000;
            maxScale = 4622324;
            referenceScale = 2311162;
            view = new MapView({
                container: "viewDiv",
                map: map,
                center: [-112, 40],
                scale: referenceScale,
                constraints: {
                    minScale: 0,
                    maxScale: maxScale / 16
                },
                highlightOptions: {
                    fillOpacity: 0
                }
            });
            view.watch("scale", function (scale) {
                console.log(scale);
            });
            turnoutLayer = new FeatureLayer({
                portalItem: {
                    id: "91910117e36f49ee9a88b84fa5053c67"
                },
                opacity: 1,
                renderer: new rasterRenderers_1.UniqueValueRenderer({
                    valueExpression: "\n        var dem12 = $feature.PRS_DEM_12;\n        var rep12 = $feature.PRS_REP_12;\n        var oth12 = $feature.PRS_OTH_12;\n\n        var winner12 = Decode( Max([dem12, rep12, oth12]),\n          dem12, 'Democrat 2012',\n          rep12, 'Republican 2012',\n          oth12, 'Other 2012',\n        'n/a' );\n\n        var dem16 = $feature.PRS_DEM_16;\n        var rep16 = $feature.PRS_REP_16;\n        var oth16 = $feature.PRS_OTH_16;\n\n        var winner16 = Decode( Max([dem16, rep16, oth16]),\n          dem16, 'Democrat 2016',\n          rep16, 'Republican 2016',\n          oth16, 'Other 2016',\n        'n/a' );\n\n        return Concatenate([winner12, winner16], \", \");\n      ",
                    valueExpressionTitle: "Outright winner",
                    defaultSymbol: new symbols_1.SimpleFillSymbol({
                        color: "rgba(128,128,128)",
                        style: "solid"
                    }),
                    uniqueValueInfos: [{
                            value: "Republican 2012, Republican 2016",
                            label: "Republican 2012-2016",
                            symbol: new symbols_1.SimpleMarkerSymbol({
                                color: "rgba(230, 0, 0, 1)",
                                outline: null,
                                size: 30
                            })
                        }, {
                            value: "Democrat 2012, Democrat 2016",
                            label: "Democrat 2012-2016",
                            symbol: new symbols_1.SimpleMarkerSymbol({
                                color: "rgba(0, 0, 230, 1)",
                                outline: null,
                                size: 30
                            })
                        }, {
                            value: "Other 2012, Other 2016",
                            label: "Other 2012-2016",
                            symbol: new symbols_1.SimpleMarkerSymbol({
                                color: "rgba(21, 209, 21, 1)",
                                outline: null,
                                size: 30
                            })
                        }, {
                            value: "Democrat 2012, Republican 2016",
                            label: "Democrat 2012, Republican 2016",
                            symbol: new symbols_1.CIMSymbol({
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
                                                                    rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                                    rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                                    rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                                    rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                                    rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                                    rotation: 45,
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
                            valueExpression: "\n            var dem16 = $feature.PRS_DEM_16;\n            var rep16 = $feature.PRS_REP_16;\n            var oth16 = $feature.PRS_OTH_16;\n            var all = [dem16, rep16, oth16];\n            return Sum(all);\n          ",
                            valueExpressionTitle: "Voter turnout",
                            minDataValue: 100,
                            minSize: 2,
                            maxDataValue: 1000000,
                            maxSize: 30
                        }),
                        new OpacityVariable({
                            valueExpression: "\n            var dem16 = $feature.PRS_DEM_16;\n            var rep16 = $feature.PRS_REP_16;\n            var oth16 = $feature.PRS_OTH_16;\n            var all = [dem16, rep16, oth16];\n            return (Max(all) / Sum(all)) * 100;\n          ",
                            stops: [
                                { value: 90, opacity: 0.95 },
                                { value: 10, opacity: 0.05 }
                            ]
                        })
                    ]
                }),
            });
            polygonLayer = new FeatureLayer({
                portalItem: {
                    id: "91910117e36f49ee9a88b84fa5053c67"
                },
                opacity: 1,
                renderer: new rasterRenderers_1.UniqueValueRenderer({
                    valueExpression: "\n        var dem12 = $feature.PRS_DEM_12;\n        var rep12 = $feature.PRS_REP_12;\n        var oth12 = $feature.PRS_OTH_12;\n\n        var winner12 = Decode( Max([dem12, rep12, oth12]),\n          dem12, 'Democrat 2012',\n          rep12, 'Republican 2012',\n          oth12, 'Other 2012',\n        'n/a' );\n\n        var dem16 = $feature.PRS_DEM_16;\n        var rep16 = $feature.PRS_REP_16;\n        var oth16 = $feature.PRS_OTH_16;\n\n        var winner16 = Decode( Max([dem16, rep16, oth16]),\n          dem16, 'Democrat 2016',\n          rep16, 'Republican 2016',\n          oth16, 'Other 2016',\n        'n/a' );\n\n        console(Concatenate([winner12, winner16], \", \"))\n\n        return Concatenate([winner12, winner16], \", \");\n      ",
                    valueExpressionTitle: "Outright winner",
                    defaultSymbol: new symbols_1.SimpleFillSymbol({
                        color: "rgba(128,128,128)",
                        style: "solid"
                    }),
                    uniqueValueInfos: [{
                            value: "Republican 2012, Republican 2016",
                            label: "Republican 2012-2016",
                            symbol: new symbols_1.SimpleFillSymbol({
                                color: "rgba(230, 0, 0, 1)",
                                outline: null
                            })
                        }, {
                            value: "Democrat 2012, Democrat 2016",
                            label: "Democrat 2012-2016",
                            symbol: new symbols_1.SimpleFillSymbol({
                                color: "rgba(0, 0, 230, 1)",
                                outline: null
                            })
                        }, {
                            value: "Other 2012, Other 2016",
                            label: "Other 2012-2016",
                            symbol: new symbols_1.SimpleFillSymbol({
                                color: "rgba(21, 209, 21, 1)",
                                outline: null
                            })
                        }, {
                            value: "Democrat 2012, Republican 2016",
                            label: "Democrat 2012, Republican 2016",
                            symbol: new symbols_1.CIMSymbol({
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
                                                rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                rotation: 45,
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
                            symbol: new symbols_1.CIMSymbol({
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
                                                rotation: 45,
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
                            valueExpression: "\n            var dem16 = $feature.PRS_DEM_16;\n            var rep16 = $feature.PRS_REP_16;\n            var oth16 = $feature.PRS_OTH_16;\n            var all = [dem16, rep16, oth16];\n            return Sum(all);\n          ",
                            valueExpressionTitle: "Voter turnout",
                            minDataValue: 100,
                            minSize: 2,
                            maxDataValue: 1000000,
                            maxSize: 30
                        }),
                        new OpacityVariable({
                            valueExpression: "\n            var dem16 = $feature.PRS_DEM_16;\n            var rep16 = $feature.PRS_REP_16;\n            var oth16 = $feature.PRS_OTH_16;\n            var all = [dem16, rep16, oth16];\n            return (Max(all) / Sum(all)) * 100;\n          ",
                            stops: [
                                { value: 90, opacity: 0.95 },
                                { value: 33, opacity: 0.05 }
                            ]
                        })
                    ]
                }),
            });
            sizeExpressionBase = "\n    var sizeFactor = When(\n      percentStateVotes >= 10, 40,\n      percentStateVotes >= 5, 30 + ((10/5) * (percentStateVotes - 5)),\n      percentStateVotes >= 1, 20 + ((10/4) * (percentStateVotes - 1)),\n      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),\n      percentStateVotes > 0, percentStateVotes * 20,\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    return sizeFactor * scaleFactor;\n  ";
            offsetExpressionBase = "\n    var sizeFactor = When(\n      percentStateVotes >= 10, 40,\n      percentStateVotes >= 5, 30 + ((10/5) * (percentStateVotes - 5)),\n      percentStateVotes >= 1, 20 + ((10/4) * (percentStateVotes - 1)),\n      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),\n      percentStateVotes > 0, percentStateVotes * 20,\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    var diameter = sizeFactor * scaleFactor;\n    var offset = diameter / 2;\n  ";
            pointLayer = new FeatureLayer({
                portalItem: {
                    id: "ba48def248cb45bebb234aa346c97676"
                },
                labelsVisible: false,
                renderer: new renderers_1.SimpleRenderer({
                    symbol: new symbols_1.CIMSymbol({
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetExpressionBase + "\n                  return offset;\n                ",
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
                            expression: "\n            var votes16 = $feature.PRS_DEM_16;\n            var votes12 = $feature.PRS_DEM_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return `${Text(diff, \"#,###\")} (${Text(change, \"#%\")})`\n          "
                        }),
                        new ExpressionInfo({
                            title: "Republican change from 2012",
                            name: "rep12change16",
                            expression: "\n            var votes16 = $feature.PRS_REP_16;\n            var votes12 = $feature.PRS_REP_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return `${Text(diff, \"#,###\")} (${Text(change, \"#%\")})`\n          "
                        }),
                        new ExpressionInfo({
                            title: "Other change from 2012",
                            name: "oth12change16",
                            expression: "\n            var votes16 = $feature.PRS_OTH_16;\n            var votes12 = $feature.PRS_OTH_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return `${Text(diff, \"#,###\")} (${Text(change, \"#%\")})`\n          "
                        })
                    ]
                })
            });
            view.map.add(pointLayer);
            return [2 /*return*/];
        });
    }); })();
});
//# sourceMappingURL=main.js.map