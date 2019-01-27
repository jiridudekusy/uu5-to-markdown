import UuBookKitConverters from "./uu5-plugin/uuBookKit-plugin";
import uuBookKitMdPlugin from "./md-plugin/bookkit-md-uu5-plugin";

export default class Uu5BricksPlugin {
  constructor(opts) {
    this._opts = opts;
  }

  applyUu5Plugin(uu5ToMarkdown) {
    uu5ToMarkdown.registerPlugin(new UuBookKitConverters());
  }

  applyMarkdownPlugin(markdownRenderer) {
    markdownRenderer.use(uuBookKitMdPlugin);
  }
}
