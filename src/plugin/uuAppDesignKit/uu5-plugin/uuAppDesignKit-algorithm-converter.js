"use strict";
import {ElementDef, ElementsDefRepo} from "../../../converters/element.js";
import UU5Utils from "../../../tools/uu5utils";

let levelOffset = 4;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLabel(label) {
  return label.match(/.*\.?([a-zA-Z0-9]+\.)/)[1];
}

function toMarkdown(uu5String, that) {
  uu5String = uu5String.replace(/<UU5.Bricks.Div.*?>/g, "<UU5.Bricks.P>");
  uu5String = uu5String.replace(/<\/UU5.Bricks.Div>/g, "</UU5.Bricks.P>");
  return that.toMarkdown(uu5String);
}

function indentLines(string, indent, startLine) {
  if (!string) {
    return "";
  }
  if (startLine == undefined) {
    startLine = 0;
  }
  let indentedLines = string
  .split("\n")
  // removing of \r keeps there lines with \r\n which will be otherwised cleared out
  .map(line => line.replace(/\r/g, ""))
  .map((line, i) => (i >= startLine ? "".padEnd(indent, " ") + line : line));
  let res = indentedLines.join("\n");
  if (indentedLines.length > 1) {
    res += "\n";
  }
  return res;
}

function covertStatement(statement, that, offset) {
  if (offset == undefined) {
    offset = 0;
  }
  let lineOffset = offset + levelOffset;
  let res = `${"".padEnd(offset, " ")}${getLabel(statement.label).padEnd(
    levelOffset,
    " "
  )}${capitalize(statement.type)}: //${statement.comment || ""}  \n`;
  if (["if", "elseIf"].indexOf(statement.type) > -1) {
    res += `${" ".padEnd(lineOffset, " ")}Condition: ${indentLines(
      toMarkdown(statement.condition, that),
      lineOffset,
      1
    )}  \n`;
  }

  res += `${" ".padEnd(lineOffset, " ")}Description: ${indentLines(toMarkdown(statement.desc, that), lineOffset, 1)}  \n`;
  if (["error", "warning"].indexOf(statement.type) > -1) {
    res += `${" ".padEnd(lineOffset, " ")}Code: ${statement.code}  \n`;
    res += `${" ".padEnd(lineOffset, " ")}Message: ${statement.message}  \n`;
    if (statement.type === "error") {
      res += `${" ".padEnd(lineOffset, " ")}Throw exception: ${
        statement.exception
        }  \n`;
    }
    res += `${" ".padEnd(lineOffset, " ")}Params: ${indentLines(
      statement.params,
      lineOffset,
      1
    )}  \n`;
  }
  if (statement.statementList && statement.statementList.length > 0) {
    res += `${" ".padEnd(lineOffset, " ")}Statements:  \n`;
    for (let innerStatement of statement.statementList) {
      res += covertStatement(innerStatement, that, offset + levelOffset);
    }
  }
  return res;
}

export default class UUAppDesignKitAlgorithmConverter {
  constructor() {
    let algorithm = new ElementDef("UuApp.DesignKit.Algorithm", "data").block();

    this._elementDefsRepo = new ElementsDefRepo(algorithm);

    this._converters = [
      {
        filter: algorithm,
        replacement: function (content, node) {
          let jsonString = node.getAttribute("data");

          if (!UU5Utils.isUU5Json(jsonString)) {
            throw new Error(`String '${jsonString}' is not valid uu5json.`);
          }
          //why ?
          // jsonString = jsonString.replace(/-/g, "\\\\-");
          let data = UU5Utils.parseJson(jsonString);
          console.log(JSON.stringify(data, null, 2));

          let res = "\n\n{algorithm}\n";
          res += `*   Name: ${data.name}\n`;
          res += `*   Description: ${indentLines(
            toMarkdown(data.desc, this),
            levelOffset,
            1
          )}\n`;
          res += `*   Error Prefix: ${data.errorPrefix}\n`;
          res += `\n`;

          for (let statement of data.statementList) {
            res += covertStatement(statement, this);
          }
          res += "\n\n{/algorithm}\n";
          return res;
        }
      }
    ];
  }

  get elementDefsRepo() {
    return this._elementDefsRepo;
  }

  get converters() {
    return this._converters;
  }
}
