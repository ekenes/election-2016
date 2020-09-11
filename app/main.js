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
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/PopupTemplate", "esri/popup/ExpressionInfo", "esri/popup/FieldInfo", "esri/popup/support/FieldInfoFormat", "esri/popup/content/FieldsContent", "esri/renderers", "esri/symbols"], function (require, exports, EsriMap, MapView, FeatureLayer, PopupTemplate, ExpressionInfo, FieldInfo, FieldInfoFormat, FieldsContent, renderers_1, symbols_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var map, maxSize, maxDataValue, maxScale, view, layer;
        return __generator(this, function (_a) {
            map = new EsriMap({
                basemap: {
                    portalItem: {
                        id: "3582b744bba84668b52a16b0b6942544"
                    }
                }
            });
            maxSize = 60;
            maxDataValue = 50000;
            maxScale = 18056 * 4 * 4 * 4;
            view = new MapView({
                container: "viewDiv",
                map: map,
                center: [-85, 38],
                zoom: 5,
                constraints: {
                    minScale: 0,
                    maxScale: maxScale
                },
                highlightOptions: {
                    fillOpacity: 0
                }
            });
            layer = new FeatureLayer({
                portalItem: {
                    id: "ba48def248cb45bebb234aa346c97676"
                },
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change > 0, change, 0);\n                  var boundedDataValue = when(\n                    value > " + maxDataValue + ", " + maxDataValue + ",\n                    value > 0 && value <= 100, 4,\n                    value\n                  );\n                  return boundedDataValue * (" + maxSize + " / " + maxDataValue + " ) * (" + maxScale + " / $view.scale);\n                ",
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
                                        expression: "\n                  var dem16 = $feature.PRS_DEM_16;\n                  var dem12 = $feature.PRS_DEM_12;\n                  var change = dem16 - dem12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var boundedDataValue = when(\n                    value > " + maxDataValue + ", " + maxDataValue + ",\n                    value > 0 && value <= 100, 100,\n                    value\n                  );\n                  return boundedDataValue * (" + maxSize + " / " + maxDataValue + " ) * (" + maxScale + " / $view.scale);\n                ",
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change > 0, change, 0);\n                  var boundedDataValue = when(\n                    value > " + maxDataValue + ", " + maxDataValue + ",\n                    value > 0 && value <= 100, 4,\n                    value\n                  );\n                  return boundedDataValue * (" + maxSize + " / " + maxDataValue + " ) * (" + maxScale + " / $view.scale);\n                ",
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
                                        expression: "\n                  var rep16 = $feature.PRS_REP_16;\n                  var rep12 = $feature.PRS_REP_12;\n                  var change = rep16 - rep12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var boundedDataValue = when(\n                    value > " + maxDataValue + ", " + maxDataValue + ",\n                    value > 0 && value <= 100, 4,\n                    value\n                  );\n                  return boundedDataValue * (" + maxSize + " / " + maxDataValue + " ) * (" + maxScale + " / $view.scale);\n                ",
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change > 0, change, 0);\n                  var boundedDataValue = when(\n                    value > " + maxDataValue + ", " + maxDataValue + ",\n                    value > 0 && value <= 100, 4,\n                    value\n                  );\n                  return boundedDataValue * (" + maxSize + " / " + maxDataValue + " ) * (" + maxScale + " / $view.scale);\n                ",
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
                                        expression: "\n                  var oth16 = $feature.PRS_OTH_16;\n                  var oth12 = $feature.PRS_OTH_12;\n                  var change = oth16 - oth12;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var boundedDataValue = when(\n                    value > " + maxDataValue + ", " + maxDataValue + ",\n                    value > 0 && value <= 100, 4,\n                    value\n                  );\n                  return boundedDataValue * (" + maxSize + " / " + maxDataValue + " ) * (" + maxScale + " / $view.scale);\n                ",
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
            return [2 /*return*/];
        });
    }); })();
});
//# sourceMappingURL=main.js.map