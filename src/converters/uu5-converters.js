'use strict';
import {ElementDef, ElementsDefRepo} from './element.js';

function cell(content, node) {
  var index = Array.prototype.filter.call(node.parentNode.childNodes, (child) => child.nodeType === 1).indexOf(node);
  var prefix = ' ';

  if (index === 0) {
    prefix = '| ';
  }
  return prefix + content + ' |';
}

export default class UU5Converters {

  constructor() {
    let uu5string = new ElementDef('uu5string').void();
    let uu5BricksP = new ElementDef('UU5.Bricks.P').block();
    let uu5BricksStrong = new ElementDef('UU5.Bricks.Strong').leaf();
    let uu5BricksEm = new ElementDef('UU5.Bricks.Em').leaf();
    let uu5BricksLink = new ElementDef('UU5.Bricks.Link').leaf();
    let uu5BricksHeader = new ElementDef('UU5.Bricks.Header').block();
    let uu5BricksSection = new ElementDef('UU5.Bricks.Section').block();
    let uu5stringPre = new ElementDef('uu5string.pre').block();
    let uu5BricksCodeViewer = new ElementDef('UU5.CodeKit.CodeViewer').block();
    let uu5BricksCode = new ElementDef('UU5.Bricks.Code').leaf();
    let uu5BricksBlockquote = new ElementDef('UU5.Bricks.Blockquote').block();
    let uu5BricksOl = new ElementDef('UU5.Bricks.Ol').block().skipTextNodes();
    let uu5BricksUl = new ElementDef('UU5.Bricks.Ul').block().skipTextNodes();
    let uu5BricksTable = new ElementDef('UU5.Bricks.Table').block().skipTextNodes();
    let uu5BricksTableTHead = new ElementDef('UU5.Bricks.Table.THead').block().skipTextNodes();
    let uu5BricksTableTBody = new ElementDef('UU5.Bricks.Table.TBody').block().skipTextNodes();
    let uu5BricksTableTFoot = new ElementDef('UU5.Bricks.Table.TFoot').block().skipTextNodes();
    let uu5BricksTableTr = new ElementDef('UU5.Bricks.Table.Tr').leaf().skipTextNodes();
    let uu5BricksTableTh = new ElementDef('UU5.Bricks.Table.Th').leaf();
    let uu5BricksTableTd = new ElementDef('UU5.Bricks.Table.Td').leaf();

    this._elementDefsRepo = new ElementsDefRepo(
      uu5string,
      uu5BricksP,
      uu5BricksStrong,
      uu5BricksEm,
      uu5BricksLink,
      uu5BricksHeader,
      uu5BricksSection,
      uu5stringPre,
      uu5BricksCodeViewer,
      uu5BricksCode,
      uu5BricksBlockquote,
      uu5BricksOl,
      uu5BricksUl,
      uu5BricksTable,
      uu5BricksTableTHead,
      uu5BricksTableTBody,
      uu5BricksTableTFoot,
      uu5BricksTableTr,
      uu5BricksTableTh,
      uu5BricksTableTd);

    this._converters = [
      {
        filter: 'root',
        replacement: function (content) {
          return '';
        }
      },
      {
        filter: uu5string,
        replacement: function (content) {
          return '';
        }
      },
      {
        filter: uu5BricksP,
        replacement: function (content) {
          return '\n\n' + content + '\n\n';
        }
      },
      {
        filter: function (node) {
          let result = this.checkTag('UU5.Bricks.Header', ['level'])(node);

          return result & (node.getAttribute('level') <= 7);
        },
        replacement: function (content, node) {
          var hLevel = node.getAttribute('level');
          var hPrefix = '';

          for (let i = 0; i < hLevel; i++) {
            hPrefix += '#';
          }
          return '\n\n' + hPrefix + ' ' + content + '\n\n';
        }
      },
      {
        filter: uu5BricksEm,
        replacement: function (content) {
          return '*' + content + '*';
        }
      },
      {
        filter: uu5BricksStrong,
        replacement: function (content) {
          return '**' + content + '**';
        }
      },

      // Inline code
      {
        filter: function (node) {
          let hasSiblings = node.previousSibling || node.nextSibling;
          let isCodeBlock = this.checkTag('UU5.Bricks.Pre')(node.parentNode) && !hasSiblings;

          return this.checkTag('UU5.Bricks.Code')(node) && !isCodeBlock;
        },
        replacement: function (content) {
          return '`' + content + '`';
        }
      },

      // Code blocks
      {
        filter: function (node) {
          return this.checkTag('UU5.Bricks.Pre')(node) && this.checkTag('UU5.Bricks.Code')(
            node.firstChild);
        },
        replacement: function (content, node) {
          return '\n\n    ' + node.firstChild.textContent.replace(/\n/g, '\n    ') + '\n\n';
        }
      },
      {
        filter: function (node) {
          return this.checkTag('UU5.Bricks.Link', ['href', 'target', 'title'])(node) && node.getAttribute('href');
        },
        replacement: function (content, node) {
          var titlePart = node.getAttribute('title') ? ' "' + node.getAttribute('title') + '"' : '';
          var target = node.getAttribute('target') ? '{:target="' + node.getAttribute('target') + '"}' : '';

          return '[' + content + '](' + node.getAttribute('href') + titlePart + ')' + target;
        }
      },
      {
        filter: function (node) {
          return this.checkTag('UU5.Bricks.Blockquote')(node);
        },
        replacement: function (content) {
          content = content.trim();
          content = content.replace(/\n{3,}/g, '\n\n');
          content = content.replace(/^/gm, '> ');
          return '\n\n' + content + '\n\n';
        }
      },
      {
        filter: function (node) {
          return this.checkTag('UU5.Bricks.Li')(node);
        },
        replacement: function (content, node) {
          let prefix = '*   ';
          let parent = node.parentNode;

          content = content.replace(/^\s+/, '').replace(/\n/gm, '\n    ');
          if (parent.nodeName === 'UU5.Bricks.Ol') {
            let start = parent.getAttribute('start');
            let index = Array.prototype.filter.call(parent.childNodes, n => n.nodeName === 'UU5.Bricks.Li').indexOf(node);

            prefix = (start ? Number(start) + index : index + 1) + '.  ';
          }

          return prefix + content;
        }
      },
      {
        filter: function (node) {
          return this.checkTag('UU5.Bricks.Ul')(node) || this.checkTag('UU5.Bricks.Ol')(node);
        },
        replacement: function (content, node) {
          var strings = [];

          Array.prototype.filter.call(node.childNodes, item => item.nodeType === 1).forEach(item => strings.push(item._replacement));
          if (/UU5.Bricks.Li/i.test(node.parentNode.nodeName)) {
            return '\n' + strings.join('\n');
          }
          return '\n\n' + strings.join('\n') + '\n\n';
        }
      },
      {
        filter: [uu5BricksTableTh, uu5BricksTableTd],
        replacement: function (content, node) {
          return cell(content, node);
        }
      },

      {
        filter: uu5BricksTableTr,
        replacement: function (content, node) {
          var borderCells = '';
          var alignMap = {left: ':--', right: '--:', center: ':-:'};

          if (node.parentNode.nodeName === uu5BricksTableTHead.name) {
            for (let i = 0; i < node.childNodes.length; i++) {
              let align;
              // TODO Fix table align
              // let align = node.childNodes[i].attributes.align;
              let border = '---';

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
          return '\n' + content + (borderCells ? '\n' + borderCells : '');
        }
      },

      {
        filter: uu5BricksTable,
        replacement: function (content) {
          return '\n\n' + content + '\n\n';
        }
      },

      {
        filter: [uu5BricksTableTHead, uu5BricksTableTBody, uu5BricksTableTFoot],
        replacement: function (content) {
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

