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
          let columnDef = transformation.columns[j];
          let prefix = "";

          if (columnDef.indent) {
            prefix = new Array(columnDef.indent + 1).join("    ");
          }
          line = prefix + lineStart;

          line += this._getDesignKitContent(
            jsonRow[j],
            columnDef.linkSupported,
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
          uu5ToMd
        );
        res.push(line);
      } else if (transformation.items) {
        let itemDef = transformation.items[i];

        line = lineStart;

        line += this._getDesignKitContent(
          jsonRow,
          itemDef.linkSupported,
          uu5ToMd
        );
        res.push(line);
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
        attributes[attribute] = node.getAttribute(attribute);
      }
    }
    if (Object.keys(attributes).length > 0) {
      return JSON.stringify(attributes).replace(/^\{/, "{:");
    }
    return "";
  }

  _getDesignKitContent(cnt, linkSupported, uu5ToMd) {
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
    return res;
  }

  get elementDefsRepo() {
    return this._elementDefsRepo;
  }

  get converters() {
    return this._converters;
  }
}
