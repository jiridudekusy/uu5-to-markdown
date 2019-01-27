"use strict";
import { ElementDef, ElementsDefRepo } from "../../../converters/element.js";

export default class UU5RichTextKitConverters {
  constructor() {
    let uu5RichTextBlock = new ElementDef(
      "UU5.RichText.Block",
      "uu5string"
    ).block();

    this._elementDefsRepo = new ElementsDefRepo(uu5RichTextBlock);

    this._converters = [
      {
        filter: uu5RichTextBlock,
        replacement: function(content, node) {
          let cnt = node.getAttribute("uu5string");
          cnt = cnt.replace(/<UU5.Bricks.Div>/g, "<UU5.Bricks.P>");
          cnt = cnt.replace(/<\/UU5.Bricks.Div>/g, "</UU5.Bricks.P>");
          let mdCnt;
          mdCnt = this.toMarkdown(cnt);
          let res = "\n\n{richtext}\n";
          res += mdCnt;
          res += "\n\n{/richtext}\n";
          return res;
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
