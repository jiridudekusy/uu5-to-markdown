import UU5CodeKitConverters from "./uu5-plugin/uu5CodeKit-converters";

export default class Uu5CodeKitPlugin {
  constructor(opts) {
    this._opts = opts;
  }

  applyUu5Plugin(uu5ToMarkdown) {
    uu5ToMarkdown.registerPlugin(new UU5CodeKitConverters());
  }

  applyMarkdownPlugin(markdownRenderer) {}
}
