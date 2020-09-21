define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.maxScale = 4622324 / 16;
    exports.referenceScale = 2311162;
    exports.scaleThreshold = 9244600; // 9244649;
    exports.stateReferenceScale = 18489200;
    exports.years = {
        previous: 2012,
        next: 2016
    };
    exports.fieldInfos = {
        title: {
            state: "{STATE}",
            county: "{Name_1}, {STATE_NAME}"
        },
        democrat: {
            county: {
                previous: {
                    name: "PRS_DEM_12",
                    label: "2012 Democrat votes"
                },
                next: {
                    name: "PRS_DEM_16",
                    label: "2016 Democrat votes"
                },
            },
            state: {
                previous: {
                    name: "SUM_PRS_DEM_12",
                    label: "2012 Democrat votes"
                },
                next: {
                    name: "SUM_PRS_DEM_16",
                    label: "2016 Democrat votes"
                }
            }
        },
        republican: {
            county: {
                previous: {
                    name: "PRS_REP_12",
                    label: "2012 Republican votes"
                },
                next: {
                    name: "PRS_REP_16",
                    label: "2016 Republican votes"
                }
            },
            state: {
                previous: {
                    name: "SUM_PRS_REP_12",
                    label: "2012 Republican votes"
                },
                next: {
                    name: "SUM_PRS_REP_16",
                    label: "2016 Republican votes"
                }
            }
        },
        other: {
            county: {
                previous: {
                    name: "PRS_OTH_12",
                    label: "2012 Other votes"
                },
                next: {
                    name: "PRS_OTH_16",
                    label: "2016 Other votes"
                }
            },
            state: {
                previous: {
                    name: "SUM_PRS_OTH_12",
                    label: "2012 Other votes"
                },
                next: {
                    name: "SUM_PRS_OTH_16",
                    label: "2016 Other votes"
                }
            }
        },
        normalizationFields: {
            county: {
                previous: "TOTAL_STATE_VOTES_12",
                next: "TOTAL_STATE_VOTES_16"
            },
            state: {
                previous: "",
                next: ""
            }
        }
    };
    exports.rColorCIM = [220, 75, 0, 255]; // [237, 81, 81, 255];
    exports.dColorCIM = [60, 108, 204, 255]; // [20, 158, 206, 255];
    exports.oColorCIM = [224, 206, 0, 255]; // [167, 198, 54, 255];   145, 217, 0
    exports.borderColorCIM100 = [133, 32, 1, 255];
    exports.rColor = "rgba(220, 75, 0, 1)"; // "#ed5151";  dc4b00
    exports.dColor = "rgba(60, 108, 204,1)"; // "#149ece";  3c6ccc
    exports.oColor = "rgba(224, 206, 0, 1)"; // "rgba(224, 206, 0, 1)"// "#a7c636";  #91d900  #a87132
    exports.haloColor = "#f7f7f7";
    exports.oTextColor = "rgba(181, 166, 0, 1)"; // = "#4b4b4b";
    exports.haloSize = 1;
});
//# sourceMappingURL=config.js.map