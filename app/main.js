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
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/PopupTemplate", "esri/popup/ExpressionInfo", "esri/popup/FieldInfo", "esri/popup/support/FieldInfoFormat", "esri/widgets/Swipe", "esri/widgets/Legend", "esri/layers/support/LabelClass", "esri/Color", "esri/symbols/Font", "esri/renderers", "esri/symbols", "esri/rasterRenderers", "esri/popup/content", "./config", "./expressionUtils", "./symbolUtils"], function (require, exports, EsriMap, MapView, FeatureLayer, PopupTemplate, ExpressionInfo, FieldInfo, FieldInfoFormat, Swipe, Legend, LabelClass, Color, Font, renderers_1, symbols_1, rasterRenderers_1, content_1, config_1, expressionUtils_1, symbolUtils_1) {
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
        var map, view, statePopupTemplate, polygonLayer, polygonChangeLayer, popupTemplate, changeLayer, results2016Layer, changeStatesLayer, totalStatesLayer, swipe, totalLegend, changeLegend, infoToggle, visibilityEnabled, toggleInfoVisibility;
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
                    statePopupTemplate = new PopupTemplate({
                        title: "{STATE}",
                        fieldInfos: [
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.democrat.state.previous.name,
                                label: config_1.fieldInfos.democrat.state.previous.label,
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.republican.state.previous.name,
                                label: config_1.fieldInfos.republican.state.previous.label,
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.other.state.previous.name,
                                label: config_1.fieldInfos.other.state.previous.label,
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.democrat.state.next.name,
                                label: config_1.fieldInfos.democrat.state.next.label,
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.republican.state.next.name,
                                label: config_1.fieldInfos.republican.state.next.label,
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.other.state.next.name,
                                label: config_1.fieldInfos.other.state.next.label,
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            })
                        ],
                        content: [
                            new content_1.TextContent({
                                text: "\n          The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>\n          candidate won {STATE} by a margin of {expression/winner-margin} points.\n          The {expression/winner-votes} votes cast for the winner comprise\n          {expression/winner-percent-state-votes} of the total votes cast in the state.\n        "
                            }),
                            new content_1.TextContent({
                                text: "\n          <div class=\"table-container\">\n            Votes in " + config_1.years.next + " and the change from " + config_1.years.previous + "\n            <br/>\n            <br/>\n            <table class=\"esri-widget popup\">\n              <tr class=\"head\"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>\n              <tr class=\"dem\"><td><span style='color:" + config_1.dColor + "; font-weight:bolder'>Democrat</span></td><td class=\"num\">{" + config_1.fieldInfos.democrat.state.next.name + "}</td><td class=\"num\"><span style='color: {expression/dem-change-color}'>{expression/dem" + config_1.years.previous + "diff" + config_1.years.next + "}</span></td><td class=\"num\"><span style='color: {expression/dem-change-color}'>{expression/dem" + config_1.years.previous + "change" + config_1.years.next + "}</span></td></tr>\n              <tr class=\"rep\"><td><span style='color:" + config_1.rColor + "; font-weight:bolder'>Republican</span></td><td class=\"num\">{" + config_1.fieldInfos.republican.state.next.name + "}</td><td class=\"num\"><span style='color: {expression/rep-change-color}'>{expression/rep" + config_1.years.previous + "diff" + config_1.years.next + "}</span></td><td class=\"num\"><span style='color: {expression/rep-change-color}'>{expression/rep" + config_1.years.previous + "change" + config_1.years.next + "}</span></td></tr>\n              <tr class=\"oth\"><td><span style='color:" + config_1.oTextColor + "; font-weight:bolder'>Other</span></td><td class=\"num\">{" + config_1.fieldInfos.other.state.next.name + "}</td><td class=\"num\"><span style='color: {expression/oth-change-color}'>{expression/oth" + config_1.years.previous + "diff" + config_1.years.next + "}</span></td><td class=\"num\"><span style='color: {expression/oth-change-color}'>{expression/oth" + config_1.years.previous + "change" + config_1.years.next + "}</span></td></tr>\n            </table>\n          </div>\n        "
                            })
                        ],
                        expressionInfos: [
                            new ExpressionInfo({
                                title: "winner % of state votes",
                                name: "winner-percent-state-votes",
                                expression: "\n          " + expressionUtils_1.votesNextBase + "\n\n          var winnerTotal = Max(all);\n          return Text(winnerTotal/Sum(all), \"#%\");\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner votes",
                                name: "winner-votes",
                                expression: "\n          " + expressionUtils_1.votesNextBase + "\n\n          return Text(Max(all), \"#,###\");\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner-color",
                                name: "winner-color",
                                expression: "\n          " + expressionUtils_1.votesNextBase + "\n\n          Decode( Max(all),\n            dem, \"" + config_1.dColor + "\",\n            rep, \"" + config_1.rColor + "\",\n            oth, \"" + config_1.oColor + "\",\n          \"#000000\"\n          );\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner",
                                name: "winner",
                                expression: "\n          " + expressionUtils_1.votesNextBase + "\n\n          Decode( Max(all),\n            dem, \"Democrat\",\n            rep, \"Republican\",\n            oth, \"other\",\n          \"tie\"\n          );\n        "
                            }),
                            new ExpressionInfo({
                                title: "Democrat change from " + config_1.years.previous,
                                name: "dem" + config_1.years.previous + "change" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return changeText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Republican change from " + config_1.years.previous,
                                name: "rep" + config_1.years.previous + "change" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return changeText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Other change from " + config_1.years.previous,
                                name: "oth" + config_1.years.previous + "change" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return changeText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Democrat diff from " + config_1.years.previous,
                                name: "dem" + config_1.years.previous + "diff" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return diffText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Republican diff from " + config_1.years.previous,
                                name: "rep" + config_1.years.previous + "diff" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return diffText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Other diff from " + config_1.years.previous,
                                name: "oth" + config_1.years.previous + "diff" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return diffText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "change-color",
                                name: "dem-change-color",
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n          " + expressionUtils_1.colorDiffPopupBase + "\n        "
                            }),
                            new ExpressionInfo({
                                title: "change-color",
                                name: "rep-change-color",
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n          " + expressionUtils_1.colorDiffPopupBase + "\n        "
                            }),
                            new ExpressionInfo({
                                title: "change-color",
                                name: "oth-change-color",
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n          " + expressionUtils_1.colorDiffPopupBase + "\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner-margin",
                                name: "winner-margin",
                                expression: "\n          var fields = [\n            $feature." + config_1.fieldInfos.democrat.state.next.name + ",\n            $feature." + config_1.fieldInfos.republican.state.next.name + ",\n            $feature." + config_1.fieldInfos.other.state.next.name + "\n          ];\n\n          var top2 = Top(Reverse(Sort(fields)), 2);\n          var winner = First(top2);\n          var secondPlace = top2[1];\n          var total = Sum(fields);\n          return Text( (winner - secondPlace) / total, \"#.#%\");\n        "
                            })
                        ]
                    });
                    polygonLayer = new FeatureLayer({
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
                                    label: "R - Trump (304)",
                                    symbol: new symbols_1.SimpleFillSymbol({
                                        color: config_1.rColor,
                                        outline: null
                                    })
                                }, {
                                    value: "Democrat",
                                    label: "D - Clinton (227)",
                                    symbol: new symbols_1.SimpleFillSymbol({
                                        color: config_1.dColor,
                                        outline: null
                                    })
                                }]
                        }),
                        popupTemplate: statePopupTemplate,
                        popupEnabled: false
                    });
                    polygonChangeLayer = new FeatureLayer({
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
                        popupTemplate: statePopupTemplate,
                        popupEnabled: false
                    });
                    popupTemplate = new PopupTemplate({
                        title: "{Name_1}, {STATE_NAME}",
                        fieldInfos: [
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.democrat.county.previous.name,
                                label: config_1.years.previous + " Democrat votes",
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.republican.county.previous.name,
                                label: config_1.years.previous + " Republican votes",
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.other.county.previous.name,
                                label: config_1.years.previous + " Other votes",
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.democrat.county.next.name,
                                label: config_1.years.next + " Democrat votes",
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.republican.county.next.name,
                                label: config_1.years.next + " Republican votes",
                                format: new FieldInfoFormat({
                                    places: 0,
                                    digitSeparator: true
                                })
                            }),
                            new FieldInfo({
                                fieldName: config_1.fieldInfos.other.county.next.name,
                                label: config_1.years.next + " Other votes",
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
                                text: "\n          <div class=\"table-container\">\n            Votes in " + config_1.years.next + " and the change from " + config_1.years.previous + "\n            <br/>\n            <br/>\n            <table class=\"esri-widget popup\">\n              <tr class=\"head\"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>\n              <tr class=\"dem\"><td><span style='color:" + config_1.dColor + "; font-weight:bolder'>Democrat</span></td><td class=\"num\">{" + config_1.fieldInfos.democrat.county.next.name + "}</td><td class=\"num\"><span style='color: {expression/dem-change-color}'>{expression/dem" + config_1.years.previous + "diff" + config_1.years.next + "}</span></td><td class=\"num\"><span style='color: {expression/dem-change-color}'>{expression/dem" + config_1.years.previous + "change" + config_1.years.next + "}</span></td></tr>\n              <tr class=\"rep\"><td><span style='color:" + config_1.rColor + "; font-weight:bolder'>Republican</span></td><td class=\"num\">{" + config_1.fieldInfos.republican.county.next.name + "}</td><td class=\"num\"><span style='color: {expression/rep-change-color}'>{expression/rep" + config_1.years.previous + "diff" + config_1.years.next + "}</span></td><td class=\"num\"><span style='color: {expression/rep-change-color}'>{expression/rep" + config_1.years.previous + "change" + config_1.years.next + "}</span></td></tr>\n              <tr class=\"oth\"><td><span style='color:" + config_1.oTextColor + "; font-weight:bolder'>Other</span></td><td class=\"num\">{" + config_1.fieldInfos.other.county.next.name + "}</td><td class=\"num\"><span style='color: {expression/oth-change-color}'>{expression/oth" + config_1.years.previous + "diff" + config_1.years.next + "}</span></td><td class=\"num\"><span style='color: {expression/oth-change-color}'>{expression/oth" + config_1.years.previous + "change" + config_1.years.next + "}</span></td></tr>\n            </table>\n          </div>\n        "
                            })
                        ],
                        expressionInfos: [
                            new ExpressionInfo({
                                title: "winner % of state votes",
                                name: "winner-percent-state-votes",
                                expression: "\n          var dem = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var rep = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var oth = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var all = [dem, rep, oth];\n\n          var winnerTotal = Max(all);\n          return Text(winnerTotal/$feature." + config_1.fieldInfos.normalizationFields.county.next + ", \"#%\");\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner votes",
                                name: "winner-votes",
                                expression: "\n          var dem = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var rep = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var oth = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var all = [dem, rep, oth];\n\n          return Text(Max(all), \"#,###\");\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner-color",
                                name: "winner-color",
                                expression: "\n          var dem = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var rep = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var oth = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var all = [dem, rep, oth];\n\n          Decode( Max(all),\n            dem, \"" + config_1.dColor + "\",\n            rep, \"" + config_1.rColor + "\",\n            oth, \"" + config_1.oColor + "\",\n          \"#000000\"\n          );\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner",
                                name: "winner",
                                expression: "\n          var dem = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var rep = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var oth = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var all = [dem, rep, oth];\n\n          Decode( Max(all),\n            dem, \"Democrat\",\n            rep, \"Republican\",\n            oth, \"other\",\n          \"tie\"\n          );\n        "
                            }),
                            new ExpressionInfo({
                                title: "Democrat change from " + config_1.years.previous,
                                name: "dem" + config_1.years.previous + "change" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return changeText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Republican change from " + config_1.years.previous,
                                name: "rep" + config_1.years.previous + "change" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return changeText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Other change from " + config_1.years.previous,
                                name: "oth" + config_1.years.previous + "change" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n          " + expressionUtils_1.diffTextBase + "\n          return changeText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Democrat diff from " + config_1.years.previous,
                                name: "dem" + config_1.years.previous + "diff" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n          var diff = votesNext - votesPrevious;\n          var change = ( (votesNext - votesPrevious) / votesPrevious );\n          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n          var changeText = IIF(change > 0, Text(change, '\u2191#,###.#%'), Text(change, '\u2193#,###.#%'));\n          return diffText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Republican diff from " + config_1.years.previous,
                                name: "rep" + config_1.years.previous + "diff" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n          var diff = votesNext - votesPrevious;\n          var change = ( (votesNext - votesPrevious) / votesPrevious );\n          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n          var changeText = IIF(change > 0, Text(change, '\u2191#,###.#%'), Text(change, '\u2193#,###.#%'));\n          return diffText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "Other diff from " + config_1.years.previous,
                                name: "oth" + config_1.years.previous + "diff" + config_1.years.next,
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n          var diff = votesNext - votesPrevious;\n          var change = ( (votesNext - votesPrevious) / votesPrevious );\n          var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n          var changeText = IIF(change > 0, Text(change, '\u2191#,###.#%'), Text(change, '\u2193#,###.#%'));\n          return diffText;\n        "
                            }),
                            new ExpressionInfo({
                                title: "change-color",
                                name: "dem-change-color",
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n          " + expressionUtils_1.colorDiffPopupBase + "\n        "
                            }),
                            new ExpressionInfo({
                                title: "change-color",
                                name: "rep-change-color",
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n          " + expressionUtils_1.colorDiffPopupBase + "\n        "
                            }),
                            new ExpressionInfo({
                                title: "change-color",
                                name: "oth-change-color",
                                expression: "\n          var votesNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var votesPrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n          " + expressionUtils_1.colorDiffPopupBase + "\n        "
                            }),
                            new ExpressionInfo({
                                title: "winner-margin",
                                name: "winner-margin",
                                expression: "\n          var fields = [\n            $feature." + config_1.fieldInfos.democrat.county.next.name + ",\n            $feature." + config_1.fieldInfos.republican.county.next.name + ",\n            $feature." + config_1.fieldInfos.other.county.next.name + "\n          ];\n\n          var top2 = Top(Reverse(Sort(fields)), 2);\n          var winner = First(top2);\n          var secondPlace = top2[1];\n          var total = Sum(fields);\n          return Text( (winner - secondPlace) / total, \"#.#%\");\n        "
                            })
                        ]
                    });
                    changeLayer = new FeatureLayer({
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
                        labelingInfo: [
                            // DEMOCRAT label classes
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 10",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -50,
                                    yoffset: -25
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 5 AND ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 10",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 1 AND ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 5",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 0.5 AND ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 1",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -30,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + " - " + config_1.fieldInfos.democrat.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 0.5",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -20,
                                    yoffset: -10
                                })
                            }),
                            // REPUBLICAN label classes
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 10",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 60,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 5 AND ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 10",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 35,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 1 AND ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 5",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 0.5 AND ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 1",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + " - " + config_1.fieldInfos.republican.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 0.5",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 10,
                                    yoffset: -10
                                })
                            }),
                            // OTHER label classes
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 10",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 40
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 5 AND ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 10",
                                labelExpressionInfo: {
                                    expression: "\n          var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 40
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "\n          (ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 1 AND ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 5)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 30
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "\n          (ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 0.5 AND ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 1)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n          var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "\n          (ABS(((" + config_1.fieldInfos.other.county.next.name + " - " + config_1.fieldInfos.other.county.previous.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 0.5)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 10,
                                    yoffset: 10
                                })
                            })
                        ],
                        popupTemplate: popupTemplate
                    });
                    results2016Layer = new FeatureLayer({
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
                        labelingInfo: [
                            // DEMOCRAT label classes
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 10",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.democrat.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -50,
                                    yoffset: -25
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 5 AND ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 10",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.democrat.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 1 AND ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 5",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.democrat.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 0.5 AND ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 1",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.democrat.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -30,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.democrat.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 0.5",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.democrat.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -20,
                                    yoffset: -10
                                })
                            }),
                            // REPUBLICAN label classes
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 10",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.republican.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 50,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 5 AND ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 10",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.republican.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 40,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 1 AND ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 5",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.republican.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 30,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 0.5 AND ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 1",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.republican.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.republican.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 0.5",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.republican.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 10,
                                    yoffset: -10
                                })
                            }),
                            // OTHER label classes
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 10",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.other.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 40
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 5 AND ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 10",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.other.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 40
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "\n          (ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 1 AND ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 5)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.other.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 30
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "\n          (ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) >= 0.5 AND ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 1)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.other.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 20
                                })
                            }),
                            new LabelClass({
                                minScale: 577791,
                                where: "\n          (ABS(((" + config_1.fieldInfos.other.county.next.name + ") / " + config_1.fieldInfos.normalizationFields.county.next + ") * 100) < 0.5)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.other.county.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                labelPlacement: "center-center",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 10,
                                    yoffset: 10
                                })
                            })
                        ],
                        popupTemplate: popupTemplate
                    });
                    changeStatesLayer = new FeatureLayer({
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
                        labelingInfo: [
                            // DEMOCRAT label classes
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") >= 500000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -50,
                                    yoffset: -25
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") >= 100000 AND ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") < 500000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") >= 50000 AND ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") < 100000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") >= 10000 AND ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") < 50000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -30,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + " - " + config_1.fieldInfos.democrat.state.previous.name + ") < 10000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -20,
                                    yoffset: -10
                                })
                            }),
                            // REPUBLICAN label classes
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") >= 500000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 50,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") >= 100000 AND ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") < 500000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 35,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") >= 50000 AND ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") < 100000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") >= 10000 AND ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") < 50000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + " - " + config_1.fieldInfos.republican.state.previous.name + ") < 10000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 10,
                                    yoffset: -10
                                })
                            }),
                            // OTHER label classes
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") >= 500000",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 35
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") >= 100000 AND ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") < 500000",
                                labelExpressionInfo: {
                                    expression: "\n          var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n          var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 30
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "\n          (ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") >= 50000 AND ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") < 100000)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n          var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 25
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "\n          (ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") >= 10000 AND ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") < 50000)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n          var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 15
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "\n          (ABS(" + config_1.fieldInfos.other.state.next.name + " - " + config_1.fieldInfos.other.state.previous.name + ") < 10000)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n            var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n            var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n            " + expressionUtils_1.diffLabelText + "\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 10,
                                    yoffset: 10
                                })
                            })
                        ],
                        popupTemplate: statePopupTemplate
                    });
                    totalStatesLayer = new FeatureLayer({
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
                        labelingInfo: [
                            // DEMOCRAT label classes
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + ") >= 5000000",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.democrat.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -50,
                                    yoffset: -25
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + ") >= 1000000 AND ABS(" + config_1.fieldInfos.democrat.state.next.name + ") < 5000000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.democrat.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + ") >= 500000 AND ABS(" + config_1.fieldInfos.democrat.state.next.name + ") < 1000000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.democrat.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -40,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + ") >= 100000 AND ABS(" + config_1.fieldInfos.democrat.state.next.name + ") < 500000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.democrat.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -30,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.democrat.state.next.name + ") < 100000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.democrat.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.dColor),
                                    xoffset: -20,
                                    yoffset: -10
                                })
                            }),
                            // REPUBLICAN label classes
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + ") >= 5000000",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.republican.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 60,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + ") >= 1000000 AND ABS(" + config_1.fieldInfos.republican.state.next.name + ") < 5000000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.republican.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 35,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + ") >= 500000 AND ABS(" + config_1.fieldInfos.republican.state.next.name + ") < 1000000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.republican.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -20
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + ") >= 100000 AND ABS(" + config_1.fieldInfos.republican.state.next.name + ") < 500000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.republican.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 20,
                                    yoffset: -10
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.republican.state.next.name + ") < 100000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.republican.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.rColor),
                                    xoffset: 10,
                                    yoffset: -10
                                })
                            }),
                            // OTHER label classes
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.other.state.next.name + ") >= 5000000",
                                labelExpressionInfo: {
                                    expression: "\n            Text($feature." + config_1.fieldInfos.other.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 35
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "ABS(" + config_1.fieldInfos.other.state.next.name + ") >= 1000000 AND ABS(" + config_1.fieldInfos.other.state.next.name + ") < 5000000",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.other.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 30
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "\n          (ABS(" + config_1.fieldInfos.other.state.next.name + ") >= 500000 AND ABS(" + config_1.fieldInfos.other.state.next.name + ") < 1000000)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.other.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 25
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "\n          (ABS(" + config_1.fieldInfos.other.state.next.name + ") >= 100000 AND ABS(" + config_1.fieldInfos.other.state.next.name + ") < 500000)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.other.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 20,
                                    yoffset: 15
                                })
                            }),
                            new LabelClass({
                                minScale: 9244700,
                                where: "\n          (ABS(" + config_1.fieldInfos.other.state.next.name + ") < 100000)\n        ",
                                labelExpressionInfo: {
                                    expression: "\n          Text($feature." + config_1.fieldInfos.other.state.next.name + ", '#,###');\n          "
                                },
                                deconflictionStrategy: "none",
                                symbol: new symbols_1.TextSymbol({
                                    font: new Font({
                                        weight: "bold",
                                        family: "Noto Sans",
                                        size: "10pt"
                                    }),
                                    haloColor: new Color(config_1.haloColor),
                                    haloSize: config_1.haloSize,
                                    color: new Color(config_1.oTextColor),
                                    xoffset: 10,
                                    yoffset: 10
                                })
                            })
                        ],
                        popupTemplate: statePopupTemplate
                    });
                    view.map.add(polygonLayer);
                    view.map.add(polygonChangeLayer);
                    view.map.add(changeStatesLayer);
                    view.map.add(totalStatesLayer);
                    view.map.add(changeLayer);
                    view.map.add(results2016Layer);
                    swipe = new Swipe({
                        view: view,
                        leadingLayers: [changeLayer, changeStatesLayer, polygonChangeLayer],
                        trailingLayers: [results2016Layer, totalStatesLayer, polygonLayer],
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
                                layer: polygonChangeLayer
                            }]
                    });
                    view.ui.add("change-legend", "bottom-left");
                    new Legend({
                        view: view,
                        container: "total-legend-container",
                        layerInfos: [{
                                layer: polygonLayer
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