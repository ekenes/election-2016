import PopupTemplate = require("esri/PopupTemplate");
import ExpressionInfo = require("esri/popup/ExpressionInfo");
import FieldInfo = require("esri/popup/FieldInfo");
import FieldInfoFormat = require("esri/popup/support/FieldInfoFormat");

import { TextContent } from "esri/popup/content";
import { years, fieldInfos, dColor, rColor, oTextColor, oColor } from "./config";
import { colorDiffPopupBase, votesNextBase, diffTextBase } from "./expressionUtils";

////////////////////////////////////////////////////
//
// STATE
//
///////////////////////////////////////////////////

export const statePopupTemplate = new PopupTemplate({
  title: `${fieldInfos.title.state}`,
  fieldInfos: [
    new FieldInfo({
      fieldName: fieldInfos.democrat.state.previous.name,
      label: fieldInfos.democrat.state.previous.label,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.republican.state.previous.name,
      label: fieldInfos.republican.state.previous.label,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.other.state.previous.name,
      label: fieldInfos.other.state.previous.label,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.democrat.state.next.name,
      label: fieldInfos.democrat.state.next.label,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.republican.state.next.name,
      label: fieldInfos.republican.state.next.label,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.other.state.next.name,
      label: fieldInfos.other.state.next.label,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    })
  ],
  content: [
    new TextContent({
      text: `
        The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>
        candidate won {STATE} by a margin of {expression/winner-margin} points.
        The {expression/winner-votes} votes cast for the winner comprise
        {expression/winner-percent-state-votes} of the total votes cast in the state.
      `
    }),
    new TextContent({
      text: `
        <div class="table-container">
          Votes in ${years.next} and the change from ${years.previous}
          <br/>
          <br/>
          <table class="esri-widget popup">
            <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
            <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{${fieldInfos.democrat.state.next.name}}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}change${years.next}}</span></td></tr>
            <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{${fieldInfos.republican.state.next.name}}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}change${years.next}}</span></td></tr>
            <tr class="oth"><td><span style='color:${oTextColor}; font-weight:bolder'>Other</span></td><td class="num">{${fieldInfos.other.state.next.name}}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}change${years.next}}</span></td></tr>
          </table>
        </div>
      `
    })
  ],
  expressionInfos: [
    new ExpressionInfo({
      title: `winner % of state votes`,
      name: `winner-percent-state-votes`,
      expression: `
        ${votesNextBase}

        var winnerTotal = Max(all);
        return Text(winnerTotal/Sum(all), "#%");
      `
    }),
    new ExpressionInfo({
      title: `winner votes`,
      name: `winner-votes`,
      expression: `
        ${votesNextBase}

        return Text(Max(all), "#,###");
      `
    }),
    new ExpressionInfo({
      title: `winner-color`,
      name: `winner-color`,
      expression: `
        ${votesNextBase}

        Decode( Max(all),
          dem, "${dColor}",
          rep, "${rColor}",
          oth, "${oColor}",
        "#000000"
        );
      `
    }),
    new ExpressionInfo({
      title: `winner`,
      name: `winner`,
      expression: `
        ${votesNextBase}

        Decode( Max(all),
          dem, "Democrat",
          rep, "Republican",
          oth, "other",
        "tie"
        );
      `
    }),
    new ExpressionInfo({
      title: `Democrat change from ${years.previous}`,
      name: `dem${years.previous}change${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.democrat.state.next.name};
        var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
        ${diffTextBase}
        return changeText;
      `
    }),
    new ExpressionInfo({
      title: `Republican change from ${years.previous}`,
      name: `rep${years.previous}change${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.republican.state.next.name};
        var votesPrevious = $feature.${fieldInfos.republican.state.previous.name};
        ${diffTextBase}
        return changeText;
      `
    }),
    new ExpressionInfo({
      title: `Other change from ${years.previous}`,
      name: `oth${years.previous}change${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.other.state.next.name};
        var votesPrevious = $feature.${fieldInfos.other.state.previous.name};
        ${diffTextBase}
        return changeText;
      `
    }),
    new ExpressionInfo({
      title: `Democrat diff from ${years.previous}`,
      name: `dem${years.previous}diff${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.democrat.state.next.name};
        var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
        ${diffTextBase}
        return diffText;
      `
    }),
    new ExpressionInfo({
      title: `Republican diff from ${years.previous}`,
      name: `rep${years.previous}diff${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.republican.state.next.name};
        var votesPrevious = $feature.${fieldInfos.republican.state.previous.name};
        ${diffTextBase}
        return diffText;
      `
    }),
    new ExpressionInfo({
      title: `Other diff from ${years.previous}`,
      name: `oth${years.previous}diff${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.other.state.next.name};
        var votesPrevious = $feature.${fieldInfos.other.state.previous.name};
        ${diffTextBase}
        return diffText;
      `
    }),
    new ExpressionInfo({
      title: `change-color`,
      name: `dem-change-color`,
      expression: `
        var votesNext = $feature.${fieldInfos.democrat.state.next.name};
        var votesPrevious = $feature.${fieldInfos.democrat.state.previous.name};
        ${colorDiffPopupBase}
      `
    }),
    new ExpressionInfo({
      title: `change-color`,
      name: `rep-change-color`,
      expression: `
        var votesNext = $feature.${fieldInfos.republican.state.next.name};
        var votesPrevious = $feature.${fieldInfos.republican.state.previous.name};
        ${colorDiffPopupBase}
      `
    }),
    new ExpressionInfo({
      title: `change-color`,
      name: `oth-change-color`,
      expression: `
        var votesNext = $feature.${fieldInfos.other.state.next.name};
        var votesPrevious = $feature.${fieldInfos.other.state.previous.name};
        ${colorDiffPopupBase}
      `
    }),
    new ExpressionInfo({
      title: `winner-margin`,
      name: `winner-margin`,
      expression: `
        var fields = [
          $feature.${fieldInfos.democrat.state.next.name},
          $feature.${fieldInfos.republican.state.next.name},
          $feature.${fieldInfos.other.state.next.name}
        ];

        var top2 = Top(Reverse(Sort(fields)), 2);
        var winner = First(top2);
        var secondPlace = top2[1];
        var total = Sum(fields);
        return Text( (winner - secondPlace) / total, "#.#%");
      `
    })
  ]
});



////////////////////////////////////////////////////
//
// COUNTY
//
///////////////////////////////////////////////////


export const countyPopupTemplate = new PopupTemplate({
  title: `${fieldInfos.title.county}`,
  fieldInfos: [
    new FieldInfo({
      fieldName: fieldInfos.democrat.county.previous.name,
      label: `${years.previous} Democrat votes`,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.republican.county.previous.name,
      label: `${years.previous} Republican votes`,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.other.county.previous.name,
      label: `${years.previous} Other votes`,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.democrat.county.next.name,
      label: `${years.next} Democrat votes`,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.republican.county.next.name,
      label: `${years.next} Republican votes`,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    }),
    new FieldInfo({
      fieldName: fieldInfos.other.county.next.name,
      label: `${years.next} Other votes`,
      format: new FieldInfoFormat({
        places: 0,
        digitSeparator: true
      })
    })
  ],
  content: [
    new TextContent({
      text: `
        The <span style='color: {expression/winner-color}; font-weight:bolder'>{expression/winner}</span>
        candidate won this county by a margin of {expression/winner-margin}.
        The {expression/winner-votes} votes cast for the winner comprise
        {expression/winner-percent-state-votes} of the total votes cast in the state.
      `
    }),
    new TextContent({
      text: `
        <div class="table-container">
          Votes in ${years.next} and the change from ${years.previous}
          <br/>
          <br/>
          <table class="esri-widget popup">
            <tr class="head"><td>Party</td><td>Votes</td><td>+/-</td><td>% Change</td></tr>
            <tr class="dem"><td><span style='color:${dColor}; font-weight:bolder'>Democrat</span></td><td class="num">{${fieldInfos.democrat.county.next.name}}</td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/dem-change-color}'>{expression/dem${years.previous}change${years.next}}</span></td></tr>
            <tr class="rep"><td><span style='color:${rColor}; font-weight:bolder'>Republican</span></td><td class="num">{${fieldInfos.republican.county.next.name}}</td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/rep-change-color}'>{expression/rep${years.previous}change${years.next}}</span></td></tr>
            <tr class="oth"><td><span style='color:${oTextColor}; font-weight:bolder'>Other</span></td><td class="num">{${fieldInfos.other.county.next.name}}</td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}diff${years.next}}</span></td><td class="num"><span style='color: {expression/oth-change-color}'>{expression/oth${years.previous}change${years.next}}</span></td></tr>
          </table>
        </div>
      `
    })
  ],
  expressionInfos: [
    new ExpressionInfo({
      title: `winner % of state votes`,
      name: `winner-percent-state-votes`,
      expression: `
        var dem = $feature.${fieldInfos.democrat.county.next.name};
        var rep = $feature.${fieldInfos.republican.county.next.name};
        var oth = $feature.${fieldInfos.other.county.next.name};
        var all = [dem, rep, oth];

        var winnerTotal = Max(all);
        return Text(winnerTotal/$feature.${fieldInfos.normalizationFields.county.next}, "#%");
      `
    }),
    new ExpressionInfo({
      title: `winner votes`,
      name: `winner-votes`,
      expression: `
        var dem = $feature.${fieldInfos.democrat.county.next.name};
        var rep = $feature.${fieldInfos.republican.county.next.name};
        var oth = $feature.${fieldInfos.other.county.next.name};
        var all = [dem, rep, oth];

        return Text(Max(all), "#,###");
      `
    }),
    new ExpressionInfo({
      title: `winner-color`,
      name: `winner-color`,
      expression: `
        var dem = $feature.${fieldInfos.democrat.county.next.name};
        var rep = $feature.${fieldInfos.republican.county.next.name};
        var oth = $feature.${fieldInfos.other.county.next.name};
        var all = [dem, rep, oth];

        Decode( Max(all),
          dem, "${dColor}",
          rep, "${rColor}",
          oth, "${oColor}",
        "#000000"
        );
      `
    }),
    new ExpressionInfo({
      title: `winner`,
      name: `winner`,
      expression: `
        var dem = $feature.${fieldInfos.democrat.county.next.name};
        var rep = $feature.${fieldInfos.republican.county.next.name};
        var oth = $feature.${fieldInfos.other.county.next.name};
        var all = [dem, rep, oth];

        Decode( Max(all),
          dem, "Democrat",
          rep, "Republican",
          oth, "other",
        "tie"
        );
      `
    }),
    new ExpressionInfo({
      title: `Democrat change from ${years.previous}`,
      name: `dem${years.previous}change${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.democrat.county.next.name};
        var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
        ${diffTextBase}
        return changeText;
      `
    }),
    new ExpressionInfo({
      title: `Republican change from ${years.previous}`,
      name: `rep${years.previous}change${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.republican.county.next.name};
        var votesPrevious = $feature.${fieldInfos.republican.county.previous.name};
        ${diffTextBase}
        return changeText;
      `
    }),
    new ExpressionInfo({
      title: `Other change from ${years.previous}`,
      name: `oth${years.previous}change${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.other.county.next.name};
        var votesPrevious = $feature.${fieldInfos.other.county.previous.name};
        ${diffTextBase}
        return changeText;
      `
    }),
    new ExpressionInfo({
      title: `Democrat diff from ${years.previous}`,
      name: `dem${years.previous}diff${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.democrat.county.next.name};
        var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
        var diff = votesNext - votesPrevious;
        var change = ( (votesNext - votesPrevious) / votesPrevious );
        var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
        var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
        return diffText;
      `
    }),
    new ExpressionInfo({
      title: `Republican diff from ${years.previous}`,
      name: `rep${years.previous}diff${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.republican.county.next.name};
        var votesPrevious = $feature.${fieldInfos.republican.county.previous.name};
        var diff = votesNext - votesPrevious;
        var change = ( (votesNext - votesPrevious) / votesPrevious );
        var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
        var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
        return diffText;
      `
    }),
    new ExpressionInfo({
      title: `Other diff from ${years.previous}`,
      name: `oth${years.previous}diff${years.next}`,
      expression: `
        var votesNext = $feature.${fieldInfos.other.county.next.name};
        var votesPrevious = $feature.${fieldInfos.other.county.previous.name};
        var diff = votesNext - votesPrevious;
        var change = ( (votesNext - votesPrevious) / votesPrevious );
        var diffText = IIF(diff > 0, Text(diff, '+#,###'), Text(diff, '#,###'));
        var changeText = IIF(change > 0, Text(change, '↑#,###.#%'), Text(change, '↓#,###.#%'));
        return diffText;
      `
    }),
    new ExpressionInfo({
      title: `change-color`,
      name: `dem-change-color`,
      expression: `
        var votesNext = $feature.${fieldInfos.democrat.county.next.name};
        var votesPrevious = $feature.${fieldInfos.democrat.county.previous.name};
        ${colorDiffPopupBase}
      `
    }),
    new ExpressionInfo({
      title: `change-color`,
      name: `rep-change-color`,
      expression: `
        var votesNext = $feature.${fieldInfos.republican.county.next.name};
        var votesPrevious = $feature.${fieldInfos.republican.county.previous.name};
        ${colorDiffPopupBase}
      `
    }),
    new ExpressionInfo({
      title: `change-color`,
      name: `oth-change-color`,
      expression: `
        var votesNext = $feature.${fieldInfos.other.county.next.name};
        var votesPrevious = $feature.${fieldInfos.other.county.previous.name};
        ${colorDiffPopupBase}
      `
    }),
    new ExpressionInfo({
      title: `winner-margin`,
      name: `winner-margin`,
      expression: `
        var fields = [
          $feature.${fieldInfos.democrat.county.next.name},
          $feature.${fieldInfos.republican.county.next.name},
          $feature.${fieldInfos.other.county.next.name}
        ];

        var top2 = Top(Reverse(Sort(fields)), 2);
        var winner = First(top2);
        var secondPlace = top2[1];
        var total = Sum(fields);
        return Text( (winner - secondPlace) / total, "#.#%");
      `
    })
  ]
});