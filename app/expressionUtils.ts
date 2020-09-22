import { fieldInfos, referenceScale, stateReferenceScale } from "./config";

export const votesNextBase = `
  var dem = $feature.${fieldInfos.democrat.county.next.name};
  var rep = $feature.${fieldInfos.republican.county.next.name};
  var oth = $feature.${fieldInfos.other.county.next.name};
  var all = [dem, rep, oth];
`;

export const diffTextBase = `
  var diff = votesNext - votesPrevious;
  var change = ( (votesNext - votesPrevious) / votesPrevious );
  var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
  var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(abs(change), '↓#,###.#%'));
`;

export const colorDiffPopupBase = `
  var diff = votesNext - votesPrevious;
  var change = ( (votesNext - votesPrevious) / votesPrevious );
  return IIF(diff > 0, "green", "red");
`;

export const diffLabelText = `
  var change = valueNext - valuePrevious;
  IIF(change > 0, Text(change, '+#,###'), Text(change, '#,###'));
`

// states change layer renderer expressions

const scaleFactorTotal = `
  var scaleFactorBase = ( ${stateReferenceScale} / $view.scale );
  var scaleFactor = When(
    scaleFactorBase >= 1, 1,  // 1
    scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6
    scaleFactorBase >= 0.25, scaleFactorBase * 1,  // 0.45
    scaleFactorBase >= 0.125, scaleFactorBase * 1,  // 0.3125
    scaleFactorBase * 1  // 0.1875
  );
`;

const sizeFactorChangeTotal = `
  var sizeFactor = When(
    value >= 500000, 30,
    value >= 100000, 20 + (((30-20) / (500000-100000)) * (value - 100000)),
    value >= 50000, 15 + (((20-15) / (100000-50000)) * (value - 50000)),
    value > 10000, 10 + (((15-10) / (50000-10000)) * (value - 10000)),
    value > 0, 8 + (((10-8) / (10000-0)) * value),
    0
  );
`;

export const sizeTotalChangeExpressionBase = `
  ${sizeFactorChangeTotal}

  ${scaleFactorTotal}
  return sizeFactor * scaleFactor;
`;

export const offsetXTotalChangeExpressionBase = `
  ${sizeFactorChangeTotal}

  ${scaleFactorTotal}
  var diameter = sizeFactor * scaleFactor;
  var offset = diameter / 2;
`;

export const offsetYTotalChangeExpressionBase = `
  ${sizeFactorChangeTotal}

  ${scaleFactorTotal}
  var diameter = sizeFactor * scaleFactor;
  var offset = diameter * 0.67;
`;

// State results layer renderer expressions

const sizeFactorTotalResults = `
  var sizeFactor = When(
    value >= 5000000, 40,
    value >= 1000000, 20 + (((40-20) / (5000000-1000000)) * (value - 1000000)),
    value >= 500000, 15 + (((20-15) / (1000000-500000)) * (value - 500000)),
    value > 100000, 10 + (((15-10) / (500000-100000)) * (value - 100000)),
    value > 0, 8 + (((10-8) / (100000-0)) * value),
    0
  );
`;

export const sizeTotalExpressionBase = `
  ${sizeFactorTotalResults}

  ${scaleFactorTotal}
  return sizeFactor * scaleFactor;
`;

export const offsetXTotalExpressionBase = `
  ${sizeFactorTotalResults}

  ${scaleFactorTotal}
  var diameter = sizeFactor * scaleFactor;
  var offset = diameter / 2;
`;

export const offsetYTotalExpressionBase = `
  ${sizeFactorTotalResults}

  ${scaleFactorTotal}
  var diameter = sizeFactor * scaleFactor;
  var offset = diameter * 0.67;
`;

// counties layer expressions

const sizeFactorCounties = `
  var sizeFactor = When(
    percentStateVotes >= 30, 40,
    percentStateVotes >= 5, 25 + ((15/25) * (percentStateVotes - 5)),
    percentStateVotes >= 1, 20 + ((5/4) * (percentStateVotes - 1)),
    percentStateVotes > 0.5, 10 + ((10/0.5) * (percentStateVotes - 0.5)),
    percentStateVotes > 0, 6 + ((4/0.5) * percentStateVotes),
    0
  );
`;

const scaleFactorCounties = `
  var scaleFactorBase = ( ${referenceScale} / $view.scale );

  var scaleFactor = When(
    scaleFactorBase >= 1, 1,  // 1
    scaleFactorBase >= 0.5, scaleFactorBase * 1,  // 0.6
    scaleFactorBase >= 0.25, scaleFactorBase * 1.8,  // 0.45
    scaleFactorBase >= 0.125, scaleFactorBase * 2.5,  // 0.3125
    scaleFactorBase * 3  // 0.1875
  );
`;

export const sizeExpressionBase = `
  ${sizeFactorCounties}

  ${scaleFactorCounties}
  return sizeFactor * scaleFactor;
`;

export const offsetXExpressionBase = `
  ${sizeFactorCounties}

  ${scaleFactorCounties}
  var diameter = sizeFactor * scaleFactor;
  var offset = diameter / 2;
`;

export const offsetYExpressionBase = `
  ${sizeFactorCounties}

  ${scaleFactorCounties}
  var diameter = sizeFactor * scaleFactor;
  var offset = diameter * 0.67;
`;
