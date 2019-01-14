"use strict";
import { ElementDef, ElementsDefRepo } from "./element.js";
import UU5Utils from "../tools/uu5utils";
import UuAppDesignKitConverterConfiguration from "./uuAppDesignKitConverterConfiguration";

export default class UuAppDesignKitConverters {
  constructor() {
    let that = this;

    this._elementDefsRepo = new ElementsDefRepo();

    this._converters = [];

    UuAppDesignKitConverterConfiguration.forEach(cfg => {
      let attributes = ["data"];

      if (cfg.attributes) {
        attributes = attributes.concat(cfg.attributes);
      }

      let def = new ElementDef(cfg.tagName, ...attributes).block();

      this._elementDefsRepo.addElementDef(def);
      this._converters.push({
        filter: def,
        replacement: function(content, node) {
          return that._tableJsonToListDesignKitContent(
            content,
            node,
            this,
            cfg
          );
        }
      });
    });
    // let scenarioDef = new ElementDef(
    //   "UuApp.DesignKit.Scenario",
    //   "data",
    //   "header",
    //   "footer"
    // )
    //   .block()
    //   .skipTextNodes();
    // this._elementDefsRepo.addElementDef(scenarioDef);
    // this._converters.push({
    //   filter: scenarioDef,
    //   replacement: function(content, node) {
    //     let jsonString = node.getAttribute("data");
    //     console.log(jsonString);
    //     return "";
    //   }
    // });
  }

  _tableJsonToListDesignKitContent(content, node, uu5ToMd, transformation) {
    let jsonString = node.getAttribute("data");

    if (!UU5Utils.isUU5Json(jsonString)) {
      throw new Error(`String '${jsonString}' is not valid uu5json.`);
    }
    jsonString = jsonString.replace(/-/g, "\\\\-");

    let data = UU5Utils.parseJson(jsonString);
    let res = [
      transformation.marker + this._getAttributes(node, transformation)
    ];
    const lineStart = "*   ";

    for (let i = 0; i < data.length; i++) {
      let line = lineStart;
      let jsonRow = data[i];

      if (transformation.columns) {
        for (let j = 0; j < jsonRow.length; j++) {
          let defIndex = j;
          if (transformation.dynamicColumns) {
            defIndex =
              transformation.columns.length > j
                ? j
                : transformation.columns.length - 1;
          }
          let columnDef = transformation.columns[defIndex];
          let prefix = "";

          if (columnDef.indent) {
            prefix = new Array(columnDef.indent + 1).join("    ");
          }
          line = prefix + lineStart;
          line += this._getDesignKitContent(
            jsonRow[j],
            columnDef.linkSupported,
            columnDef.name,
            uu5ToMd
          );
          res.push(line);
        }
      } else if (transformation.singleColumn) {
        let columnDef = transformation.singleColumn;

        line = lineStart;

        line += this._getDesignKitContent(
          jsonRow,
          columnDef.linkSupported,
          columnDef.name,
          uu5ToMd
        );
        res.push(line);
      } else if (transformation.items) {
        let itemDef = transformation.items[i];

        line = lineStart;

        line += this._getDesignKitContent(
          jsonRow,
          itemDef.linkSupported,
          itemDef.name,
          uu5ToMd
        );
        res.push(line);
      } else {
        throw "Undefined component transformation strategy.";
      }
    }
    let resString = res.join("\n");

    return `\n\n${resString}\n\n`;
  }

  _getAttributes(node, transformation) {
    if (!transformation.attributes || transformation.attributes.length === 0) {
      return "";
    }

    let attributes = {};

    for (let attribute of transformation.attributes) {
      if (node.hasAttribute(attribute)) {
        if (!node.getAttributeNode(attribute).noValue) {
          attributes[attribute] = node.getAttribute(attribute);
        } else {
          attributes[attribute] = null;
        }
      }
    }
    if (Object.keys(attributes).length > 0) {
      return JSON.stringify(attributes).replace(/^\{/, "{:");
    }
    return "";
  }

  _getDesignKitContent(cnt, linkSupported, name, uu5ToMd) {
    let res;

    if (UU5Utils.isUU5String(cnt)) {
      let uu5String = uu5ToMd.toMarkdown(cnt);

      res = uu5String;
    } else {
      if (linkSupported && Array.isArray(cnt)) {
        res = `[${cnt[1]}](${cnt[0]})`;
      } else {
        res = cnt;
      }
    }
    res = res.replace(/^\s+/, "").replace(/\n/gm, "\n        ");
    if (name) {
      res = `${name}: ${res}`;
    }
    return res;
  }

  get elementDefsRepo() {
    return this._elementDefsRepo;
  }

  get converters() {
    return this._converters;
  }
}
