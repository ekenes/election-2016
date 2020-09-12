const TOTAL_STATE_VOTES_12 = `
  var state = $feature["STATE_NAME"];
  var fields = ["PRS_DEM_12", "PRS_OTH_12", "PRS_REP_12", "STATE_NAME"]
  var countiesInState = Filter(FeatureSetById($datastore, "0", fields, false), "STATE_NAME = @state");
  Sum(countiesInState, "PRS_DEM_12 + PRS_OTH_12 + PRS_REP_12");
`;

const TOTAL_STATE_VOTES_16 = `
  var state = $feature["STATE_NAME"];
  var fields = ["PRS_DEM_16", "PRS_OTH_16", "PRS_REP_16", "STATE_NAME"]
  var countiesInState = Filter(FeatureSetById($datastore, "0", fields, false), "STATE_NAME = @state");
  Sum(countiesInState, "PRS_DEM_16 + PRS_OTH_16 + PRS_REP_16");
`;


