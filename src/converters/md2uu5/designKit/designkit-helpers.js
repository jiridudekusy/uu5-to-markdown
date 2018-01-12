import UU5Parser from '../../../parser/uu5parser';
import UU5Utils from '../../../tools/uu5utils';
import ParserUtils from '../../../parser/parserUtils';

let uu5Parser = new UU5Parser();

export default class DesignKitHelpers {
  static _transformLink(node) {
    let res;
    let linkText = DesignKitHelpers.getDesignKitCellContent(node);
    let linkHref = node.getAttribute('href');

    if (linkHref) {
      // case: link with href
      res = [linkHref, linkText];
    } else {
      // case: link without href
      res = linkText;
    }
    return res;
  }

  static getDesignKitCellContent(node, linkSupported) {
    let res;

    if (linkSupported && ParserUtils.hasOneElement(node) && ParserUtils.getOneElement(node).localName === 'UU5.Bricks.Link') {
      res = DesignKitHelpers._transformLink(ParserUtils.getOneElement(node));
    } else {
      res = '';
      if (!ParserUtils.hasOnlyTextContent(node)) {
        res = '<uu5string/>';
      }
      res += ParserUtils.getXmlContent(node);
      res = res.trim();
    }
    return res;
  };

  static createDesignKitRecognizeFunction(marker, tagName, opts, processCallback) {
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

  static createListToTableDesignKitJsonDesignKit(cfg, opts) {
    return DesignKitHelpers.createDesignKitRecognizeFunction(cfg.marker, cfg.tagName, opts,
      (dom) => {
        let res = {};

        if (dom.childNodes.length === 1) {
          res['data'] = UU5Utils.toUU5Json([]);
          return res;
        }
        // TODO add check that dom.childNodes[1] is list
        // get uu5json data rows, skip first tag (<uu5string/>)
        let uu5Rows = ParserUtils.getChildNodes(dom.childNodes[1]);
        let uu5jsonRes = [];

        if (cfg.columns) {
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

            uu5jsonRow.push(DesignKitHelpers.getDesignKitCellContent({childNodes: firstCellNodes, nodeType: 1}, cfg.columns[0].linkSupported));

            if (listNode) {
              let listChildNodes = ParserUtils.getChildNodes(listNode);

              for (let j = 0; j < listChildNodes.length; j++) {
                uu5jsonRow.push(DesignKitHelpers.getDesignKitCellContent(listChildNodes[j], cfg.columns[j + 1].linkSupported));
              }
            }

            uu5jsonRes.push(uu5jsonRow);
          }
        } else if (cfg.items) {
          for (let i = 0; i < uu5Rows.length; i++) {
            let uu5Row = uu5Rows[i];
            let itemCfg = cfg.items[i];

            uu5jsonRes.push(DesignKitHelpers.getDesignKitCellContent(uu5Row, itemCfg.linkSupported));
          }
        }

        res['data'] = UU5Utils.toUU5Json(uu5jsonRes);
        return res;
      });
  }

  static createDesignKitElement(tagName, attributes) {
    // TODO get quot char acfording to the attribute
    let quotChar = '\'';

    // TODO support multiple attributes
    let res = '<' + tagName + ' data=' + quotChar + attributes['data'] + quotChar + '/>';

    return res + '\n';
  }

  static createDesignKitRenderer(tagName, opts) {
    return function (tokens, idx, options, env, renderer) {
      return DesignKitHelpers.createDesignKitElement(tagName, tokens[idx].tagAttributes);
    };
  }

}
