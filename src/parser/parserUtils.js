export default class ParserUtils {
  static getChildNodes(node) {
    if(!node || !node.childNodes){
      return [];
    }
    return Array.prototype.filter.call(
      node.childNodes,
      item => item.nodeType === 1
    );
  }

  static getXml(node) {
    let res = "<" + node.localName;

    for (let i = 0; i < node.attributes.length; i++) {
      let quotChar = '"';
      let attribute = node.attributes[i];

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
    }
    if (node.childNodes.length > 0) {
      res += ">";
      res += ParserUtils.getXmlContent(node);
      res += "</" + node.localName + ">";
    } else {
      res += "/>";
    }

    return res;
  }

  static getXmlContent(node) {
    let res = "";

    for (let i = 0; i < node.childNodes.length; i++) {
      let currentNode = node.childNodes[i];

      if (currentNode.nodeType === 1) {
        res += ParserUtils.getXml(currentNode);
      } else if (currentNode.nodeType === 3) {
        res += currentNode.data;
      } else {
        throw new Error("Not supported.");
      }
    }

    return res;
  }

  static hasOnlyTextContent(node) {
    return !Array.prototype.find.call(
      node.childNodes,
      item => item.nodeType !== 3
    );
  }

  static hasOneElement(node) {
    return ParserUtils.getChildNodes(node).length === 1;
  }

  static getOneElement(node) {
    return ParserUtils.getChildNodes(node)[0];
  }
}
