import UU5Parser from "./parser/uu5parser.js";
import mdConverters from "./converters/uu5-converters/html-converters";
import {ElementsDefRepo} from "./converters/element";

export default class UU5ToMarkdown {
  constructor(opts, ...plugins) {
    this._parser = new UU5Parser(opts);
    this._converters = mdConverters.slice(0);
    this._repository = new ElementsDefRepo();

    plugins.forEach(plugin => {
      this._converters = plugin.converters.concat(this._converters);
      this._repository = plugin.elementDefsRepo.concat(this._repository);
    });
  }

  registerPlugin(plugin) {
    this._converters = plugin.converters.concat(this._converters);
    this._repository = plugin.elementDefsRepo.concat(this._repository);
  }

  toMarkdown(source) {
    // source = this._replaceAll(
    //     //   source,
    //     //   "<uu5string.pre>",
    //     //   "<uu5string.pre><![CDATA["
    //     // );
    //     // source = this._replaceAll(
    //     //   source,
    //     //   "</uu5string.pre>",
    //     //   "]]></uu5string.pre>"
    //     // );
    //     //
    //     // source = "<root>" + source + "</root>";
    let dom = this._parser.parse(source);
    let nodes = this._bfsOrder(dom.documentElement);

    for (let i = nodes.length - 1; i >= 0; i--) {
      this._process(nodes[i]);
    }
    let output = this.getContent(dom.documentElement);

    return output
    .replace(/^[\t\r\n]+|[\t\r\n\s]+$/g, "")
    .replace(/\n\s+\n/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n");
  }

  /*
   * Flattens DOM tree into single array
   */
  _bfsOrder(node) {
    var inqueue = [node];
    var outqueue = [];
    var elem;
    var children;
    var i;

    while (inqueue.length > 0) {
      elem = inqueue.shift();
      outqueue.push(elem);
      children = elem.childNodes;
      for (i = 0; i < children.length; i++) {
        if (children[i].nodeType === 1) {
          inqueue.push(children[i]);
        }
      }
    }
    return outqueue;
  }

  /*
   * Finds a Markdown converter, gets the replacement, and sets it on
   * `_replacement`
   */
  _process(node, usedTags) {
    var replacement;
    var content = this.getContent(node);
    var rawContent = this.getRawContent(node);

    // Remove blank nodes
    /*    if (!node.isVoid(node)) {
       node._replacement = ''
       return
    }*/

    for (let i = 0; i < this._converters.length; i++) {
      let converter = this._converters[i];

      if (this._canConvert(node, converter.filter)) {
        /*        if(converter.elementDef){
          if(converter.elementDef.isVoid){
            node._rawContent = "";
            node._replacement = "";
            return;
          }
        }*/
        if (typeof converter.replacement !== "function") {
          throw new TypeError(
            "`replacement` needs to be a function that returns a string"
          );
        }

        let whitespace = this._flankingWhitespace(node, content);

        if (
          whitespace.leading ||
          whitespace.trailing ||
          this._repository.isTrimContent(node.nodeName)
        ) {
          content = content.trim();
        }
        replacement =
          whitespace.leading +
          converter.replacement.call(this, content, node, usedTags) +
          whitespace.trailing;
        break;
      }
    }
    node._rawContent = this.outer(node, rawContent);
    node._replacement = replacement;
  }

  _isFlankedByWhitespace(side, node) {
    var sibling;
    var regExp;
    var isFlanked;

    if (side === "left") {
      sibling = node.previousSibling;
      regExp = / $/;
    } else {
      sibling = node.nextSibling;
      regExp = /^ /;
    }

    if (sibling) {
      if (sibling.nodeType === 3) {
        isFlanked = regExp.test(sibling.nodeValue);
      } else if (sibling.nodeType === 1 && !this.isBlock(sibling)) {
        isFlanked = regExp.test(sibling.textContent);
      }
    }
    return isFlanked;
  }

  _flankingWhitespace(node, content) {
    var leading = "";
    var trailing = "";

    if (!this.isBlock(node)) {
      let hasLeading = /^[ \r\n\t]/.test(content);
      let hasTrailing = /[ \r\n\t]$/.test(content);

      if (hasLeading && !this._isFlankedByWhitespace("left", node)) {
        leading = " ";
      }
      if (hasTrailing && !this._isFlankedByWhitespace("right", node)) {
        trailing = " ";
      }
    }

    return {leading: leading, trailing: trailing};
  }

  isBlock(node) {
    return this._repository.isBlock(node.nodeName);
  }

  _canConvert(node, filter) {
    if (Array.isArray(filter)) {
      return filter.find(filter => this._canConvertInternal(node, filter));
    }
    return this._canConvertInternal(node, filter);
  }

  _canConvertInternal(node, filter) {
    if (typeof filter === "string") {
      return filter === node.nodeName;
    }
    if (Array.isArray(filter)) {
      return filter.indexOf(node.nodeName) !== -1;
    } else if (filter.checkTag) {
      return filter.checkTag(node);
    } else if (typeof filter === "function") {
      return filter.call(this, node);
    }
    throw new TypeError("`filter` needs to be a string, array, or function");
  }

  _replaceAll(string, what, replacement) {
    return string.split(what).join(replacement);
  }

  checkTag(tagname) {
    var tag = tagname.toUpperCase();

    return node => {
      var result = node.nodeName.toUpperCase() === tag;

      // if (result) {
      //   let attributeNames = node.getAttributeNames();
      //
      //   if (attributes) {
      //     for (let key in attributeNames) {
      //       result = result & (attributes.indexOf(attributeNames[key]) > -1);
      //       if (!result) {
      //         break;
      //       }
      //     }
      //   } else {
      //     result = result & attributeNames.length === 0;
      //   }
      // }

      return result;
    };
  }

  /*
   * Contructs a Markdown string of replacement text for a given node
   */
  getContent(node) {
    let text = "";
    let skipTextNodes = this._repository.isSkipTextNodes(node.nodeName);

    for (let i = 0; i < node.childNodes.length; i++) {
      let currentNode = node.childNodes[i];

      if (currentNode.nodeType === 1) {
        // ensure that pure HTML/UU5 blocks content will not be interpreted
        if (currentNode.noReplacement) {
          text += currentNode._rawContent;
        } else {
          text += currentNode._replacement;
        }
      } else if (currentNode.nodeType === 3) {
        // TODO Find way how to deal with pretty formatted UU5
        // TODO Ensure CDATA is working and uustring.pre and UU5.Bricks.Pre is working
        // let whitespace = this._flankingWhitespace(node.childNodes[i], node.childNodes[i].data);
        // text += whitespace.leading + node.childNodes[i].data.trim() + whitespace.trailing;
        let lastCharacter = text.slice(-1);
        let nodeData = currentNode.data;

        if (skipTextNodes) {
          continue;
        }

        // in UU5 string all consecutive whitespace characters are grouped into single space
        nodeData = nodeData.replace(/\s+/g, " ");
        if (
          (lastCharacter !== " " && !currentNode.previousSibling) ||
          this.isBlock(currentNode.previousSibling)
        ) {
          nodeData = nodeData.replace(/^\s+/, "");
        }
        if (!currentNode.nextSibling || this.isBlock(currentNode.nextSibling)) {
          nodeData = nodeData.replace(/\s+$/, "");
        }
        text += nodeData;
      } else {
        continue;
      }
    }
    return text;
  }

  /*
   * Contructs a Markdown string of replacement text for a given node
   */
  getRawContent(node) {
    var text = "";

    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeType === 1) {
        text += node.childNodes[i]._rawContent;
      } else if (node.childNodes[i].nodeType === 3) {
        text += node.childNodes[i].data;
      } else {
        continue;
      }
    }
    return text;
  }

  /*
   * Returns the HTML string of an element with its contents converted
   */

  outer(node, content) {
    let res = "<" + node.localName;

    for (let i = 0; i < node.attributes.length; i++) {
      let attribute = node.attributes[i];

      if (!attribute.noValue && attribute.value != undefined) {
        let quotChar = '"';

        if (attribute.value.indexOf('"') > -1) {
          if (attribute.value.indexOf("'") > -1) {
            console.error(
              `Attribute "{attribute.name}" with value "${
                attribute.value
                }"of element ${node.localName} contains ' and ".`
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
    if (content) {
      res += ">";
      res += content;
      res += "</" + node.localName + ">";
    } else {
      res += "/>";
    }

    return res;
  }
}
