class ElementDef {
  constructor(name, ...attributes) {
    this.name = name;
    this.attributes = attributes;
    this.caseSensitive(true);
    this.leaf(true);
    this.skipTextNodes(false);
  }

  caseSensitive(aCaseSensitive) {
    this.isCaseSensitive = aCaseSensitive;
    return this;
  }

  block(isBlock = true) {
    this.isBlock = isBlock;
    if (isBlock) {
      this.leaf(false);
      this.void(false);
    }
    return this;
  }

  trimContent(trimContent = true) {
    this._trimContent = trimContent;
    return this;
  }

  get isTrimContent() {
    return this._trimContent !== undefined ? this._trimContent : !this.isBlock;
  }

  leaf(isLeaf = true) {
    this.isLeaf = isLeaf;
    return this;
  }

  skipTextNodes(skip = true) {
    this.isSkipTextNodes = skip;
    return this;
  }

  void(isVoid = true) {
    this.isVoid = isVoid;
    return this;
  }

  checkTag(node) {
    let result;

    if (this.isCaseSensitive) {
      result = this.name === node.localName;
    } else {
      result = this.name.toUpperCase() === node.nodeName.toUpperCase();
    }
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
  }
}

class ElementsDefRepo {
  constructor(...defs) {
    this._repository = {};
    defs.forEach(def => this.addElementDef(def));
  }

  addElementDef(elementDef) {
    let key = elementDef.name.toLowerCase();

    this._repository[key] = elementDef;
  }

  isTrimContent(elementName) {
    let elemDef = this._repository[elementName.toLowerCase()];

    if (!elemDef) {
      return true;
    }

    return elemDef.isTrimContent;
  }

  isBlock(elementName) {
    let elemDef = this._repository[elementName.toLowerCase()];

    if (!elemDef) {
      return false;
    }
    return elemDef.isBlock;
  }

  isSkipTextNodes(elementName) {
    let elemDef = this._repository[elementName.toLowerCase()];

    if (!elemDef) {
      return false;
    }
    return elemDef.isSkipTextNodes;
  }

  isLeaf(elementName) {
    let elemDef = this._repository[elementName.toLowerCase()];

    if (!elemDef) {
      return true;
    }
    return elemDef.isLeaf;
  }

  isVoid(elementName) {
    let elemDef = this._repository[elementName.toLowerCase()];

    if (!elemDef) {
      return false;
    }
    return elemDef.isVoid;
  }

  concat(elementDefRepo) {
    let res = [];

    for (let key in this._repository) {
      res.push(this._repository[key]);
    }

    for (let key in elementDefRepo._repository) {
      res.push(elementDefRepo._repository[key]);
    }

    return new ElementsDefRepo(...res);
  }
}

export {ElementDef, ElementsDefRepo};

