'use strict';
import {ElementsDefRepo} from './element.js';

export default class UUDockitPlugin {

  constructor() {
    this._elementDefsRepo = new ElementsDefRepo();
    this._converters = [
      {
        // override UU5.Bricks.Header converter to lower the level by one
        filter: function (node) {
          let result = this.checkTag('UU5.Bricks.Header', ['level'])(node);
          let level = node.getAttribute('level');

          return result & (level <= 8);
        },
        replacement: function (content, node) {
          var hLevel = node.getAttribute('level');
          var hPrefix = '';

          hLevel--;
          if (hLevel === 0) {
            return '\n\n' + this.outer(node, content) + '\n\n';
          }
          for (let i = 0; i < hLevel; i++) {
            hPrefix += '#';
          }
          return '\n\n' + hPrefix + ' ' + content + '\n\n';
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

