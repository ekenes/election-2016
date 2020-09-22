define(["require", "exports", "esri/renderers", "esri/symbols", "esri/rasterRenderers", "./config", "./expressionUtils", "./symbolUtils"], function (require, exports, renderers_1, symbols_1, rasterRenderers_1, config_1, expressionUtils_1, symbolUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ////////////////////////////////////////////////////
    //
    // STATE ELECTORAL RESULTS
    //
    ///////////////////////////////////////////////////
    exports.stateElectoralResultsRenderer = new rasterRenderers_1.UniqueValueRenderer({
        valueExpression: "\n    var dem = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n    var rep = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n    var oth = $feature." + config_1.fieldInfos.other.state.next.name + ";\n\n    var winner = Decode( Max([dem, rep, oth]),\n      dem, 'Democrat',\n      rep, 'Republican',\n      oth, 'Other',\n    'n/a' );\n\n    return winner;\n  ",
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
    });
    ////////////////////////////////////////////////////
    //
    // SWING STATES
    //
    ///////////////////////////////////////////////////
    exports.swingStateRenderer = new rasterRenderers_1.UniqueValueRenderer({
        valueExpression: "\n    var demPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n    var repPrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n    var othPrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n\n    var winnerPrevious = Decode( Max([demPrevious, repPrevious, othPrevious]),\n      demPrevious, 'Democrat " + config_1.years.previous + "',\n      repPrevious, 'Republican " + config_1.years.previous + "',\n      othPrevious, 'Other " + config_1.years.previous + "',\n    'n/a' );\n\n    var demNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n    var repNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n    var othNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n\n    var winnerNext = Decode( Max([demNext, repNext, othNext]),\n    demNext, 'Democrat " + config_1.years.next + "',\n    repNext, 'Republican " + config_1.years.next + "',\n    othNext, 'Other " + config_1.years.next + "',\n    'n/a' );\n\n    return Concatenate([winnerPrevious, winnerNext], \", \");\n  ",
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
    });
    ////////////////////////////////////////////////////
    //
    // STATE RESULTS
    //
    ///////////////////////////////////////////////////
    exports.stateResultsRenderer = new renderers_1.SimpleRenderer({
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
                            expression: "\n              var value = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n            " + expressionUtils_1.sizeTotalExpressionBase,
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
                            expression: "\n              var value = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n            " + expressionUtils_1.sizeTotalExpressionBase,
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
                            expression: "\n              var value = $feature." + config_1.fieldInfos.other.state.next.name + ";\n            " + expressionUtils_1.sizeTotalExpressionBase,
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
                            expression: "\n              var value = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n              " + expressionUtils_1.offsetXTotalExpressionBase + "\n              return offset * -1;\n            ",
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
                            expression: "\n              var value = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n              " + expressionUtils_1.offsetXTotalExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var value = $feature." + config_1.fieldInfos.other.state.next.name + ";\n              " + expressionUtils_1.offsetYTotalExpressionBase + "\n              return offset;\n            ",
                            returnType: "Default"
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
    exports.stateChangeRenderer = new renderers_1.SimpleRenderer({
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change > 0, change, 0);\n            " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n            " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n            " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n            " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n            " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n            " + expressionUtils_1.sizeTotalChangeExpressionBase,
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change > 0, change, 0);\n              " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n              return offset * -1;\n            ",
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.state.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n              return offset * -1;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n              " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              " + expressionUtils_1.offsetXTotalChangeExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n              " + expressionUtils_1.offsetYTotalChangeExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.state.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.state.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              " + expressionUtils_1.offsetYTotalChangeExpressionBase + "\n              return offset;\n            ",
                            returnType: "Default"
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
    exports.countyResultsRenderer = new renderers_1.SimpleRenderer({
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
                            expression: "\n              var percentStateVotes = ( $feature." + config_1.fieldInfos.democrat.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n            " + expressionUtils_1.sizeExpressionBase,
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
                            expression: "\n              var percentStateVotes = ( $feature." + config_1.fieldInfos.republican.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n            " + expressionUtils_1.sizeExpressionBase,
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
                            expression: "\n              var percentStateVotes = ( $feature." + config_1.fieldInfos.other.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n            " + expressionUtils_1.sizeExpressionBase,
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
                            expression: "\n              var percentStateVotes = ( $feature." + config_1.fieldInfos.democrat.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n              " + expressionUtils_1.offsetXExpressionBase + "\n              return offset * -1;\n            ",
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
                            expression: "\n              var percentStateVotes = ( $feature." + config_1.fieldInfos.republican.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetXExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var percentStateVotes = ( $feature." + config_1.fieldInfos.other.county.next.name + " / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n\n              " + expressionUtils_1.offsetYExpressionBase + "\n              return offset;\n            ",
                            returnType: "Default"
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
    exports.countyChangeRenderer = new renderers_1.SimpleRenderer({
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change > 0, change, 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.sizeExpressionBase + "\n            ",
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.sizeExpressionBase + "\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.sizeExpressionBase + "\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.sizeExpressionBase + "\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.sizeExpressionBase + "\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.sizeExpressionBase + "\n            ",
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change > 0, change, 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetXExpressionBase + "\n              return offset * -1;\n            ",
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
                            expression: "\n              var votesNext = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n              var votesPrevious = $feature." + config_1.fieldInfos.democrat.county.previous.name + ";\n              var change = votesNext - votesPrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetXExpressionBase + "\n              return offset * -1;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetXExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.republican.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetXExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change > 0, change, 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetYExpressionBase + "\n              return offset;\n            ",
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
                            expression: "\n              var valueNext = $feature." + config_1.fieldInfos.other.county.next.name + ";\n              var valuePrevious = $feature." + config_1.fieldInfos.other.county.previous.name + ";\n              var change = valueNext - valuePrevious;\n              var value = IIF( change < 0, Abs(change), 0);\n              var percentStateVotes = ( value / $feature." + config_1.fieldInfos.normalizationFields.county.next + " ) * 100;\n              " + expressionUtils_1.offsetYExpressionBase + "\n              return offset;\n            ",
                            returnType: "Default"
                        }
                    }
                ]
            }
        })
    });
});
//# sourceMappingURL=rendererUtils.js.map