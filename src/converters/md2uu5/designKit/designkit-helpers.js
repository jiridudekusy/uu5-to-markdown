import UU5Parser from '../../../parser/uu5parser';
import * as ParserUtils from '../../../parser/parserUtils';

let uu5Parser = new UU5Parser();

function getDesignKitCellContent(node) {
  let res = '';

  if (!ParserUtils.hasOnlyTextContent(node)) {
    res += '<uu5string/>';
  }
  res += ParserUtils.getXmlContent(node);

  return res;
}

function getDesignKitCellLink(nodes) {
  let res;

  if (nodes.length === 0) {
    res = '';
  } else if (nodes.length === 1) {
    let node = nodes[0];

    if (node.nodeType === 1) {
      if (node.localName === 'UU5.Bricks.Link') {
        let linkText = getDesignKitCellContent(node);
        let linkHref = node.getAttribute('href');

        if (linkHref) {
          // case: link with href
          res = [linkHref, linkText];
        } else {
          // case: link without href
          res = linkText;
        }
      } else {
        // case: rich text (with uu5 components)
        res = ParserUtils.getXml(node);
      }
    }

    if (node.nodeType === 3) {
      // case: only text
      res = node.data;
    }
  } else {
    // TODO serialize to uu5String
    throw new Error('Not supported yet.');
  }
  return res;
}

function createDesignKitRecognizeFunction(marker, tagName, opts, processCallback) {
  return function (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      contentEndLine;

    if (pos >= max) {
      return false;
    }

    let line = state.getLines(startLine, startLine + 1, 0, false);

    if (marker !== line) {
      return false;
    }

    if (silent) {
      return true;
    }

    let nextLine = startLine + 1;
    let content = '';

    for (; nextLine < endLine; nextLine++) {
      let line = state.getLines(nextLine, nextLine + 1, 0, false);

      if (line.trim() === '') {
        contentEndLine = nextLine - 1;
        break;
      }
      content += line + '\n';
    }

    state.line = contentEndLine + 1;

    // convert md subcontent to uu5string for easier processing
    let uu5content = opts.markdownToUu5.render(content);

    // remove all new lines. They are just adding complexity to the parsing
    // TODO thish can be later replaced by some checks in  processing
    uu5content = uu5content.replace(/\n/g, '');

    // parse uu5 content
    let dom = uu5Parser.parse(uu5content);

    let attributes = processCallback(dom);

    state.tokens.push({
      type: tagName,
      tagAttributes: attributes
    });
    return true;
  };
}

function createListToTableDesignKitJsonDesignKit(cfg, opts) {
  return createDesignKitRecognizeFunction(cfg.marker, cfg.tagName, opts,
    (dom) => {
      // TODO add check that dom.childNodes[1] is list
      // get uu5json data rows
      let uu5Rows = ParserUtils.getChildNodes(dom.childNodes[1]);
      let uu5jsonRes = [];

      for (let i = 0; i < uu5Rows.length; i++) {
        let uu5Row = uu5Rows[i];
        // TODO check if last node is list
        let listNode;
        let firstCellNodes;

        if (uu5Row.lastChild.localName === 'UU5.Bricks.Ul') {
          listNode = uu5Row.lastChild;
          firstCellNodes = Array.prototype.slice.call(uu5Row.childNodes, 0, -1);
        } else {
          firstCellNodes = uu5Row.childNodes;
        }
        let uu5jsonRow = [];

        if (cfg.columns[0].linkSupported) {
          uu5jsonRow.push(getDesignKitCellLink(firstCellNodes));
        } else {
          uu5jsonRow.push(getDesignKitCellContent(firstCellNodes));
        }

        // TODO do according to the configuration !!!!
        if (listNode) {
          uu5jsonRow.push(...Array.prototype.map.call(listNode.childNodes, (item) => getDesignKitCellContent(item)));
        }

        uu5jsonRes.push(uu5jsonRow);
      }

      let jsonData = '<uu5json/>' + JSON.stringify(uu5jsonRes);
      let res = {};

      res['data'] = jsonData;
      return res;
    });
}

function createDesignKitElement(tagName, attributes) {
  // TODO get quot char acfording to the attribute
  let quotChar = '\'';

  // TODO support multiple attributes
  let res = '<' + tagName + ' data=' + quotChar + attributes['data'] + quotChar + '/>';

  return res + '\n';
}

function createDesignKitRenderer(tagName, opts) {
  return function (tokens, idx, options, env, renderer) {
    return createDesignKitElement(tagName, tokens[idx].tagAttributes);
  };
}

export {
  getDesignKitCellContent,
  getDesignKitCellLink,
  createDesignKitRecognizeFunction,
  createDesignKitElement,
  createDesignKitRenderer,
  createListToTableDesignKitJsonDesignKit
};
