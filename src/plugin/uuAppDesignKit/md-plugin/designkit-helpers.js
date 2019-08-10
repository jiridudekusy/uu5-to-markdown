import UU5Parser from "../../../parser/uu5parser";
import UU5Utils from "../../../tools/uu5utils";
import ParserUtils from "../../../parser/parserUtils";

export default class DesignKitHelpers {
  static _transformLink(node) {
    let res;
    let linkText = DesignKitHelpers.getDesignKitCellContent(node);
    let linkHref = node.getAttribute("href");

    if (linkHref) {
      // case: link with href
      res = [linkHref, linkText];
    } else {
      // case: link without href
      res = linkText;
    }
    return res;
  }

  static getListItemUu5Content(node, keyword) {
    return DesignKitHelpers.getDesignKitCellContent(node, false, keyword);
  }

  static getDesignKitCellContent(node, linkSupported, name) {
    let res;

    if (
      linkSupported &&
      ParserUtils.hasOneElement(node) &&
      ParserUtils.getOneElement(node).localName === "UU5.Bricks.Link"
    ) {
      res = DesignKitHelpers._transformLink(ParserUtils.getOneElement(node));
    } else {
      res = "";
      if (!ParserUtils.hasOnlyTextContent(node)) {
        res = "<uu5string/>";
      }
      if (name && node.childNodes[0] && node.childNodes[0].nodeType === 3) {
        node.childNodes[0].data = node.childNodes[0].data.replace(new RegExp(`^\\s*${name}:\\s*`), "");
      }
      let xmlContent = ParserUtils.getXmlContent(node);
      res += xmlContent;
      res = res.trim();
    }
    return res;
  }

  static parseAttributes(line, marker) {
    let attributes = {};

    if (line.trimEnd() === marker) {
      return attributes;
    }

    let attributesString = line.substring(marker.length);

    attributesString = attributesString.replace(/^\s*\{:/, "{");
    attributes = JSON.parse(attributesString);
    return attributes;
  }

  static createDesignKitRecognizeFunction(
    marker,
    endMarker,
    tagName,
    opts,
    processCallback
  ) {
    return function (state, startLine, endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine],
        contentEndLine;

      if (pos >= max) {
        return false;
      }

      let line = state.getLines(startLine, startLine + 1, 0, false);

      if (!line.startsWith(marker)) {
        return false;
      }

      if (silent) {
        return true;
      }

      let nextLine = startLine + 1;
      let content = "";

      for (; nextLine < endLine; nextLine++) {
        let line = state.getLines(nextLine, nextLine + 1, 0, false);

        if (line.trim() === endMarker) {
          contentEndLine = nextLine - 1;
          break;
        }
        content += line + "\n";
      }

      state.line = contentEndLine + 2;

      // convert md subcontent to uu5string for easier processing
      let uu5content = opts.markdownToUu5.render(content, state.env);

      // parse uu5 content
      let uu5Parser = new UU5Parser(opts);
      let dom = uu5Parser.parse(uu5content);
      dom = dom.documentElement;

      let attributes = processCallback(dom);

      attributes = Object.assign(
        attributes,
        DesignKitHelpers.parseAttributes(line, marker)
      );
      state.tokens.push({
        type: tagName,
        tagAttributes: attributes
      });
      return true;
    };
  }

  static createListToTableDesignKitJsonDesignKit(cfg, opts) {
    return DesignKitHelpers.createDesignKitRecognizeFunction(
      cfg.marker,
      cfg.endMarker,
      cfg.tagName,
      opts,
      dom => {
        let res = {};
        if (dom.childNodes.length === 0) {
          res["data"] = UU5Utils.toUU5Json([]);
          return res;
        }
        // TODO add check that dom.childNodes[1] is list
        // get uu5json data rows, skip first tag (<uu5string/>)
        let uu5Rows = ParserUtils.getChildNodes(dom.firstChild);
        let uu5jsonRes = [];

        if (cfg.columns) {
          for (let i = 0; i < uu5Rows.length; i++) {
            let uu5Row = uu5Rows[i];
            // TODO check if last node is list
            let listNode;
            let firstCellNodes;

            if (uu5Row.lastChild.localName === "UU5.Bricks.Ul") {
              listNode = uu5Row.lastChild;
              firstCellNodes = Array.prototype.slice.call(
                uu5Row.childNodes,
                0,
                -1
              );
            } else {
              firstCellNodes = uu5Row.childNodes;
            }
            let uu5jsonRow = [];

            uu5jsonRow.push(
              DesignKitHelpers.getDesignKitCellContent(
                {childNodes: firstCellNodes, nodeType: 1},
                cfg.columns[0].linkSupported,
                cfg.columns[0].name
              )
            );

            if (listNode) {
              let listChildNodes = ParserUtils.getChildNodes(listNode);

              for (let j = 0; j < listChildNodes.length; j++) {
                let defIndex = j + 1;
                if (cfg.dynamicColumns) {
                  defIndex =
                    cfg.columns.length > j + 1 ? j + 1 : cfg.columns.length - 1;
                }
                uu5jsonRow.push(
                  DesignKitHelpers.getDesignKitCellContent(
                    listChildNodes[j],
                    cfg.columns[defIndex].linkSupported,
                    cfg.columns[defIndex].name
                  )
                );
              }
            }

            uu5jsonRes.push(uu5jsonRow);
          }
        } else if (cfg.singleColumn) {
          for (let i = 0; i < uu5Rows.length; i++) {
            let uu5Row = uu5Rows[i];

            uu5jsonRes.push(
              DesignKitHelpers.getDesignKitCellContent(uu5Row, cfg.singleColumn)
            );
          }
        } else if (cfg.items) {
          for (let i = 0; i < uu5Rows.length; i++) {
            let uu5Row = uu5Rows[i];
            let itemCfg = cfg.items[i];

            uu5jsonRes.push(
              DesignKitHelpers.getDesignKitCellContent(
                uu5Row,
                itemCfg.linkSupported,
                itemCfg.name
              )
            );
          }
        }

        res["data"] = UU5Utils.toUU5Json(uu5jsonRes);
        return res;
      }
    );
  }

  static createDesignKitElement(tagName, supportedAttributes, attributes) {
    // TODO get quot char acfording to the attribute
    let quotChar = "'";
    let attributesString = supportedAttributes
    .filter(attribute => attributes[attribute] !== undefined)
    .map(attribute => {
        let value = attributes[attribute];
        if (value != null) {
          value = value.replace(new RegExp(quotChar, "g"), "\\'");
          return `${attribute}=${quotChar}${value}${quotChar}`;
        }
        return attribute;
      }
    )
    .join(" ");

    // TODO support multiple attributes
    let res = "<" + tagName + " " + attributesString + "/>";

    return res + "\n";
  }

  static createDesignKitRenderer(tagName, attribues) {
    let supportedAttributes = [].concat(attribues).concat(["data"]);

    return function (tokens, idx) {
      return DesignKitHelpers.createDesignKitElement(
        tagName,
        supportedAttributes,
        tokens[idx].tagAttributes
      );
    };
  }
}
