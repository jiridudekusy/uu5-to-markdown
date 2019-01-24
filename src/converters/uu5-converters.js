"use strict";
import { ElementDef, ElementsDefRepo } from "./element.js";

function cell(content, node) {
  var index = Array.prototype.filter
    .call(node.parentNode.childNodes, child => child.nodeType === 1)
    .indexOf(node);
  var prefix = " ";

  if (index === 0) {
    prefix = "| ";
  }
  return prefix + content + " |";
}

function isSingleLsi(node, uu5BricksLsi, uu5BricksLsiItem) {
  let valid = uu5BricksLsi.checkTag(node);
  if (!valid) {
    return false;
  }
  let lsiItemCount = 0;
  for (let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.nodeType === 3) {
      // text nodes are not cells
      continue;
    }
    if (!uu5BricksLsiItem.checkTag(child)) {
      return false;
    }
    lsiItemCount++;
  }
  if (lsiItemCount > 1) {
    return false;
  }
  return true;
}

export default class UU5Converters {
  constructor() {
    let root = new ElementDef("root").void().skipTextNodes();
    let uu5string = new ElementDef("uu5string").void().skipTextNodes();
    let uu5BricksP = new ElementDef("UU5.Bricks.P").block();
    let uu5BricksStrong = new ElementDef("UU5.Bricks.Strong").leaf();
    let uu5BricksEm = new ElementDef("UU5.Bricks.Em").leaf();
    let uu5BricksLink = new ElementDef(
      "UU5.Bricks.Link",
      "href",
      "target",
      "title"
    ).leaf();
    let uu5BricksHeader = new ElementDef("UU5.Bricks.Header", "level").block();
    let uu5BricksSection = new ElementDef(
      "UU5.Bricks.Section",
      "header",
      "footer"
    ).block();
    let uu5stringPre = new ElementDef("uu5string.pre").block();
    let uu5BricksPre = new ElementDef("UU5.Bricks.Pre").block();
    let uu5BricksCodeViewer = new ElementDef("UU5.CodeKit.CodeViewer").block();
    let uu5BricksCode = new ElementDef("UU5.Bricks.Code").leaf();
    let uu5BricksBlockquote = new ElementDef("UU5.Bricks.Blockquote").block();
    let uu5BricksOl = new ElementDef("UU5.Bricks.Ol").block().skipTextNodes();
    let uu5BricksUl = new ElementDef("UU5.Bricks.Ul").block().skipTextNodes();
    let uu5BricksLi = new ElementDef("UU5.Bricks.Li").block();
    let uu5BricksTable = new ElementDef("UU5.Bricks.Table")
      .block()
      .skipTextNodes();
    let uu5BricksTableTHead = new ElementDef("UU5.Bricks.Table.THead")
      .block()
      .skipTextNodes();
    let uu5BricksTableTBody = new ElementDef("UU5.Bricks.Table.TBody")
      .block()
      .skipTextNodes();
    let uu5BricksTableTFoot = new ElementDef("UU5.Bricks.Table.TFoot")
      .block()
      .skipTextNodes();
    let uu5BricksTableTr = new ElementDef("UU5.Bricks.Table.Tr")
      .leaf()
      .skipTextNodes();
    let uu5BricksTableTh = new ElementDef("UU5.Bricks.Table.Th").leaf();
    let uu5BricksTableTd = new ElementDef("UU5.Bricks.Table.Td").leaf();
    let uu5BricksLsi = new ElementDef("UU5.Bricks.Lsi").block().skipTextNodes();
    let uu5BricksLsiItem = new ElementDef("UU5.Bricks.Lsi.Item", "language")
      .block()
      .skipTextNodes();

    this._elementDefsRepo = new ElementsDefRepo(
      uu5string,
      uu5BricksP,
      uu5BricksStrong,
      uu5BricksEm,
      uu5BricksLink,
      uu5BricksHeader,
      uu5BricksSection,
      uu5stringPre,
      uu5BricksPre,
      uu5BricksCodeViewer,
      uu5BricksCode,
      uu5BricksBlockquote,
      uu5BricksOl,
      uu5BricksUl,
      uu5BricksLi,
      uu5BricksTable,
      uu5BricksTableTHead,
      uu5BricksTableTBody,
      uu5BricksTableTFoot,
      uu5BricksTableTr,
      uu5BricksTableTh,
      uu5BricksTableTd,
      uu5BricksLsi,
      uu5BricksLsiItem
    );

    this._converters = [
      {
        filter: root,
        replacement: function() {
          return "";
        }
      },
      {
        elementDef: uu5string,
        filter: uu5string,
        replacement: function() {
          return "";
        }
      },
      {
        filter: uu5BricksP,
        replacement: function(content) {
          return "\n\n" + content + "\n\n";
        }
      },
      {
        filter: function(node) {
          let result = uu5BricksHeader.checkTag(node);

          return result & (node.getAttribute("level") <= 7);
        },
        replacement: function(content, node) {
          var hLevel = node.getAttribute("level");
          var hPrefix = "";

          for (let i = 0; i < hLevel; i++) {
            hPrefix += "#";
          }
          return "\n\n" + hPrefix + " " + content + "\n\n";
        }
      },
      {
        filter: function(node) {
          let valid = uu5BricksSection.checkTag(node);
          if (valid) {
            //footer is put by default by uuDcc,however this library supports only empty footer
            if (node.hasAttribute("footer")) {
              return node.getAttribute("footer") === "";
            }
          }
          return valid;
        },
        replacement: function(content, node) {
          let header = node.getAttribute("header");

          return `\n\n# {section} ${header}\n${content}\n\n{section}\n\n`;
        }
      },
      {
        filter: uu5BricksEm,
        replacement: function(content) {
          if(!content){
            return " ";
          }
          return "*" + content + "*";
        }
      },
      {
        filter: uu5BricksStrong,
        replacement: function(content) {
          if(!content){
            return " ";
          }
          return "**" + content + "**";
        }
      },

      // Inline code
      {
        filter: function(node) {
          let hasSiblings = node.previousSibling || node.nextSibling;
          let isCodeBlock =
            uu5BricksPre.checkTag(node.parentNode) && !hasSiblings;

          return uu5BricksCode.checkTag(node) && !isCodeBlock;
        },
        replacement: function(content) {
          return "`" + content + "`";
        }
      },

      // Code blocks
      {
        filter: function(node) {
          // TODO Check if there isnt any problem in case of text nodes
          return (
            uu5BricksPre.checkTag(node) &&
            uu5BricksCode.checkTag(node.firstChild)
          );
        },
        replacement: function(content, node) {
          return (
            "\n\n    " +
            node.firstChild.textContent.replace(/\n/g, "\n    ") +
            "\n\n"
          );
        }
      },
      {
        filter: function(node) {
          return uu5BricksLink.checkTag(node) && node.getAttribute("href");
        },
        replacement: function(content, node) {
          let titlePart = node.getAttribute("title")
            ? ' "' + node.getAttribute("title") + '"'
            : "";
          let target = node.getAttribute("target")
            ? '{:target="' + node.getAttribute("target") + '"}'
            : "";

          return (
            "[" +
            content +
            "](" +
            node.getAttribute("href") +
            titlePart +
            ")" +
            target
          );
        }
      },
      {
        filter: uu5BricksBlockquote,
        replacement: function(content) {
          content = content.trim();
          content = content.replace(/\n{3,}/g, "\n\n");
          content = content.replace(/^/gm, "> ");
          return "\n\n" + content + "\n\n";
        }
      },
      {
        filter: uu5BricksLi,
        replacement: function(content, node) {
          let prefix = "*   ";
          let parent = node.parentNode;

          content = content.replace(/^\s+/, "").replace(/\n/gm, "\n    ");
          if (parent.nodeName === uu5BricksOl.name) {
            let index = Array.prototype.filter
              .call(parent.childNodes, n => n.nodeName === uu5BricksLi.name)
              .indexOf(node);
            prefix = index + 1 + ".  ";
            prefix = prefix.slice(0, 4);
          }

          return prefix + content;
        }
      },
      {
        filter: function(node) {
          return uu5BricksUl.checkTag(node) || uu5BricksOl.checkTag(node);
        },
        replacement: function(content, node) {
          var strings = [];

          Array.prototype.filter
            .call(node.childNodes, item => item.nodeType === 1)
            .forEach(item => strings.push(item._replacement));
          if (uu5BricksLi.name === node.parentNode.nodeName) {
            return "\n" + strings.join("\n");
          }
          return "\n\n" + strings.join("\n") + "\n\n";
        }
      },
      {
        filter: [uu5BricksTableTh, uu5BricksTableTd],
        replacement: function(content, node) {
          return cell(content, node);
        }
      },

      {
        filter: uu5BricksTableTr,
        replacement: function(content, node) {
          var borderCells = "";
          var alignMap = { left: ":--", right: "--:", center: ":-:" };

          if (node.parentNode.nodeName === uu5BricksTableTHead.name) {
            for (let i = 0; i < node.childNodes.length; i++) {
              let align;
              // TODO Fix table align
              // let align = node.childNodes[i].attributes.align;
              let border = "---";

              if (node.childNodes[i].nodeType === 3) {
                // text nodes are not cells
                continue;
              }

              if (align) {
                border = alignMap[align.value] || border;
              }

              borderCells += cell(border, node.childNodes[i]);
            }
          }
          return "\n" + content + (borderCells ? "\n" + borderCells : "");
        }
      },

      {
        filter: uu5BricksTable,
        replacement: function(content) {
          return "\n\n" + content + "\n\n";
        }
      },

      {
        filter: [uu5BricksTableTHead, uu5BricksTableTBody, uu5BricksTableTFoot],
        replacement: function(content) {
          return content;
        }
      },

      {
        filter: function(node) {
          return isSingleLsi(node, uu5BricksLsi, uu5BricksLsiItem);
        },
        replacement: function(content) {
          return content;
        }
      },
      {
        filter: function(node) {
          return (
            uu5BricksLsiItem.checkTag(node) &&
            isSingleLsi(node.parentNode, uu5BricksLsi, uu5BricksLsiItem)
          );
        },
        replacement: function(content) {
          return content;
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
