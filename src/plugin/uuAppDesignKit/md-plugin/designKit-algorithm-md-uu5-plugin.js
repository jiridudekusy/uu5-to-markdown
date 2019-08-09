import DesignKitHelpers from "./designkit-helpers";
import ParserUtils from "../../../parser/parserUtils";
import UU5Utils from "../../../tools/uu5utils";
import uuidv4 from "uuid/v4";

const marker = "{algorithm}";
const endMarker = "{/algorithm}";
const tagName = "UuApp.DesignKit.Algorithm";

//TODO both list must be made optional !!!

function generateId() {
  return uuidv4().replace(/-/g, "");
}

function parseAlgorithmOverview(overviewList, algorithm) {
  let overviewItems = ParserUtils.getChildNodes(overviewList);
  for (let item of overviewItems) {
    //skit text nodes
    if (item.nodeType === 3) {
      continue;
    }
    if (item.localName != "UU5.Bricks.Li") {
      throw "Invalid algorithm structure. First child of algorithm must be bullet list.";
    }
    let itemStart = item.firstChild;

    //in case than any bullet point is multiline string
    if (itemStart.localName === "UU5.Bricks.P") {
      itemStart = itemStart.firstChild;
    }

    if (itemStart.nodeType != 3) {
      throw "Invalid algorithm structure. First child of algorithm must be bullet list. Each bullet must start with text [entry type]: .";
    }
    let keywordMatch = itemStart.data.match(/^(.+?):/);
    if (!keywordMatch) {
      throw `Invalid algorithm structure. First child of algorithm must be bullet list. Each bullet must start with text "[keyword]:" .`;
    }
    let keyword = keywordMatch[1];
    let itemUu5Content = DesignKitHelpers.getListItemUu5Content(item, keyword);
    switch (keyword) {
      case "Name":
        algorithm.name = itemUu5Content;
        break;
      case "Description":
        algorithm.desc = itemUu5Content;
        break;
      case "Error Prefix":
        algorithm.errorPrefix = itemUu5Content;
        break;
      default:
        throw `Invalid algorithm structure. First child of algorithm must be bullet list. Each bullet must start with text "[keyword]:" . Supported keywords Name, Description and Error Prefix. Found : "${keyword}"`;
    }
  }
}

function flattenStatementNodes(item) {
  let flattenChildNodes = [];
  let paragraphId = 0;
  for (let itemChild of item.childNodes) {
    if (itemChild.nodeType === 1 && itemChild.localName === "UU5.Bricks.P") {
      paragraphId++;
      flattenChildNodes.push(...(itemChild.childNodes.map(i => Object.assign({inParagraph: true, paragraphId}, i))));
    } else {
      flattenChildNodes.push(itemChild);
    }
  }
  return flattenChildNodes;
}

function isStatementPart(node, parts) {

  if (node.nodeType === 3) {
    //TODO add escaping for keywords inside parts
    let matcher = node.data.match(new RegExp(`^\\n?(${parts.join("|")}):`));
    if (matcher) {
      return matcher[1];
    }
  }
  return null;
}

function getNodeUU5conent(node, name) {
  let res;

  res = "";
  // if (!ParserUtils.hasOnlyTextContent(node)) {
  //   res = "<uu5string/>";
  // }
  if (name && node.childNodes[0] && node.childNodes[0].nodeType === 3) {
    node.childNodes[0].data = node.childNodes[0].data.replace(new RegExp(`^\\s*${name}:\\s*`), "");
  }
  let xmlContent = ParserUtils.getXmlContent({childNodes: [node]});
  res += xmlContent;
  res = res.trim();

  return res;
}

function joinContent(contentNodes) {
  let transformedNodes = [];
  let paragraphId;
  let paragraph;
  if (contentNodes.length === 0) {
    return "";
  }
  if (contentNodes[contentNodes.length - 1].localName === "br") {
    contentNodes.pop();
  }
  for (let node of contentNodes) {
    if (node.inParagraph) {
      if (paragraphId != node.paragraphId) {
        paragraph = {
          localName: "UU5.Bricks.P",
          childNodes: [],
          nodeType: 1,
          attributes: []
        };
        transformedNodes.push(paragraph);
        paragraphId = node.paragraphId;
      }
      paragraph.childNodes.push(node);
    } else {
      paragraphId = null;
      paragraph = null;
      transformedNodes.push(node);
    }
  }
  if (transformedNodes.length === 1 && transformedNodes[0].localName === "UU5.Bricks.P") {
    transformedNodes = transformedNodes[0].childNodes;
  }
  let res = "";
  if (transformedNodes.filter(node => node.nodeType === 1).length != 0) {
    res += "<uu5string />";
  }
  return res + transformedNodes.map(node => getNodeUU5conent(node)).map(uu5 => uu5.replace(/UU5\.Bricks\.P/g, "UU5.Bricks.Div")).join(("\n"));
}

function parseStementParts(flattenStatementChildNodes, supportedParts) {
  let currentStatementPart;
  let statementParts = {};
  for (let statementChildNode of flattenStatementChildNodes) {
    if (!currentStatementPart) {
      if (!isStatementPart(statementChildNode, supportedParts)) {
        throw `Invalid algorithm structure. Each statement of algorithm content must begin with text \"[statement type]: //[statement comment]\" and follows by parts specified in form "[partname]: [part content]". Each part must be on new line.`
      }
    }
    let partName;
    if (partName = isStatementPart(statementChildNode, supportedParts)) {
      currentStatementPart = {name: partName, content: []};
      statementParts[partName] = currentStatementPart;
      statementChildNode.data = statementChildNode.data.replace(new RegExp(`^\\s*${partName}:\\s?`), "");
      currentStatementPart.content.push(statementChildNode);
    } else {
      currentStatementPart.content.push(statementChildNode);
    }
  }
  return statementParts;
}

const DESCRIPTION_PART = "Description";
const STATEMENTS_PART = "Statements";
const CONDITION_PART = "Condition";
const CODE_PART = "Code";
const MESSAGE_PART = "Message";
const PARAMS_PART = "Params";
const THROW_EXCEPTION_PART = "Throw exception";

function increaseLabel(label) {
  if (typeof label == "number") {
    return ++label;
  }
  return String.fromCharCode(label.charCodeAt(0) + 1);
}

function processStandardstetmentParts(statementParts, statement, labelPath, labelType) {
  if (statementParts[DESCRIPTION_PART]) {
    statement.desc = joinContent(statementParts[DESCRIPTION_PART].content);
  }
  if (statementParts[STATEMENTS_PART]) {
    //TODO find staement list correctly and validate
    let statementList = statementParts[STATEMENTS_PART].content.filter(i => i.nodeType === 1)[0];
    parseStatementList(statementList, statement, labelPath, labelType);
  }
  statement.label = labelPath.join(".") + ".";
}

function processStep(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath);
}

function processSequence(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, STATEMENTS_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
}

function processSelectionIf(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, STATEMENTS_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "terrers");
}

function processIf(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, STATEMENTS_PART, CONDITION_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
  if (statementParts[CONDITION_PART]) {
    statement.condition = joinContent(statementParts[CONDITION_PART].content);
  }
}

function processElseIf(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, STATEMENTS_PART, CONDITION_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
  if (statementParts[CONDITION_PART]) {
    statement.condition = joinContent(statementParts[CONDITION_PART].content);
  }
}

function processElse(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, STATEMENTS_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
}

function processIteration(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, STATEMENTS_PART, CONDITION_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
  if (statementParts[CONDITION_PART]) {
    statement.condition = joinContent(statementParts[CONDITION_PART].content);
  }
}

function processWarning(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, CODE_PART, MESSAGE_PART, PARAMS_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
  if (statementParts[CODE_PART]) {
    statement.code = joinContent(statementParts[CODE_PART].content);
  }
  if (statementParts[MESSAGE_PART]) {
    statement.message = joinContent(statementParts[MESSAGE_PART].content);
  }
  if (statementParts[PARAMS_PART]) {
    statement.params = joinContent(statementParts[PARAMS_PART].content);
  }
}

function processError(flattenStatementChildNodes, statement, labelPath) {
  let statementParts = parseStementParts(flattenStatementChildNodes, [DESCRIPTION_PART, CODE_PART, MESSAGE_PART, PARAMS_PART, THROW_EXCEPTION_PART]);
  processStandardstetmentParts(statementParts, statement, labelPath, "numbers");
  if (statementParts[CODE_PART]) {
    statement.code = joinContent(statementParts[CODE_PART].content);
  }
  if (statementParts[MESSAGE_PART]) {
    statement.message = joinContent(statementParts[MESSAGE_PART].content);
  }
  if (statementParts[PARAMS_PART]) {
    statement.params = joinContent(statementParts[PARAMS_PART].content);
  }
  if (statementParts[THROW_EXCEPTION_PART]) {
    let throwExStr = joinContent(statementParts[THROW_EXCEPTION_PART].content);
    let throwEx;
    switch (throwExStr.trim()) {
      case "true":
      case "yes":
        throwEx = true;
        break;
      case "false":
      case "no":
        throwEx = false;
    }
    if(throwEx != undefined){
      statement.exception = throwEx;
    }
  }
}

function parseStatementList(bodyList, parentStatement, labelPath, labelType) {
  let bodyItems = ParserUtils.getChildNodes(bodyList);
  let label;
  if (labelType == "numbers") {
    label = 1
  } else {
    label = "A"
  }
  parentStatement.statementList = [];
  for (let item of bodyItems) {
    //skip text nodes
    if (item.nodeType === 3) {
      continue;
    }
    if (item.localName != "UU5.Bricks.Li") {
      throw "Invalid algorithm structure.  Second child of algorithm must be ordered list with algorithm content.";
    }
    let flattenStatementChildNodes = flattenStatementNodes(item);
    if (flattenStatementChildNodes.length == 0) {
      throw "Invalid algorithm structure. Each statement of algorithm content must have some content.";
    }
    let statementBasicInfo = flattenStatementChildNodes.shift();
    //TODO co kdyz tam nekdo da nejaky formatovani ?
    if (statementBasicInfo.nodeType != 3) {
      throw `Invalid algorithm structure. Each statement of algorithm content must begin with text "[statement type]: //[statement comment]". This begining text must be without any formatting.`;
    }
    //TODO name all types
    let statementBasicInfoMatcher = statementBasicInfo.data.match(/^(.+?):(?:\s*\/\/(.*))?$/);
    if (!statementBasicInfoMatcher) {
      throw `Invalid algorithm structure. Each statement of algorithm content must begin with text "[statement type]: //[statement comment]". This begining text must be without any formatting.`;
    }
    console.log(`${statementBasicInfoMatcher[1]}: //${statementBasicInfoMatcher[2]}`);
    let statement = {
      name: "",
      type: statementBasicInfoMatcher[1].charAt(0).toLowerCase() + statementBasicInfoMatcher[1].slice(1),
      comment: statementBasicInfoMatcher[2],
      id: generateId()
    };
    parentStatement.statementList.push(statement);
    if (flattenStatementChildNodes.length == 0) {
      return;
    }
    //skip br
    if (flattenStatementChildNodes[0].nodeType === 1 && flattenStatementChildNodes[0].localName == "br") {
      flattenStatementChildNodes.shift();
    }
    let newLabelPath = [...labelPath, label];
    switch (statement.type) {
      case "step":
        processStep(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "sequence":
        processSequence(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "selectionIf":
        processSelectionIf(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "if":
        processIf(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "elseIf":
        processElseIf(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "else":
        processElse(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "iteration":
        processIteration(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "warning":
        processWarning(flattenStatementChildNodes, statement, newLabelPath);
        break;
      case "error":
        processError(flattenStatementChildNodes, statement, newLabelPath);
        break;
      default:
        throw `Invalid algorithm structure. Type "${statement.type}" is not supported.`
    }
    label = increaseLabel(label);
  }
}

function processAlgorithmCallback(dom) {
  let res = {};
  if (dom.childNodes.length === 0) {
    return res;
  }
  let algorithm = {
    id: generateId()
  };

  let overviewList = dom.firstChild;
  if (overviewList.localName != "UU5.Bricks.Ul") {
    throw "Invalid algorithm structure. First child of algorithm must be bullet list with algorithm overview.";
  }
  parseAlgorithmOverview(overviewList, algorithm);

  let bodyList = overviewList;
  while (bodyList = bodyList.nextSibling) {
    if (bodyList.nodeType === 1) {
      if (bodyList.localName != "UU5.Bricks.Ol") {
        throw "Invalid algorithm structure. Second child of algorithm must be ordered list with algorithm content.";
      }
      break;
    }
  }
  if (!bodyList) {
    throw "Invalid algorithm structure. Second child of algorithm must be ordered list with algorithm content.";
  }
  parseStatementList(bodyList, algorithm, [], "numbers");
  console.log(JSON.stringify(algorithm, null, 2));
  res["data"] = UU5Utils.toUU5Json(algorithm);
  return res;
}

/**
 * Plugin for MarkdownRenderer that is part of uu5CodeKit.
 * @param renderer instance of MarkdownRenderer
 * @param opts options for this plugin. Currently no options are supported.
 */
export default function mdToUu5Plugin(renderer, opts) {
  renderer.block.ruler.before(
    "code",
    tagName,
    DesignKitHelpers.createDesignKitRecognizeFunction(marker, endMarker, tagName, opts, processAlgorithmCallback)
  );
  renderer.renderer.rules[tagName] = DesignKitHelpers.createDesignKitRenderer(tagName, [], opts);
}
