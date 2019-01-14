import UU5Parser from "./parser/uu5parser.js";

export default class UU5Prettifyer {
  constructor(options) {
    this._parser = new UU5Parser(options);
    this._options = Object.assign(
      {
        indentPreformated: false
      },
      options
    );
  }

  prettify(source) {
    let result;
    try {
      let sourceTmp = source;
      // sourceTmp = this._replaceAll(
      //   sourceTmp,
      //   "<uu5string.pre>",
      //   "<uu5string.pre><![CDATA["
      // );
      // sourceTmp = this._replaceAll(
      //   sourceTmp,
      //   "</uu5string.pre>",
      //   "]]></uu5string.pre>"
      // );
      //
      // sourceTmp = "<root>" + sourceTmp + "</root>";
      let dom = this._parser.parse(sourceTmp);
      result = Array.prototype.filter
        .call(dom.documentElement.childNodes, node => node.nodeType === 1)
        .filter(node => node.nodeName != "uu5string")
        .map(node => this._process(node))
        .join("\n");

      result = "<uu5string/>\n" + result;
    } catch (e) {
      console.log(`Error during pretty print: ${e}`);
      result = source;
    }
    return result;
  }

  _process(node, isPrevisousBlock) {
    let res = "";
    let anyChildBlock = false;
    let innerRes = "";
    if (node.hasChildNodes()) {
      let lastNodeBlock;
      for (let child of Array.from(node.childNodes)) {
        let elementText = this._process(child, lastNodeBlock);
        if (child.nodeType === 1) {
          if (this.isBlock(child)) {
            if (
              this._isPreformated(child) &&
              !this._options.indentPreformated
            ) {
              elementText = "  " + elementText;
            } else {
              elementText = elementText
                .split("\n")
                .map(line => "  " + line)
                .join("\n");
            }
            elementText = "\n" + elementText;
            lastNodeBlock = true;
            anyChildBlock = true;
          } else {
            if (lastNodeBlock) {
              elementText = "\n  " + elementText;
              lastNodeBlock = false;
            }
          }
        } else if (child.nodeType === 3) {
          if (this._isPreformated(node)) {
            elementText = child.data;
          } else {
            if (child.data.trim().length > 0) {
              if (lastNodeBlock) {
                elementText += "\n  ";
                lastNodeBlock = false;
              }
              let content = child.data;
              content = content.replace(/\s+$/, " ");
              content = content.replace(/^\s+/, "");
              elementText += content;
            }
          }
        }
        innerRes += elementText;
      }
    }
    if (node.nodeType === 1) {
      res += this._getOpenTag(node, isPrevisousBlock);
      if (innerRes.trim().length > 0) {
        res += ">" + innerRes;
        if (anyChildBlock) {
          res += "\n";
        }
        res += this._getCloseTag(node, isPrevisousBlock);
      } else {
        res += "/>";
      }
    }

    return res;
  }

  _getOpenTag(node, isPrevisousBlock) {
    let res = "<" + node.localName;

    for (let i = 0; i < node.attributes.length; i++) {
      let attribute = node.attributes[i];

      if (!attribute.noValue) {
        let quotChar = '"';

        if (attribute.value.indexOf('"') > -1) {
          if (attribute.value.indexOf("'") > -1) {
            console.error(
              `{
              Attribute
            }
            "{attribute.name}"
            with value "${attribute.value}
          "of element ${node.localName} contains ' and ".`
            );
          } else {
            quotChar = "'";
          }
        }

        res += ` ${attribute.name}=${quotChar}${attribute.value}${quotChar}`;
      } else {
        res += ` ${attribute.name}`;
      }
    }
    return res;
  }

  _getCloseTag(node, isPrevisousBlock) {
    let res = "</" + node.localName + ">";
    return res;
  }

  _isPreformated(node) {
    let prefromattedTags = [];
    if (node.nodeName.startsWith("UuApp.DesignKit")) {
      return true;
    }
    return prefromattedTags.find(item => node.nodeName === item);
  }

  isBlock(node) {
    let inlineTags = ["UU5.Bricks.Code"];
    return inlineTags.find(item => node.nodeName === item) === undefined;
    //TODO correct isBlock function
  }

  _replaceAll(string, what, replacement) {
    return string.split(what).join(replacement);
  }
}
