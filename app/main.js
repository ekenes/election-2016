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
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Swipe", "esri/widgets/Legend", "esri/renderers", "esri/symbols", "esri/rasterRenderers", "./config", "./expressionUtils", "./symbolUtils", "./popupUtils", "./labelingUtils"], function (require, exports, EsriMap, MapView, FeatureLayer, Swipe, Legend, renderers_1, symbols_1, rasterRenderers_1, config_1, expressionUtils_1, symbolUtils_1, popupUtils_1, labelingUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        function updateLegendOpacity() {
            if (!visibilityEnabled) {
                return;
            }
            var threshold = 50;
            if (swipe.position <= 85) {
                totalLegend.style.display = "block";
                var opacity = (35 - (swipe.position - threshold)) * 3.5;
                totalLegend.style.opacity = (opacity * 0.01).toString();
            }
            else {
                totalLegend.style.display = "none";
            }
            if (swipe.position <= 50) {
                changeLegend.style.display = "block";
                var opacity = (35 - (threshold - swipe.position)) * 3.5;
                changeLegend.style.opacity = (opacity * 0.01).toString();
            }
            if (swipe.position <= 15) {
                changeLegend.style.opacity = "0";
                changeLegend.style.display = "none";
            }
        }
        function updateLegendHeight() {
            changeLegend.style.height = null;
            changeLegend.style.overflow = null;
            totalLegend.style.height = null;
            totalLegend.style.overflow = null;
            if (view.heightBreakpoint === "small") {
                changeLegend.style.height = "450px";
                changeLegend.style.overflow = "auto";
                totalLegend.style.height = "450px";
                totalLegend.style.overflow = "auto";
            }
            if (view.heightBreakpoint === "xsmall") {
                changeLegend.style.height = "300px";
                changeLegend.style.overflow = "auto";
                totalLegend.style.height = "300px";
                totalLegend.style.overflow = "auto";
            }
        }
        var map, view, stateElectoralResultsLayer, swingStatesLayer, countyChangeLayer, countyResultsLayer, stateChangeLayer, stateResultsLayer, swipe, totalLegend, changeLegend, infoToggle, visibilityEnabled, toggleInfoVisibility;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map = new EsriMap({
                        basemap: {
                            portalItem: {
                                id: "fbfb62f3599f41e5a77845f863e2872f"
                            }
                        }
                    });
                    view = new MapView({
                        container: "viewDiv",
                        map: map,
                        center: [-95, 40],
                        scale: config_1.referenceScale * 8,
                        constraints: {
                            minScale: 0,
                            maxScale: config_1.maxScale
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
                    stateElectoralResultsLayer = new FeatureLayer({
                        portalItem: {
                            id: "4f03bcde997e4badbef186d0c05f5a9a"
                        },
                        title: "Results by state",
                        opacity: 0.3,
                        renderer: new rasterRenderers_1.UniqueValueRenderer({
                            valueExpression: "\n        var dem = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n        var rep = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n        var oth = $feature." + config_1.fieldInfos.other.state.next.name + ";\n\n        var winner = Decode( Max([dem, rep, oth]),\n          dem, 'Democrat',\n          rep, 'Republican',\n          oth, 'Other',\n        'n/a' );\n\n        return winner;\n      ",
                            defaultSymbol: null,
                            uniqueValueInfos: [{
                                    value: "Republican",
                                    label: "R - " + config_1.results.republican.candidate + " (" + config_1.results.republican.electoralVotes + ")",
                                    symbol: new symbols_1.SimpleFillSymbol({
                                        color: config_1.rColor,
                                        outline: null
                                    })
                                }, {
                                    value: "Democrat",
                                    label: "D - " + config_1.results.democrat.candidate + " (" + config_1.results.democrat.electoralVotes + ")",
                                    symbol: new symbols_1.SimpleFillSymbol({
                                        color: config_1.dColor,
                                        outline: null
                                    })
                                }]
                        }),
                        popupTemplate: popupUtils_1.statePopupTemplate,
                        popupEnabled: false
                    });
                    swingStatesLayer = new FeatureLayer({
                        portalItem: {
                            id: "4f03bcde997e4badbef186d0c05f5a9a"
                        },
                        title: "Swing states",
                        opacity: 0.3,
                        renderer: new rasterRenderers_1.UniqueValueRenderer({
                            valueExpression: "\n        var demPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n        var repPrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n        var othPrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n\n        var winnerPrevious = Decode( Max([demPrevious, repPrevious, othPrevious]),\n          demPrevious, 'Democrat " + config_1.years.previous + "',\n          repPrevious, 'Republican " + config_1.years.previous + "',\n          othPrevious, 'Other " + config_1.years.previous + "',\n        'n/a' );\n\n        var demNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n        var repNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n        var othNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n\n        var winnerNext = Decode( Max([demNext, repNext, othNext]),\n        demNext, 'Democrat " + config_1.years.next + "',\n        repNext, 'Republican " + config_1.years.next + "',\n        othNext, 'Other " + config_1.years.next + "',\n        'n/a' );\n\n        return Concatenate([winnerPrevious, winnerNext], \", \");\n      ",
                            defaultSymbol: null,
                            uniqueValueInfos: [{
                                    value: "Democrat " + config_1.years.previous + ", Republican " + config_1.years.next,
                                    label: "Flipped Republican in " + config_1.years.next,
                                    symbol: new symbols_1.SimpleFillSymbol({
                                        color: config_1.rColor,
                                        outline: null
                                    })
                                }, {
                                    value: "Republican " + config_1.years.previous + ", Democrat " + config_1.years.next,
                                    label: "Flipped Democrat in " + config_1.years.next,
                                    symbol: new symbols_1.SimpleFillSymbol({
                                        color: config_1.dColor,
                                        outline: null
                                    })
                                }]
                        }),
                        popupTemplate: popupUtils_1.statePopupTemplate,
                        popupEnabled: false
                    });
                    countyChangeLayer = new FeatureLayer({
                        minScale: config_1.scaleThreshold,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.dColorCIM
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMLineSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidStroke",
                                                                    enable: true,
                                                                    color: config_1.dColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.rColorCIM
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMLineSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidStroke",
                                                                    enable: true,
                                                                    color: config_1.rColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.oColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMLineSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidStroke",
                                                                    enable: true,
                                                                    color: config_1.oColorCIM,
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.sizeExpressionBase + "\n                ",
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.sizeExpressionBase + "\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.sizeExpressionBase + "\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.sizeExpressionBase + "\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.sizeExpressionBase + "\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.sizeExpressionBase + "\n                ",
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetYExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetYExpressionBase + "\n                  return offset;\n                ",
                                                returnType: "Default"
                                            }
                                        }
                                    ]
                                }
                            })
                        }),
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.countyChangeLabelingInfo,
                        popupTemplate: popupUtils_1.countyPopupTemplate
                    });
                    countyResultsLayer = new FeatureLayer({
                        minScale: config_1.scaleThreshold,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.oColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.dColorCIM
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.rColorCIM
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
                                                expression: "\n                  var percentStateVotes = ( $feature." + config_1.fieldInfos.democrat.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n                " + expressionUtils_1.sizeExpressionBase,
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
                                                expression: "\n                  var percentStateVotes = ( $feature." + config_1.fieldInfos.republican.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n                " + expressionUtils_1.sizeExpressionBase,
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
                                                expression: "\n                  var percentStateVotes = ( $feature." + config_1.fieldInfos.other.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n                " + expressionUtils_1.sizeExpressionBase,
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
                                                expression: "\n                  var percentStateVotes = ( $feature." + config_1.fieldInfos.democrat.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n                  " + expressionUtils_1.offsetXExpressionBase + "\n                  return offset * -1;\n                ",
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
                                                expression: "\n                  var percentStateVotes = ( $feature." + config_1.fieldInfos.republican.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n                  " + expressionUtils_1.offsetXExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var percentStateVotes = ( $feature." + config_1.fieldInfos.other.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n                  " + expressionUtils_1.offsetYExpressionBase + "\n                  return offset;\n                ",
                                                returnType: "Default"
                                            }
                                        }
                                    ]
                                }
                            })
                        }),
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.countyResultsLabelingInfo,
                        popupTemplate: popupUtils_1.countyPopupTemplate
                    });
                    stateChangeLayer = new FeatureLayer({
                        maxScale: config_1.scaleThreshold,
                        portalItem: {
                            id: "4f03bcde997e4badbef186d0c05f5a9a"
                        },
                        opacity: 1,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.dColorCIM
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMLineSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidStroke",
                                                                    enable: true,
                                                                    color: config_1.dColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.rColorCIM
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMLineSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidStroke",
                                                                    enable: true,
                                                                    color: config_1.rColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.oColorCIM,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMLineSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidStroke",
                                                                    enable: true,
                                                                    color: config_1.oColorCIM,
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change > 0, change, 0);\n                " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change > 0, change, 0);\n                  " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n                  return offset * -1;\n                ",
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
                                                expression: "\n                  var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n                  var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n                  var change = votesNext - votesPrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n                  return offset * -1;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                  " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change > 0, change, 0);\n                  " + expressionUtils_1.offsetYTotalChangeExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n                  var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n                  var change = valueNext - valuePrevious;\n                  var value = IIF( change < 0, Abs(change), 0);\n                  " + expressionUtils_1.offsetYTotalChangeExpressionBase + "\n                  return offset;\n                ",
                                                returnType: "Default"
                                            }
                                        }
                                    ]
                                }
                            })
                        }),
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.stateChangeLabelingInfo,
                        popupTemplate: popupUtils_1.statePopupTemplate
                    });
                    stateResultsLayer = new FeatureLayer({
                        maxScale: config_1.scaleThreshold,
                        portalItem: {
                            id: "4f03bcde997e4badbef186d0c05f5a9a"
                        },
                        opacity: 1,
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.dColorCIM
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                scaleSymbolsProportionally: true,
                                                respectFrame: true
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.rColorCIM
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
                                                        geometry: symbolUtils_1.cimCircleGeometry,
                                                        symbol: {
                                                            type: "CIMPolygonSymbol",
                                                            symbolLayers: [
                                                                {
                                                                    type: "CIMSolidFill",
                                                                    enable: true,
                                                                    color: config_1.oColorCIM,
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
                                                title: "Democrat votes",
                                                expression: "\n                  var value = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n                " + expressionUtils_1.sizeTotalExpressionBase,
                                                returnType: "Default"
                                            }
                                        },
                                        {
                                            type: "CIMPrimitiveOverride",
                                            primitiveName: "republican-positive-votes",
                                            propertyName: "Size",
                                            valueExpressionInfo: {
                                                type: "CIMExpressionInfo",
                                                title: "Republican votes",
                                                expression: "\n                  var value = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n                " + expressionUtils_1.sizeTotalExpressionBase,
                                                returnType: "Default"
                                            }
                                        },
                                        {
                                            type: "CIMPrimitiveOverride",
                                            primitiveName: "other-positive-votes",
                                            propertyName: "Size",
                                            valueExpressionInfo: {
                                                type: "CIMExpressionInfo",
                                                title: "Other votes",
                                                expression: "\n                  var value = $feature." + config_1.fieldInfos.other.state.next.name + ";\n                " + expressionUtils_1.sizeTotalExpressionBase,
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
                                                expression: "\n                  var value = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n                  " + expressionUtils_1.offsetXTotalExpressionBase + "\n                  return offset * -1;\n                ",
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
                                                expression: "\n                  var value = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n                  " + expressionUtils_1.offsetXTotalExpressionBase + "\n                  return offset;\n                ",
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
                                                expression: "\n                  var value = $feature." + config_1.fieldInfos.other.state.next.name + ";\n                  " + expressionUtils_1.offsetYTotalExpressionBase + "\n                  return offset;\n                ",
                                                returnType: "Default"
                                            }
                                        }
                                    ]
                                }
                            })
                        }),
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.stateResultsLabelingInfo,
                        popupTemplate: popupUtils_1.statePopupTemplate
                    });
                    view.map.add(stateElectoralResultsLayer);
                    view.map.add(swingStatesLayer);
                    view.map.add(stateChangeLayer);
                    view.map.add(stateResultsLayer);
                    view.map.add(countyChangeLayer);
                    view.map.add(countyResultsLayer);
                    swipe = new Swipe({
                        view: view,
                        leadingLayers: [countyChangeLayer, stateChangeLayer, swingStatesLayer],
                        trailingLayers: [countyResultsLayer, stateResultsLayer, stateElectoralResultsLayer],
                        position: 90
                    });
                    view.ui.add(swipe);
                    totalLegend = document.getElementById("total-legend");
                    changeLegend = document.getElementById("change-legend");
                    infoToggle = document.getElementById("info-toggle");
                    new Legend({
                        view: view,
                        container: "change-legend-container",
                        layerInfos: [{
                                layer: swingStatesLayer
                            }]
                    });
                    view.ui.add("change-legend", "bottom-left");
                    new Legend({
                        view: view,
                        container: "total-legend-container",
                        layerInfos: [{
                                layer: stateElectoralResultsLayer
                            }]
                    });
                    view.ui.add(changeLegend, "bottom-left");
                    view.ui.add(totalLegend, "bottom-right");
                    view.ui.add(infoToggle, "top-left");
                    visibilityEnabled = true;
                    toggleInfoVisibility = function () {
                        changeLegend.style.display = changeLegend.style.display === "none" ? "block" : "none";
                        totalLegend.style.display = totalLegend.style.display === "none" ? "block" : "none";
                        visibilityEnabled = !visibilityEnabled;
                        updateLegendOpacity();
                    };
                    infoToggle.addEventListener("click", toggleInfoVisibility);
                    swipe.watch("position", updateLegendOpacity);
                    view.watch("heightBreakpoint", updateLegendHeight);
                    return [4 /*yield*/, view.when(updateLegendHeight)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=main.js.map