"use strict";
import { ElementsDefRepo } from "./element.js";
import { ElementDef } from "./element";

export default class UuBookKitPlugin {
  constructor() {
    let gotoPageLinkBookkit = new ElementDef(
      "UuDocKit.Bricks.GoToPageLink",
      "page",
      "label"
    ).leaf();
    let gotoPageLink = new ElementDef(
      "UuBookKit.Bricks.GoToPageLink",
      "page",
      "label"
    ).leaf();
    this._elementDefsRepo = new ElementsDefRepo(gotoPageLink);
    this._converters = [
      {
        // override UU5.Bricks.Header converter to lower the level by one
        filter: function(node) {
          let result = this.checkTag("UU5.Bricks.Header", ["level"])(node);
          let level = node.getAttribute("level");

          return result & (level <= 8);
        },
        replacement: function(content, node) {
          var hLevel = node.getAttribute("level");
          var hPrefix = "";

          hLevel--;
          if (hLevel === 0) {
            return "\n\n" + this.outer(node, content) + "\n\n";
          }
          for (let i = 0; i < hLevel; i++) {
            hPrefix += "#";
          }
          return "\n\n" + hPrefix + " " + content + "\n\n";
        }
      },
      {
        filter: function(node) {
          return (
            gotoPageLink.checkTag(node) || gotoPageLinkBookkit.checkTag(node)
          );
        },
        replacement: function(content, node) {
          let label = node.getAttribute("label")
            ? node.getAttribute("label")
            : content;
          return `[${label}](book:${node.getAttribute("page")})`;
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
