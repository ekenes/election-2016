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
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Swipe", "esri/widgets/Legend", "esri/layers/GraphicsLayer", "esri/Graphic", "esri/geometry/geometryEngine", "esri/layers/GroupLayer", "./config", "./popupUtils", "./labelingUtils", "./rendererUtils", "esri/geometry", "esri/symbols"], function (require, exports, EsriMap, MapView, FeatureLayer, Swipe, Legend, GraphicsLayer, Graphic, geometryEngine, GroupLayer, config_1, popupUtils_1, labelingUtils_1, rendererUtils_1, geometry_1, symbols_1) {
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
        var map, view, stateElectoralResultsLayer, swingStatesLayer, countyChangeLayer, countyResultsLayer, stateChangeLayer, stateResultsLayer, gl, swipe, totalLegend, changeLegend, infoToggle, endYearChangeSpan, startYearChangeSpan, endYearTotalSpan, visibilityEnabled, toggleInfoVisibility, buffersGraphicsLayer, world, statesLayerView, bufferDistances, symbol;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map = new EsriMap({
                        basemap: {
                            portalItem: {
                                id: config_1.basemapPortalItem
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
                            id: config_1.statesLayerPortalItem
                        },
                        title: "Results by state",
                        opacity: 0.3,
                        renderer: rendererUtils_1.stateElectoralResultsRenderer,
                        popupTemplate: popupUtils_1.statePopupTemplate,
                        popupEnabled: false
                    });
                    swingStatesLayer = new FeatureLayer({
                        portalItem: {
                            id: config_1.statesLayerPortalItem
                        },
                        title: "Swing states",
                        opacity: 0.3,
                        renderer: rendererUtils_1.swingStateRenderer,
                        popupTemplate: popupUtils_1.statePopupTemplate,
                        popupEnabled: false
                    });
                    countyChangeLayer = new FeatureLayer({
                        minScale: config_1.scaleThreshold,
                        portalItem: {
                            id: config_1.countiesLayerPortalItem
                        },
                        legendEnabled: false,
                        renderer: rendererUtils_1.countyChangeRenderer,
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.countyChangeLabelingInfo,
                        popupTemplate: popupUtils_1.countyPopupTemplate
                    });
                    countyResultsLayer = new FeatureLayer({
                        minScale: config_1.scaleThreshold,
                        portalItem: {
                            id: config_1.countiesLayerPortalItem
                        },
                        legendEnabled: false,
                        renderer: rendererUtils_1.countyResultsRenderer,
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.countyResultsLabelingInfo,
                        popupTemplate: popupUtils_1.countyPopupTemplate
                    });
                    stateChangeLayer = new FeatureLayer({
                        maxScale: config_1.scaleThreshold,
                        portalItem: {
                            id: config_1.statesLayerPortalItem
                        },
                        opacity: 1,
                        legendEnabled: false,
                        renderer: rendererUtils_1.stateChangeRenderer,
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.stateChangeLabelingInfo,
                        popupTemplate: popupUtils_1.statePopupTemplate
                    });
                    stateResultsLayer = new FeatureLayer({
                        maxScale: config_1.scaleThreshold,
                        portalItem: {
                            id: config_1.statesLayerPortalItem
                        },
                        opacity: 1,
                        legendEnabled: false,
                        renderer: rendererUtils_1.stateResultsRenderer,
                        labelsVisible: true,
                        labelingInfo: labelingUtils_1.stateResultsLabelingInfo,
                        popupTemplate: popupUtils_1.statePopupTemplate
                    });
                    // view.map.add(stateElectoralResultsLayer);
                    // view.map.add(swingStatesLayer);
                    // view.map.add(stateChangeLayer);
                    view.map.add(stateResultsLayer);
                    // view.map.add(countyChangeLayer);
                    view.map.add(countyResultsLayer);
                    gl = new GroupLayer({
                        layers: [
                            swingStatesLayer,
                            countyChangeLayer
                        ],
                        blendMode: "destination-over"
                    });
                    view.map.add(gl);
                    swipe = new Swipe({
                        view: view,
                        leadingLayers: [countyChangeLayer, stateChangeLayer, swingStatesLayer],
                        trailingLayers: [countyResultsLayer, stateResultsLayer, stateElectoralResultsLayer],
                        position: 75
                    });
                    totalLegend = document.getElementById("total-legend");
                    changeLegend = document.getElementById("change-legend");
                    infoToggle = document.getElementById("info-toggle");
                    endYearChangeSpan = document.getElementById("end-year-change");
                    startYearChangeSpan = document.getElementById("start-year-change");
                    endYearTotalSpan = document.getElementById("end-year-total");
                    endYearChangeSpan.innerHTML = config_1.years.next.toString();
                    startYearChangeSpan.innerHTML = config_1.years.previous.toString();
                    endYearTotalSpan.innerHTML = config_1.years.next.toString();
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
                    buffersGraphicsLayer = new GraphicsLayer({
                        blendMode: "destination-out"
                    });
                    return [4 /*yield*/, view.when(updateLegendHeight).then(updateLegendOpacity)];
                case 1:
                    _a.sent();
                    world = new Graphic({
                        geometry: new geometry_1.Extent({
                            xmin: -180,
                            xmax: 180,
                            ymin: -90,
                            ymax: 90
                        }),
                        symbol: new symbols_1.SimpleFillSymbol({
                            color: "rgba(0, 0, 0, 1)",
                            outline: null
                        })
                    });
                    buffersGraphicsLayer.graphics.add(world);
                    view.map.basemap.baseLayers.add(buffersGraphicsLayer);
                    return [4 /*yield*/, view.whenLayerView(swingStatesLayer)];
                case 2:
                    statesLayerView = _a.sent();
                    bufferDistances = [0, 10, 20, 40, 60];
                    symbol = new symbols_1.SimpleFillSymbol({
                        color: "rgba(255, 255, 255, 0.1)",
                        outline: null
                    });
                    // listen to the view's click event
                    view.on("click", function (event) { return __awaiter(void 0, void 0, void 0, function () {
                        var feature, bufferGraphics;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, statesLayerView.queryFeatures({
                                        geometry: view.toMap(event),
                                        returnGeometry: true,
                                        maxAllowableOffset: 10000,
                                        outFields: ["*"]
                                    })];
                                case 1:
                                    feature = (_a.sent()).features[0];
                                    buffersGraphicsLayer.graphics.removeAll();
                                    // if user clicked on a country and buffers are returned
                                    // add the buffer polygons to the graphicslayer
                                    if (feature) {
                                        bufferGraphics = bufferDistances.map(function (distance) { return new Graphic({
                                            geometry: geometryEngine.buffer(feature.geometry, distance, "kilometers"),
                                            symbol: symbol
                                        }); });
                                        buffersGraphicsLayer.graphics.addMany(bufferGraphics);
                                        // zoom to the highlighted country
                                        view.goTo({
                                            target: view.toMap(event),
                                            extent: feature.geometry.extent.clone().expand(1.8)
                                        }, { duration: 1000 });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=main.js.map