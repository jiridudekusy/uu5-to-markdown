import UU5Utils from "../tools/uu5utils";
import { replaceEntities } from "../tools/markdownRenderer/mdRendererUtils";

export default class UU5StringParser {
  constructor(opts) {
    if (!opts || !opts.uu5Core) {
      throw "options for UU5StringParser must contains UU5.Core  set to property uu5Core";
    }
    this.Core = opts.uu5Core;
  }

  parseFromString(uu5String) {
    if (!uu5String.trim().startsWith("<uu5string/>")) {
      uu5String = "<uu5string/>" + uu5String;
    }
    let UU5String = this.Core.Common.UU5String;
    let uu5stringObject = new UU5String(uu5String);

    let node = new Node();
    node.setElementAttributes("root");
    node.setChildren(
      uu5stringObject.content.map(UU5StringParser._uu5ComponentToNode)
    );
    return { documentElement: node };
  }

  static _uu5ComponentToNode(uu5stringObject) {
    if (
      typeof uu5stringObject === "string" ||
      uu5stringObject instanceof String
    ) {
      let node = new Node();
      node.setTextAttributes(uu5stringObject);
      return node;
    }

    let node = new Node();
    node.setElementAttributes(uu5stringObject.tag, uu5stringObject.props.props);

    if (uu5stringObject.children) {
      node.setChildren(
        uu5stringObject.children.map(UU5StringParser._uu5ComponentToNode)
      );
    }
    return node;
  }
}

class Node {
  constructor() {
    this.childNodes = [];
    this.attributes = [];
  }

  setElementAttributes(tagName, attributes) {
    this.nodeType = 1;
    this.localName = tagName;
    this.nodeName = tagName;
    //TODO convert attributes
    //{name, value, noValue}
    if (attributes) {
      this.attributes = attributes.map(this._transformAttribute).filter(a => a);
    }
  }

  _transformAttribute(attr) {
    let res = {
      name: attr.name
    };
    if (attr.valueType === "uu5json") {
      res.value = UU5Utils.toUU5Json(attr.value);
    } else if (typeof attr.value === "string" || attr.value instanceof String) {
      res.value = replaceEntities(attr.value);
    } else if (attr.value === true) {
      res.noValue = true;
    } else if (attr.value === false) {
      return null;
    } else if (attr.valueType === "uu5string") {
      res.value = UU5Utils.toUU5String(attr.value);
    } else if (attr.value != null && attr.value != undefined) {
      res.value = attr.value.toString();
    } else {
      res.value = attr.value;
    }
    return res;
  }

  setTextAttributes(text) {
    this.nodeType = 3;
    this.data = replaceEntities(text);
  }

  setChildren(children) {
    let lastItem;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      child.parentNode = this;
      child.previousSibling = lastItem;
      if (lastItem) {
        lastItem.nextSibling = child;
      }
      lastItem = child;
      this.childNodes.push(child);
    }
  }

  hasChildNodes() {
    return !!this.childNodes;
  }

  getAttribute(name) {
    let attr = this.getAttributeNode(name);
    if (attr) {
      return attr.value;
    }
    return null;
  }

  getAttributeNode(name) {
    for (let attribute of this.attributes) {
      if (attribute.name === name) {
        return attribute;
      }
    }
    return null;
  }

  hasAttribute(name) {
    for (let attribute of this.attributes) {
      if (attribute.name === name) {
        return true;
      }
    }
    return false;
  }

  get firstChild() {
    if (this.childNodes) {
      return this.childNodes[0];
    }
    return null;
  }

  get lastChild() {
    if (this.childNodes) {
      return this.childNodes[this.childNodes.length - 1];
    }
    return null;
  }

  get textContent() {
    let res = "";
    for (let child of this.childNodes) {
      if (child.nodeType === 1) {
        return null;
      }
      res += child.data;
    }
    return res;
  }

  //alt, title
}
