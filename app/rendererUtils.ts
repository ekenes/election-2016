import { SimpleRenderer } from "esri/renderers";
import { CIMSymbol, SimpleFillSymbol } from "esri/symbols";
import { UniqueValueRenderer } from "esri/rasterRenderers";
import { years, fieldInfos, dColor, rColor, dColorCIM, oColorCIM, rColorCIM, results } from "./config";
import { sizeExpressionBase, offsetYTotalExpressionBase, offsetXTotalExpressionBase, offsetXExpressionBase, sizeTotalExpressionBase, offsetYTotalChangeExpressionBase, offsetXTotalChangeExpressionBase, sizeTotalChangeExpressionBase, offsetYExpressionBase } from "./expressionUtils";
import { createCircleSymbolLayer } from "./symbolUtils";


////////////////////////////////////////////////////
//
// STATE ELECTORAL RESULTS
//
///////////////////////////////////////////////////

export const stateElectoralResultsRenderer = new UniqueValueRenderer({
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
    label: `R - ${results.republican.candidate} (${results.republican.electoralVotes})`,
    symbol: new SimpleFillSymbol({
      color: rColor,
      outline: null
    })
  }, {
    value: `Democrat`,
    label: `D - ${results.democrat.candidate} (${results.democrat.electoralVotes})`,
    symbol: new SimpleFillSymbol({
      color: dColor,
      outline: null
    })
  }]
});

////////////////////////////////////////////////////
//
// SWING STATES
//
///////////////////////////////////////////////////

export const swingStateRenderer = new UniqueValueRenderer({
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
});

////////////////////////////////////////////////////
//
// STATE RESULTS
//
///////////////////////////////////////////////////

export const stateResultsRenderer = new SimpleRenderer({
  symbol: new CIMSymbol({
    data: {
      type: `CIMSymbolReference`,
      symbol: {
        type: `CIMPointSymbol`,
        symbolLayers: [
          createCircleSymbolLayer({
            primitiveName: `democrat-positive-votes`,
            offsetX: -10,
            offsetY: 0,
            color: dColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `republican-positive-votes`,
            offsetX: 10,
            offsetY: 0,
            color: rColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `other-positive-votes`,
            offsetX: 0,
            offsetY: 10,
            color: oColorCIM,
            donutEnabled: false,
            outline: {
              color: [161, 148, 0, 255]
            }
          })
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
              ${sizeTotalExpressionBase}
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
            title: `Republican votes`,
            expression: `
              var value = $feature.${fieldInfos.republican.state.next.name};
              ${sizeTotalExpressionBase}
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
            title: `Other votes`,
            expression: `
              var value = $feature.${fieldInfos.other.state.next.name};
              ${sizeTotalExpressionBase}
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
});

////////////////////////////////////////////////////
//
// STATE CHANGE
//
///////////////////////////////////////////////////

export const stateChangeRenderer = new SimpleRenderer({
  symbol: new CIMSymbol({
    data: {
      type: `CIMSymbolReference`,
      symbol: {
        type: `CIMPointSymbol`,
        symbolLayers: [
          createCircleSymbolLayer({
            primitiveName: `democrat-positive-votes`,
            offsetX: -10,
            offsetY: 0,
            color: dColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `democrat-negative-votes`,
            offsetX: -10,
            offsetY: 0,
            color: dColorCIM,
            donutEnabled: true
          }),
          createCircleSymbolLayer({
            primitiveName: `republican-positive-votes`,
            offsetX: 10,
            offsetY: 0,
            color: rColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `republican-negative-votes`,
            offsetX: 10,
            offsetY: 0,
            color: rColorCIM,
            donutEnabled: true
          }),
          createCircleSymbolLayer({
            primitiveName: `other-positive-votes`,
            offsetX: 0,
            offsetY: 10,
            color: oColorCIM,
            donutEnabled: false,
            outline: {
              color: [161, 148, 0, 255]
            }
          }),
          createCircleSymbolLayer({
            primitiveName: `other-negative-votes`,
            offsetX: 0,
            offsetY: 10,
            color: oColorCIM,
            donutEnabled: true
          })
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
});

////////////////////////////////////////////////////
//
// COUNTY RESULTS
//
///////////////////////////////////////////////////

export const countyResultsRenderer = new SimpleRenderer({
  symbol: new CIMSymbol({
    data: {
      type: `CIMSymbolReference`,
      symbol: {
        type: `CIMPointSymbol`,
        symbolLayers: [
          createCircleSymbolLayer({
            primitiveName: `democrat-positive-votes`,
            offsetX: -10,
            offsetY: 0,
            color: dColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `republican-positive-votes`,
            offsetX: 10,
            offsetY: 0,
            color: rColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `other-positive-votes`,
            offsetX: 0,
            offsetY: 10,
            color: oColorCIM,
            donutEnabled: false,
            outline: {
              color: [161, 148, 0, 255]
            }
          })
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
});

////////////////////////////////////////////////////
//
// COUNTY CHANGE
//
///////////////////////////////////////////////////

export const countyChangeRenderer = new SimpleRenderer({
  symbol: new CIMSymbol({
    data: {
      type: `CIMSymbolReference`,
      symbol: {
        type: `CIMPointSymbol`,
        symbolLayers: [
          createCircleSymbolLayer({
            primitiveName: `democrat-positive-votes`,
            offsetX: -10,
            offsetY: 0,
            color: dColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `democrat-negative-votes`,
            offsetX: -10,
            offsetY: 0,
            color: dColorCIM,
            donutEnabled: true
          }),
          createCircleSymbolLayer({
            primitiveName: `republican-positive-votes`,
            offsetX: 10,
            offsetY: 0,
            color: rColorCIM,
            donutEnabled: false
          }),
          createCircleSymbolLayer({
            primitiveName: `republican-negative-votes`,
            offsetX: 10,
            offsetY: 0,
            color: rColorCIM,
            donutEnabled: true
          }),
          createCircleSymbolLayer({
            primitiveName: `other-positive-votes`,
            offsetX: 0,
            offsetY: 10,
            color: oColorCIM,
            donutEnabled: false,
            outline: {
              color: [161, 148, 0, 255]
            }
          }),
          createCircleSymbolLayer({
            primitiveName: `other-negative-votes`,
            offsetX: 0,
            offsetY: 10,
            color: oColorCIM,
            donutEnabled: true
          })
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
});