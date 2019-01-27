"use strict";
import { ElementDef, ElementsDefRepo } from "../../../converters/element.js";

export default class UU5CodeKitConverters {
  constructor() {
    let uu5BricksCodeViewer = new ElementDef("UU5.CodeKit.CodeViewer").block();

    this._elementDefsRepo = new ElementsDefRepo(uu5BricksCodeViewer);

    this._converters = [
      // Code viewer blocks
      // TODO je tady potreba jeste zpracovat entity (&lt; atd.). uu5string to schroupe oboji
      // TODO CodeKit by bylo idealni vytahnout do pluginu
      {
        filter: function(node) {
          let res = this.checkTag("UU5.Codekit.CodeViewer", ["mode", "key"])(
            node
          );

          if (res) {
            res = this.checkTag("uu5string.pre")(
              Array.prototype.filter
                .call(node.childNodes, child => child.nodeType === 1)
                .find(() => true)
            );
          }
          return res;
        },
        replacement: function(content, node) {
          var mode = node.getAttribute("mode");
          let uu5preContent = Array.prototype.filter
            .call(node.childNodes, child => child.nodeType === 1)
            .find(() => true).textContent;

          mode = mode || "";
          return "\n\n```" + mode + "\n" + uu5preContent + "\n```\n";
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
