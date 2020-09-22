define(["require", "exports", "./config"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.votesNextBase = "\n  var dem = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n  var rep = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n  var oth = $feature." + config_1.fieldInfos.other.county.next.name + ";\n  var all = [dem, rep, oth];\n";
    exports.diffTextBase = "\n  var diff = votesNext - votesPrevious;\n  var change = ( (votesNext - votesPrevious) / votesPrevious );\n  var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n  var changeText = IIF(change > 0, Text(change, '\u2191#,###.#%'), Text(abs(change), '\u2193#,###.#%'));\n";
    exports.colorDiffPopupBase = "\n  var diff = votesNext - votesPrevious;\n  var change = ( (votesNext - votesPrevious) / votesPrevious );\n  return IIF(diff > 0, \"green\", \"red\");\n";
    exports.diffLabelText = "\n  var change = valueNext - valuePrevious;\n  IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n";
    // states change layer renderer expressions
    var scaleFactorTotal = "\n  var scaleFactorBase = ( " + config_1.stateReferenceScale + " / $view.scale );\n  var scaleFactor = When(\n    scaleFactorBase >= 1, 1,  // 1\n    scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n    scaleFactorBase >= 0.25, scaleFactorBase * 1,  // 0.45\n    scaleFactorBase >= 0.125, scaleFactorBase * 1,  // 0.3125\n    scaleFactorBase * 1  // 0.1875\n  );\n";
    var sizeFactorChangeTotal = "\n  var sizeFactor = When(\n    value >= 500000, 30,\n    value >= 100000, 20 + (((30-20) / (500000-100000)) * (value - 100000)),\n    value >= 50000, 15 + (((20-15) / (100000-50000)) * (value - 50000)),\n    value > 10000, 10 + (((15-10) / (50000-10000)) * (value - 10000)),\n    value > 0, 8 + (((10-8) / (10000-0)) * value),\n    0\n  );\n";
    exports.sizeTotalChangeExpressionBase = "\n  " + sizeFactorChangeTotal + "\n\n  " + scaleFactorTotal + "\n  return sizeFactor * scaleFactor;\n";
    exports.offsetXTotalChangeExpressionBase = "\n  " + sizeFactorChangeTotal + "\n\n  " + scaleFactorTotal + "\n  var diameter = sizeFactor * scaleFactor;\n  var offset = diameter / 2;\n";
    exports.offsetYTotalChangeExpressionBase = "\n  " + sizeFactorChangeTotal + "\n\n  " + scaleFactorTotal + "\n  var diameter = sizeFactor * scaleFactor;\n  var offset = diameter * 0.67;\n";
    // State results layer renderer expressions
    var sizeFactorTotalResults = "\n  var sizeFactor = When(\n    value >= 5000000, 40,\n    value >= 1000000, 20 + (((40-20) / (5000000-1000000)) * (value - 1000000)),\n    value >= 500000, 15 + (((20-15) / (1000000-500000)) * (value - 500000)),\n    value > 100000, 10 + (((15-10) / (500000-100000)) * (value - 100000)),\n    value > 0, 8 + (((10-8) / (100000-0)) * value),\n    0\n  );\n";
    exports.sizeTotalExpressionBase = "\n  " + sizeFactorTotalResults + "\n\n  " + scaleFactorTotal + "\n  return sizeFactor * scaleFactor;\n";
    exports.offsetXTotalExpressionBase = "\n  " + sizeFactorTotalResults + "\n\n  " + scaleFactorTotal + "\n  var diameter = sizeFactor * scaleFactor;\n  var offset = diameter / 2;\n";
    exports.offsetYTotalExpressionBase = "\n  " + sizeFactorTotalResults + "\n\n  " + scaleFactorTotal + "\n  var diameter = sizeFactor * scaleFactor;\n  var offset = diameter * 0.67;\n";
    // counties layer expressions
    var sizeFactorCounties = "\n  var sizeFactor = When(\n    percentStateVotes >= 30, 40,\n    percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),\n    percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),\n    percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),\n    percentStateVotes > 0, 6 + ((4/0.5) * percentStateVotes),\n    0\n  );\n";
    var scaleFactorCounties = "\n  var scaleFactorBase = ( " + config_1.referenceScale + " / $view.scale );\n\n  var scaleFactor = When(\n    scaleFactorBase >= 1, 1,  // 1\n    scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n    scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45\n    scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n    scaleFactorBase * 3  // 0.1875\n  );\n";
    exports.sizeExpressionBase = "\n  " + sizeFactorCounties + "\n\n  " + scaleFactorCounties + "\n  return sizeFactor * scaleFactor;\n";
    exports.offsetXExpressionBase = "\n  " + sizeFactorCounties + "\n\n  " + scaleFactorCounties + "\n  var diameter = sizeFactor * scaleFactor;\n  var offset = diameter / 2;\n";
    exports.offsetYExpressionBase = "\n  " + sizeFactorCounties + "\n\n  " + scaleFactorCounties + "\n  var diameter = sizeFactor * scaleFactor;\n  var offset = diameter * 0.67;\n";
});
//# sourceMappingURL=expressionUtils.js.map