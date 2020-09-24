define(["require", "exports", "./config"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.votesStateNextBase = "\n  var dem = $feature." + config_1.fieldInfos.democrat.state.next.name + ";\n  var rep = $feature." + config_1.fieldInfos.republican.state.next.name + ";\n  var oth = $feature." + config_1.fieldInfos.other.state.next.name + ";\n  var all = [dem, rep, oth];\n";
    exports.votesCountyNextBase = "\n  var dem = $feature." + config_1.fieldInfos.democrat.county.next.name + ";\n  var rep = $feature." + config_1.fieldInfos.republican.county.next.name + ";\n  var oth = $feature." + config_1.fieldInfos.other.county.next.name + ";\n  var all = [dem, rep, oth];\n";
    exports.diffTextBase = "\n  var diff = votesNext - votesPrevious;\n  var change = ( (votesNext - votesPrevious) / votesPrevious );\n  var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));\n  var changeText = IIF(change > 0, Text(change, '\u2191#,###.#%'), Text(abs(change), '\u2193#,###.#%'));\n";
    exports.colorDiffPopupBase = "\n  var diff = votesNext - votesPrevious;\n  var change = ( (votesNext - votesPrevious) / votesPrevious );\n  return IIF(diff > 0, \"green\", \"red\");\n";
    exports.diffLabelText = "\n  var change = valueNext - valuePrevious;\n  IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));\n";
    // states change layer renderer expressions
    var scaleFactorTotal = "\n  var scaleFactorBase = ( " + config_1.stateReferenceScale + " / $view.scale );\n  var scaleFactor = When(\n    scaleFactorBase >= 1, 1,  // 1\n    scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6\n    scaleFactorBase >= 0.25, scaleFactorBase * 1,  // 0.45\n    scaleFactorBase >= 0.125, scaleFactorBase * 1,  // 0.3125\n    scaleFactorBase * 1  // 0.1875\n  );\n";
    var sizeFactorChangeTotal = "\n  var sizeFactor = When(\n    value >= " + config_1.stateChangeSizeStops[4].value + ", " + config_1.stateChangeSizeStops[4].size + ",\n    value >= " + config_1.stateChangeSizeStops[3].value + ", " + config_1.stateChangeSizeStops[3].size + " + (" + interpolateBetweenStops(config_1.stateChangeSizeStops[3], config_1.stateChangeSizeStops[4]) + " * (value - " + config_1.stateChangeSizeStops[3].value + ")),\n    value >= " + config_1.stateChangeSizeStops[2].value + ", " + config_1.stateChangeSizeStops[2].size + " + (" + interpolateBetweenStops(config_1.stateChangeSizeStops[2], config_1.stateChangeSizeStops[3]) + " * (value - " + config_1.stateChangeSizeStops[2].value + ")),\n    value >= " + config_1.stateChangeSizeStops[1].value + ", " + config_1.stateChangeSizeStops[1].size + " + (" + interpolateBetweenStops(config_1.stateChangeSizeStops[1], config_1.stateChangeSizeStops[2]) + " * (value - " + config_1.stateChangeSizeStops[1].value + ")),\n    value > " + config_1.stateChangeSizeStops[0].value + ", " + config_1.stateChangeSizeStops[0].size + " + (" + interpolateBetweenStops(config_1.stateChangeSizeStops[0], config_1.stateChangeSizeStops[1]) + " * value),\n    0\n  );\n";
    exports.sizeTotalChangeExpressionBase = "\n  " + sizeFactorChangeTotal + "\n\n  " + scaleFactorTotal + "\n  return sizeFactor * scaleFactor;\n";
    // State results layer renderer expressions
    var sizeFactorTotalResults = "\n  var sizeFactor = When(\n    value >= " + config_1.stateResultsSizeStops[4].value + ", " + config_1.stateResultsSizeStops[4].size + ",\n    value >= " + config_1.stateResultsSizeStops[3].value + ", " + config_1.stateResultsSizeStops[3].size + " + (" + interpolateBetweenStops(config_1.stateResultsSizeStops[3], config_1.stateResultsSizeStops[4]) + " * (value - " + config_1.stateResultsSizeStops[3].value + ")),\n    value >= " + config_1.stateResultsSizeStops[2].value + ", " + config_1.stateResultsSizeStops[2].size + " + (" + interpolateBetweenStops(config_1.stateResultsSizeStops[2], config_1.stateResultsSizeStops[3]) + " * (value - " + config_1.stateResultsSizeStops[2].value + ")),\n    value >= " + config_1.stateResultsSizeStops[1].value + ", " + config_1.stateResultsSizeStops[1].size + " + (" + interpolateBetweenStops(config_1.stateResultsSizeStops[1], config_1.stateResultsSizeStops[2]) + " * (value - " + config_1.stateResultsSizeStops[1].value + ")),\n    value > " + config_1.stateResultsSizeStops[0].value + ", " + config_1.stateResultsSizeStops[0].size + " + (" + interpolateBetweenStops(config_1.stateResultsSizeStops[0], config_1.stateResultsSizeStops[1]) + " * value),\n    0\n  );\n";
    exports.sizeTotalExpressionBase = "\n  " + sizeFactorTotalResults + "\n\n  " + scaleFactorTotal + "\n  return sizeFactor * scaleFactor;\n";
    // counties layer expressions
    var sizeFactorCounties = "\n  var sizeFactor = When(\n    percentStateVotes >= " + config_1.countySizeStops[4].value + ", " + config_1.countySizeStops[4].size + ",\n    percentStateVotes >= " + config_1.countySizeStops[3].value + ", " + config_1.countySizeStops[3].size + " + (" + interpolateBetweenStops(config_1.countySizeStops[3], config_1.countySizeStops[4]) + " * (percentStateVotes - " + config_1.countySizeStops[3].value + ")),\n    percentStateVotes >= " + config_1.countySizeStops[2].value + ", " + config_1.countySizeStops[2].size + " + (" + interpolateBetweenStops(config_1.countySizeStops[2], config_1.countySizeStops[3]) + " * (percentStateVotes - " + config_1.countySizeStops[2].value + ")),\n    percentStateVotes >= " + config_1.countySizeStops[1].value + ", " + config_1.countySizeStops[1].size + " + (" + interpolateBetweenStops(config_1.countySizeStops[1], config_1.countySizeStops[2]) + " * (percentStateVotes - " + config_1.countySizeStops[1].value + ")),\n    percentStateVotes > " + config_1.countySizeStops[0].value + ", " + config_1.countySizeStops[0].size + " + (" + interpolateBetweenStops(config_1.countySizeStops[0], config_1.countySizeStops[1]) + " * percentStateVotes),\n    0\n  );\n";
    var scaleFactorCounties = "\n  var scaleFactorBase = Round( " + config_1.referenceScale + " / $view.scale, 1 );\n  var scaleFactor = When(\n    scaleFactorBase >= 8, scaleFactorBase / 6,\n    scaleFactorBase >= 4, scaleFactorBase / 3,  // 1\n    scaleFactorBase >= 2, scaleFactorBase / 1.7,\n    scaleFactorBase >= 1, scaleFactorBase,  // 1\n    scaleFactorBase >= 0.5, scaleFactorBase * 1.2,  // 0.6\n    scaleFactorBase >= 0.25, scaleFactorBase * 1.2,  // 0.45\n    scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125\n    scaleFactorBase * 3  // 0.1875\n  );\n";
    exports.sizeExpressionBase = "\n  " + sizeFactorCounties + "\n\n  " + scaleFactorCounties + "\n  return sizeFactor * scaleFactor;\n";
    function interpolateBetweenStops(firstStop, nextStop) {
        var sizeRange = nextStop.size - firstStop.size;
        var dataRange = nextStop.value - firstStop.value;
        return sizeRange / dataRange;
    }
});
//# sourceMappingURL=expressionUtils.js.map