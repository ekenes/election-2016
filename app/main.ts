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
import { years, fieldInfos, referenceScale, maxScale, dColor, rColor, oTextColor, oColor, dColorCIM, oColorCIM, rColorCIM, haloColor, haloSize, scaleThreshold, stateReferenceScale, results } from "./config";
import { colorDiffPopupBase, votesNextBase, diffTextBase, diffLabelText, sizeExpressionBase, offsetYTotalExpressionBase, offsetXTotalExpressionBase, offsetXExpressionBase, sizeTotalExpressionBase, offsetYTotalChangeExpressionBase, offsetXTotalChangeExpressionBase, sizeTotalChangeExpressionBase, offsetYExpressionBase } from "./expressionUtils";
import { createCircleSymbolLayer, cimCircleGeometry } from "./symbolUtils";
import { statePopupTemplate, countyPopupTemplate } from "./popupUtils";
import { countyChangeLabelingInfo, countyResultsLabelingInfo, stateChangeLabelingInfo, stateResultsLabelingInfo } from "./labelingUtils";
import { countyChangeRenderer, countyResultsRenderer, stateChangeRenderer, stateElectoralResultsRenderer, stateResultsRenderer, swingStateRenderer } from "./rendererUtils";

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

  const stateElectoralResultsLayer = new FeatureLayer({
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    title: `Results by state`,
    opacity: 0.3,
    renderer: stateElectoralResultsRenderer,
    popupTemplate: statePopupTemplate,
    popupEnabled: false
  });

  const swingStatesLayer = new FeatureLayer({
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    title: `Swing states`,
    opacity: 0.3,
    renderer: swingStateRenderer,
    popupTemplate: statePopupTemplate,
    popupEnabled: false
  });


  const countyChangeLayer = new FeatureLayer({
    minScale: scaleThreshold,
    portalItem: {
      id: `ba48def248cb45bebb234aa346c97676`
    },
    legendEnabled: false,
    renderer: countyChangeRenderer,
    labelsVisible: true,
    labelingInfo: countyChangeLabelingInfo,
    popupTemplate: countyPopupTemplate
  });

  const countyResultsLayer = new FeatureLayer({
    minScale: scaleThreshold,
    portalItem: {
      id: `ba48def248cb45bebb234aa346c97676`
    },
    legendEnabled: false,
    renderer: countyResultsRenderer,
    labelsVisible: true,
    labelingInfo: countyResultsLabelingInfo,
    popupTemplate: countyPopupTemplate
  });

  const stateChangeLayer = new FeatureLayer({
    maxScale: scaleThreshold,
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    opacity: 1,
    legendEnabled: false,
    renderer: stateChangeRenderer,
    labelsVisible: true,
    labelingInfo: stateChangeLabelingInfo,
    popupTemplate: statePopupTemplate
  });

  const stateResultsLayer = new FeatureLayer({
    maxScale: scaleThreshold,
    portalItem: {
      id: `4f03bcde997e4badbef186d0c05f5a9a`
    },
    opacity: 1,
    legendEnabled: false,
    renderer: stateResultsRenderer,
    labelsVisible: true,
    labelingInfo: stateResultsLabelingInfo,
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
