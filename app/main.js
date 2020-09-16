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
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/PopupTemplate", "esri/popup/ExpressionInfo", "esri/popup/FieldInfo", "esri/popup/support/FieldInfoFormat", "esri/popup/content/FieldsContent", "esri/renderers/visualVariables/OpacityVariable", "esri/renderers/visualVariables/SizeVariable", "esri/widgets/Swipe", "esri/widgets/Legend", "esri/layers/support/LabelClass", "esri/Color", "esri/symbols/Font", "esri/renderers", "esri/symbols", "esri/rasterRenderers", "esri/popup/content"], function (require, exports, EsriMap, MapView, FeatureLayer, PopupTemplate, ExpressionInfo, FieldInfo, FieldInfoFormat, FieldsContent, OpacityVariable, SizeVariable, Swipe, Legend, LabelClass, Color, Font, renderers_1, symbols_1, rasterRenderers_1, content_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var map, maxScale, referenceScale, view, rColorCIM, dColorCIM, oColorCIM, borderColorCIM100, borderColorCIM75, borderColorCIM50, borderColorCIM25, rColor, dColor, oColor, haloColor, oHaloColor, haloSize, turnoutLayer, polygonLayer, sizeExpressionBase, offsetXExpressionBase, offsetYExpressionBase, sizeTotalExpressionBase, offsetTotalExpressionBase, popupTemplate, changeLayer, results2012Layer, results2016Layer, resultsTotal2012Layer, resultsTotal2016Layer, trailingLayer, swipe, legend;
        return __generator(this, function (_a) {
            map = new EsriMap({
                basemap: {
                    portalItem: {
                        id: "fbfb62f3599f41e5a77845f863e2872f"
                    }
                }
            });
            maxScale = 4622324 / 16;
            referenceScale = 2311162;
            view = new MapView({
                container: "viewDiv",
                map: map,
                center: [-95, 40],
                scale: referenceScale * 8,
                constraints: {
                    minScale: 0,
                    maxScale: maxScale
                },
                highlightOptions: {
                    fillOpacity: 0
                }
            });
            view.watch("scale", function (scale) {
                console.log(scale);
            });
            rColorCIM = [220, 75, 0, 255];
            dColorCIM = [60, 108, 204, 255];
            oColorCIM = [224, 206, 0, 255];
            borderColorCIM100 = [133, 32, 1, 255];
            borderColorCIM75 = [133, 32, 1, 191];
            borderColorCIM50 = [133, 32, 1, 128];
            borderColorCIM25 = [133, 32, 1, 64];
            rColor = "rgba(220, 75, 0, 1)" // "#ed5151";  dc4b00
            ;
            dColor = "rgba(60, 108, 204,1)" // "#149ece";  3c6ccc
            ;
            oColor = "rgba(224, 206, 0, 1)";
            haloColor = "#f7f7f7";
            oHaloColor = "rgba(181, 166, 0, 1)";
            haloSize = 1;
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
                            ],
                            legendOptions: {
                                showLegend: false
                            }
                        })
                    ]
                }),
            });
            polygonLayer = new FeatureLayer({
                portalItem: {
                    id: "4f03bcde997e4badbef186d0c05f5a9a"
                },
                title: "2012 & 2016 Election results",
                opacity: 0.3,
                renderer: new rasterRenderers_1.UniqueValueRenderer({
                    valueExpression: "\n        var dem12 = $feature.SUM_PRS_DEM_12;\n        var rep12 = $feature.SUM_PRS_REP_12;\n        var oth12 = $feature.SUM_PRS_OTH_12;\n\n        var winner12 = Decode( Max([dem12, rep12, oth12]),\n          dem12, 'Democrat 2012',\n          rep12, 'Republican 2012',\n          oth12, 'Other 2012',\n        'n/a' );\n\n        var dem16 = $feature.SUM_PRS_DEM_16;\n        var rep16 = $feature.SUM_PRS_REP_16;\n        var oth16 = $feature.SUM_PRS_OTH_16;\n\n        var winner16 = Decode( Max([dem16, rep16, oth16]),\n          dem16, 'Democrat 2016',\n          rep16, 'Republican 2016',\n          oth16, 'Other 2016',\n        'n/a' );\n\n        return Concatenate([winner12, winner16], \", \");\n      ",
                    valueExpressionTitle: "Outright winner",
                    defaultSymbol: null,
                    uniqueValueInfos: [{
                            value: "Republican 2012, Republican 2016",
                            label: "Republican 2012 & 2016",
                            symbol: new symbols_1.SimpleFillSymbol({
                                color: rColor,
                                outline: null
                            })
                        }, {
                            value: "Democrat 2012, Democrat 2016",
                            label: "Democrat 2012 & 2016",
                            symbol: new symbols_1.SimpleFillSymbol({
                                color: dColor,
                                outline: null
                            })
                        },
                        // {
                        //   value: "Other 2012, Other 2016",
                        //   label: "Other 2012-2016",
                        //   symbol: new SimpleFillSymbol({
                        //     color: oColor,
                        //     outline: null
                        //   })
                        // },
                        {
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
                                                                    // dashTemplate: [5, 5],
                                                                    lineDashEnding: "FullPattern"
                                                                }
                                                            ],
                                                            enable: true,
                                                            width: 1,
                                                            color: dColorCIM
                                                        }
                                                    ]
                                                },
                                                rotation: 45,
                                                separation: 4 // distance between lines in hatch fill
                                            },
                                            {
                                                type: "CIMSolidFill",
                                                enable: true,
                                                color: rColorCIM
                                            },
                                            {
                                                type: "CIMSolidStroke",
                                                enable: true,
                                                width: 4,
                                                color: borderColorCIM100
                                            }
                                        ]
                                    }
                                }
                            })
                        },
                    ],
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
                        new content_1.TextContent({
                            text: "\n            The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>\n            candidate won {STATE} by a margin of {expression/winner-margin} points.\n            The {expression/winner-votes} votes cast for the winner comprise\n            {expression/winner-percent-state-votes} of the total votes cast in the state.\n          "
                        }),
                        new content_1.TextContent({
                            text: "\n            Votes per party in 2016 and the change from 2012:\n\n            <ul>\n              <li><span style='color:" + dColor + "; font-weight:bolder'>Democrat:</span>  {SUM_PRS_DEM_16} (<span style='color: {expression/dem-change-color}'>{expression/dem12change16}</span>)</li>\n              <li><span style='color:" + rColor + "; font-weight:bolder'>Republican:</span>  {SUM_PRS_REP_16} (<span style='color: {expression/rep-change-color}'>{expression/rep12change16}</span>)</li>\n              <li><span style='color:" + oHaloColor + "; font-weight:bolder'>Other:</span>  {SUM_PRS_OTH_16} (<span style='color: {expression/oth-change-color}'>{expression/oth12change16}</span>)</li>\n            </ul>\n          "
                        })
                    ],
                    expressionInfos: [
                        new ExpressionInfo({
                            title: "winner % of state votes",
                            name: "winner-percent-state-votes",
                            expression: "\n            var dem = $feature.SUM_PRS_DEM_16;\n            var rep = $feature.SUM_PRS_REP_16;\n            var oth = $feature.SUM_PRS_OTH_16;\n            var all = [dem, rep, oth];\n\n            var winnerTotal = Max(all);\n            return Text(winnerTotal/Sum(all), \"#%\");\n          "
                        }),
                        new ExpressionInfo({
                            title: "winner votes",
                            name: "winner-votes",
                            expression: "\n            var dem = $feature.SUM_PRS_DEM_16;\n            var rep = $feature.SUM_PRS_REP_16;\n            var oth = $feature.SUM_PRS_OTH_16;\n            var all = [dem, rep, oth];\n\n            return Text(Max(all), \"#,###\");\n          "
                        }),
                        new ExpressionInfo({
                            title: "winner-color",
                            name: "winner-color",
                            expression: "\n            var dem = $feature.SUM_PRS_DEM_16;\n            var rep = $feature.SUM_PRS_REP_16;\n            var oth = $feature.SUM_PRS_OTH_16;\n            var all = [dem, rep, oth];\n\n            Decode( Max(all),\n              dem, \"" + dColor + "\",\n              rep, \"" + rColor + "\",\n              oth, \"" + oColor + "\",\n            \"#000000\"\n            );\n          "
                        }),
                        new ExpressionInfo({
                            title: "winner",
                            name: "winner",
                            expression: "\n            var dem = $feature.SUM_PRS_DEM_16;\n            var rep = $feature.SUM_PRS_REP_16;\n            var oth = $feature.SUM_PRS_OTH_16;\n            var all = [dem, rep, oth];\n\n            Decode( Max(all),\n              dem, \"Democrat\",\n              rep, \"Republican\",\n              oth, \"other\",\n            \"tie\"\n            );\n          "
                        }),
                        new ExpressionInfo({
                            title: "Democrat change from 2012",
                            name: "dem12change16",
                            expression: "\n            var votes16 = $feature.SUM_PRS_DEM_16;\n            var votes12 = $feature.SUM_PRS_DEM_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n          "
                        }),
                        new ExpressionInfo({
                            title: "Republican change from 2012",
                            name: "rep12change16",
                            expression: "\n            var votes16 = $feature.SUM_PRS_REP_16;\n            var votes12 = $feature.SUM_PRS_REP_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n          "
                        }),
                        new ExpressionInfo({
                            title: "Other change from 2012",
                            name: "oth12change16",
                            expression: "\n            var votes16 = $feature.SUM_PRS_OTH_16;\n            var votes12 = $feature.SUM_PRS_OTH_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n          "
                        }),
                        new ExpressionInfo({
                            title: "change-color",
                            name: "dem-change-color",
                            expression: "\n            var votes16 = $feature.SUM_PRS_DEM_16;\n            var votes12 = $feature.SUM_PRS_DEM_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return IIF(diff > 0, \"green\", \"red\");\n          "
                        }),
                        new ExpressionInfo({
                            title: "change-color",
                            name: "rep-change-color",
                            expression: "\n            var votes16 = $feature.SUM_PRS_REP_16;\n            var votes12 = $feature.SUM_PRS_REP_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return IIF(diff > 0, \"green\", \"red\");\n          "
                        }),
                        new ExpressionInfo({
                            title: "change-color",
                            name: "oth-change-color",
                            expression: "\n            var votes16 = $feature.SUM_PRS_OTH_16;\n            var votes12 = $feature.SUM_PRS_OTH_12;\n            var diff = votes16 - votes12;\n            var change = ( (votes16 - votes12) / votes12 );\n            return IIF(diff > 0, \"green\", \"red\");\n          "
                        }),
                        new ExpressionInfo({
                            title: "winner-margin",
                            name: "winner-margin",
                            expression: "\n            var fields = [\n              $feature.SUM_PRS_DEM_16,\n              $feature.SUM_PRS_REP_16,\n              $feature.SUM_PRS_OTH_16\n            ];\n\n            var top2 = Top(Reverse(Sort(fields)), 2);\n            var winner = First(top2);\n            var secondPlace = top2[1];\n            var total = Sum(fields);\n            return Text( (winner - secondPlace) / total, \"#.#%\");\n          "
                        })
                    ]
                })
            });
            sizeExpressionBase = "\n    var sizeFactor = When(\n      percentStateVotes >= 30, 40,\n      percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),\n      percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),\n      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),\n      percentStateVotes > 0, 2 + ((8/0.5) * percentStateVotes),\n      // percentStateVotes > 0, (20 * percentStateVotes),\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    return sizeFactor * scaleFactor;\n  ";
            offsetXExpressionBase = "\n    var sizeFactor = When(\n      percentStateVotes >= 30, 40,\n      percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),\n      percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),\n      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),\n      percentStateVotes > 0, 2 + ((8/0.5) * percentStateVotes),\n      // percentStateVotes > 0, (20 * percentStateVotes),\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    var diameter = sizeFactor * scaleFactor;\n    var offset = diameter / 2;\n  ";
            offsetYExpressionBase = "\n    var sizeFactor = When(\n      percentStateVotes >= 30, 40,\n      percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),\n      percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),\n      percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),\n      percentStateVotes > 0, 2 + ((8/0.5) * percentStateVotes),\n      // percentStateVotes > 0, (20 * percentStateVotes),\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    var diameter = sizeFactor * scaleFactor;\n    var offset = diameter * 0.67;\n  ";
            sizeTotalExpressionBase = "\n    var sizeFactor = When(\n      votes >= 1000000, 40,\n      votes >= 100000, 30 + (((40-30) / (1000000-100000)) * (votes - 100000)),\n      votes >= 50000, 20 + (((30-20) / (100000-50000)) * (votes - 50000)),\n      votes > 10000, 10 + (((20-10) / (50000-10000)) * (votes - 10000)),\n      votes > 0, 2 + (((10-2) / (10000-0)) * votes),\n      // votes > 0, (20 * votes),\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    return sizeFactor * scaleFactor;\n  ";
            offsetTotalExpressionBase = "\n    var sizeFactor = When(\n      votes >= 1000000, 40,\n      votes >= 100000, 30 + (((40-30) / (1000000-100000)) * (votes - 100000)),\n      votes >= 50000, 20 + (((30-20) / (100000-50000)) * (votes - 50000)),\n      votes > 10000, 10 + (((20-10) / (50000-10000)) * (votes - 10000)),\n      votes > 0, 2 + (((10-2) / (10000-0)) * votes),\n      // votes > 0, (20 * votes),\n      0\n    );\n\n    var scaleFactorBase = ( " + referenceScale + " / $view.scale );\n\n    var scaleFactor = When(\n      scaleFactorBase >= 1, 1,  // 1\n      scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n      scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n      scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n      scaleFactorBase * 3  // 0.1875\n    );\n    var diameter = sizeFactor * scaleFactor;\n    var offset = diameter / 2;\n  ";
            popupTemplate = new PopupTemplate({
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
                    new content_1.TextContent({
                        text: "\n          The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>\n          candidate won this county by a margin of {expression/winner-margin}.\n          The {expression/winner-votes} votes cast for the winner comprise\n          {expression/winner-percent-state-votes} of the total votes cast in the state.\n        "
                    }),
                    new content_1.TextContent({
                        text: "\n          Votes per party in 2016 and the change from 2012:\n\n          <ul>\n            <li><span style='color:" + dColor + "; font-weight:bolder'>Democrat:</span>  {PRS_DEM_16} (<span style='color: {expression/dem-change-color}'>{expression/dem12change16}</span>)</li>\n            <li><span style='color:" + rColor + "; font-weight:bolder'>Republican:</span>  {PRS_REP_16} (<span style='color: {expression/rep-change-color}'>{expression/rep12change16}</span>)</li>\n            <li><span style='color:" + oHaloColor + "; font-weight:bolder'>Other:</span>  {PRS_OTH_16} (<span style='color: {expression/oth-change-color}'>{expression/oth12change16}</span>)</li>\n          </ul>\n        "
                    })
                ],
                expressionInfos: [
                    new ExpressionInfo({
                        title: "winner % of state votes",
                        name: "winner-percent-state-votes",
                        expression: "\n          var dem = $feature.PRS_DEM_16;\n          var rep = $feature.PRS_REP_16;\n          var oth = $feature.PRS_OTH_16;\n          var all = [dem, rep, oth];\n\n          var winnerTotal = Max(all);\n          return Text(winnerTotal/$feature.TOTAL_STATE_VOTES_16, \"#%\");\n        "
                    }),
                    new ExpressionInfo({
                        title: "winner votes",
                        name: "winner-votes",
                        expression: "\n          var dem = $feature.PRS_DEM_16;\n          var rep = $feature.PRS_REP_16;\n          var oth = $feature.PRS_OTH_16;\n          var all = [dem, rep, oth];\n\n          return Text(Max(all), \"#,###\");\n        "
                    }),
                    new ExpressionInfo({
                        title: "winner-color",
                        name: "winner-color",
                        expression: "\n          var dem = $feature.PRS_DEM_16;\n          var rep = $feature.PRS_REP_16;\n          var oth = $feature.PRS_OTH_16;\n          var all = [dem, rep, oth];\n\n          Decode( Max(all),\n            dem, \"" + dColor + "\",\n            rep, \"" + rColor + "\",\n            oth, \"" + oColor + "\",\n          \"#000000\"\n          );\n        "
                    }),
                    new ExpressionInfo({
                        title: "winner",
                        name: "winner",
                        expression: "\n          var dem = $feature.PRS_DEM_16;\n          var rep = $feature.PRS_REP_16;\n          var oth = $feature.PRS_OTH_16;\n          var all = [dem, rep, oth];\n\n          Decode( Max(all),\n            dem, \"Democrat\",\n            rep, \"Republican\",\n            oth, \"other\",\n          \"tie\"\n          );\n        "
                    }),
                    new ExpressionInfo({
                        title: "Democrat change from 2012",
                        name: "dem12change16",
                        expression: "\n          var votes16 = $feature.PRS_DEM_16;\n          var votes12 = $feature.PRS_DEM_12;\n          var diff = votes16 - votes12;\n          var change = ( (votes16 - votes12) / votes12 );\n          return IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n        "
                    }),
                    new ExpressionInfo({
                        title: "Republican change from 2012",
                        name: "rep12change16",
                        expression: "\n          var votes16 = $feature.PRS_REP_16;\n          var votes12 = $feature.PRS_REP_12;\n          var diff = votes16 - votes12;\n          var change = ( (votes16 - votes12) / votes12 );\n          return IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n        "
                    }),
                    new ExpressionInfo({
                        title: "Other change from 2012",
                        name: "oth12change16",
                        expression: "\n          var votes16 = $feature.PRS_OTH_16;\n          var votes12 = $feature.PRS_OTH_12;\n          var diff = votes16 - votes12;\n          var change = ( (votes16 - votes12) / votes12 );\n          return IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n        "
                    }),
                    new ExpressionInfo({
                        title: "change-color",
                        name: "dem-change-color",
                        expression: "\n          var votes16 = $feature.PRS_DEM_16;\n          var votes12 = $feature.PRS_DEM_12;\n          var diff = votes16 - votes12;\n          var change = ( (votes16 - votes12) / votes12 );\n          return IIF(diff > 0, \"green\", \"red\");\n        "
                    }),
                    new ExpressionInfo({
                        title: "change-color",
                        name: "rep-change-color",
                        expression: "\n          var votes16 = $feature.PRS_REP_16;\n          var votes12 = $feature.PRS_REP_12;\n          var diff = votes16 - votes12;\n          var change = ( (votes16 - votes12) / votes12 );\n          return IIF(diff > 0, \"green\", \"red\");\n        "
                    }),
                    new ExpressionInfo({
                        title: "change-color",
                        name: "oth-change-color",
                        expression: "\n          var votes16 = $feature.PRS_OTH_16;\n          var votes12 = $feature.PRS_OTH_12;\n          var diff = votes16 - votes12;\n          var change = ( (votes16 - votes12) / votes12 );\n          return IIF(diff > 0, \"green\", \"red\");\n        "
                    }),
                    new ExpressionInfo({
                        title: "winner-margin",
                        name: "winner-margin",
                        expression: "\n          var fields = [\n            $feature.PRS_DEM_16,\n            $feature.PRS_REP_16,\n            $feature.PRS_OTH_16\n          ];\n\n          var top2 = Top(Reverse(Sort(fields)), 2);\n          var winner = First(top2);\n          var secondPlace = top2[1];\n          var total = Sum(fields);\n          return Text( (winner - secondPlace) / total, \"#.#%\");\n        "
                    })
                ]
            });
            changeLayer = new FeatureLayer({
                portalItem: {
                    id: "ba48def248cb45bebb234aa346c97676"
                },
                legendEnabled: false,
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetYExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetYExpressionBase + "\n                  return offset;\n                ",
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
                            expression: "\n            var value16 = $feature.PRS_DEM_16;\n            var value12 = $feature.PRS_DEM_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -50,
                            yoffset: -25
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 10",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_DEM_16;\n            var value12 = $feature.PRS_DEM_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -40,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 5",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_DEM_16;\n            var value12 = $feature.PRS_DEM_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -40,
                            yoffset: -10
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 1",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_DEM_16;\n            var value12 = $feature.PRS_DEM_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -30,
                            yoffset: -10
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16 - PRS_DEM_12) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_DEM_16;\n            var value12 = $feature.PRS_DEM_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
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
                            expression: "\n            var value16 = $feature.PRS_REP_16;\n            var value12 = $feature.PRS_REP_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 60,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 10",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_REP_16;\n            var value12 = $feature.PRS_REP_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 35,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 5",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_REP_16;\n            var value12 = $feature.PRS_REP_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 20,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 1",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_REP_16;\n            var value12 = $feature.PRS_REP_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 20,
                            yoffset: -10
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16 - PRS_REP_12) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_REP_16;\n            var value12 = $feature.PRS_REP_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
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
                            expression: "\n            var value16 = $feature.PRS_OTH_16;\n            var value12 = $feature.PRS_OTH_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 40
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 10",
                        labelExpressionInfo: {
                            expression: "\n          var value16 = $feature.PRS_OTH_16;\n          var value12 = $feature.PRS_OTH_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 40
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "\n          (ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 5)\n        ",
                        labelExpressionInfo: {
                            expression: "\n          var value16 = $feature.PRS_OTH_16;\n          var value12 = $feature.PRS_OTH_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 30
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "\n          (ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 1)\n        ",
                        labelExpressionInfo: {
                            expression: "\n          var value16 = $feature.PRS_OTH_16;\n          var value12 = $feature.PRS_OTH_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "\n          (ABS(((PRS_OTH_16 - PRS_OTH_12) / TOTAL_STATE_VOTES_16) * 100) < 0.5)\n        ",
                        labelExpressionInfo: {
                            expression: "\n            var value16 = $feature.PRS_OTH_16;\n            var value12 = $feature.PRS_OTH_12;\n            var change = value16 - value12;\n            IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 10,
                            yoffset: 10
                        })
                    })
                ],
                popupTemplate: popupTemplate
            });
            results2012Layer = new FeatureLayer({
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_DEM_12 / $feature.TOTAL_STATE_VOTES_12 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_REP_12 / $feature.TOTAL_STATE_VOTES_12 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_OTH_12 / $feature.TOTAL_STATE_VOTES_12 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_DEM_12 / $feature.TOTAL_STATE_VOTES_12 ) * 100;\n\n                  " + offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_REP_12 / $feature.TOTAL_STATE_VOTES_12 ) * 100;\n                  " + offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_OTH_12 / $feature.TOTAL_STATE_VOTES_12 ) * 100;\n\n                  " + offsetYExpressionBase + "\n                  return offset;\n                ",
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
            results2016Layer = new FeatureLayer({
                portalItem: {
                    id: "ba48def248cb45bebb234aa346c97676"
                },
                legendEnabled: false,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_DEM_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_REP_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_OTH_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n\n                " + sizeExpressionBase,
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_DEM_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n\n                  " + offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_REP_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n                  " + offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var percentStateVotes = ( $feature.PRS_OTH_16 / $feature.TOTAL_STATE_VOTES_16 ) * 100;\n\n                  " + offsetYExpressionBase + "\n                  return offset;\n                ",
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
                            expression: "\n            Text($feature.PRS_DEM_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -50,
                            yoffset: -25
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 10",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_DEM_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -40,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 5",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_DEM_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -40,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 1",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_DEM_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(dColor),
                            xoffset: -30,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_DEM_16) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_DEM_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
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
                            expression: "\n            Text($feature.PRS_REP_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 50,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 10",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_REP_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 40,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 5",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_REP_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 30,
                            yoffset: -20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 1",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_REP_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(rColor),
                            xoffset: 20,
                            yoffset: -10
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_REP_16) / TOTAL_STATE_VOTES_16) * 100) < 0.5",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_REP_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
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
                            expression: "\n            Text($feature.PRS_OTH_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 40
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 5 AND ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 10",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_OTH_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 40
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "\n          (ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 1 AND ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 5)\n        ",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_OTH_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 30
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "\n          (ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) >= 0.5 AND ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 1)\n        ",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_OTH_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 20,
                            yoffset: 20
                        })
                    }),
                    new LabelClass({
                        minScale: 577791,
                        where: "\n          (ABS(((PRS_OTH_16) / TOTAL_STATE_VOTES_16) * 100) < 0.5)\n        ",
                        labelExpressionInfo: {
                            expression: "\n            Text($feature.PRS_OTH_16, '#,###');\n          "
                        },
                        deconflictionStrategy: "none",
                        labelPlacement: "center-center",
                        symbol: new symbols_1.TextSymbol({
                            font: new Font({
                                weight: "bold",
                                family: "Noto Sans",
                                size: "10pt"
                            }),
                            haloColor: new Color(haloColor),
                            haloSize: haloSize,
                            color: new Color(oHaloColor),
                            xoffset: 10,
                            yoffset: 10
                        })
                    })
                ],
                popupTemplate: popupTemplate
            });
            resultsTotal2012Layer = new FeatureLayer({
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
                                        expression: "\n                  var votes = $feature.PRS_DEM_12;\n\n                " + sizeTotalExpressionBase,
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
                                        expression: "\n                  var votes = $feature.PRS_REP_12;\n\n                " + sizeTotalExpressionBase,
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
                                        expression: "\n                  var votes = $feature.PRS_OTH_12;\n\n                " + sizeTotalExpressionBase,
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
                                        expression: "\n                  var votes = $feature.PRS_DEM_12;\n\n                  " + offsetTotalExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var votes = $feature.PRS_REP_12;\n                  " + offsetTotalExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var votes = $feature.PRS_OTH_12;\n\n                  " + offsetTotalExpressionBase + "\n                  return offset;\n                ",
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
            resultsTotal2016Layer = new FeatureLayer({
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
                                        expression: "\n                  var votes = $feature.PRS_DEM_16;\n\n                " + sizeTotalExpressionBase,
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
                                        expression: "\n                  var votes = $feature.PRS_REP_16;\n\n                " + sizeTotalExpressionBase,
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
                                        expression: "\n                  var votes = $feature.PRS_OTH_16;\n\n                " + sizeTotalExpressionBase,
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
                                        expression: "\n                  var votes = $feature.PRS_DEM_16;\n\n                  " + offsetTotalExpressionBase + "\n                  return offset * -1;\n                ",
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
                                        expression: "\n                  var votes = $feature.PRS_REP_16;\n                  " + offsetTotalExpressionBase + "\n                  return offset;\n                ",
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
                                        expression: "\n                  var votes = $feature.PRS_OTH_16;\n\n                  " + offsetTotalExpressionBase + "\n                  return offset;\n                ",
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
            trailingLayer = polygonLayer;
            view.map.add(polygonLayer);
            // view.map.add(changeLayer);
            // view.map.add(results2012Layer);
            // view.map.add(results2016Layer);
            view.map.add(changeLayer);
            view.map.add(results2016Layer);
            swipe = new Swipe({
                view: view,
                leadingLayers: [changeLayer],
                trailingLayers: [results2016Layer, polygonLayer],
                position: 90
            });
            view.ui.add(swipe);
            legend = new Legend({
                view: view
            });
            view.ui.add(legend, "bottom-left");
            return [2 /*return*/];
        });
    }); })();
});
//# sourceMappingURL=main.js.map