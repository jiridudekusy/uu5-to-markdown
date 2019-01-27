import Uu5Converters from "./uu5-plugin/uu5-converters";
import uu5MdPlugin from "./md-plugin/md-uu5-plugin";

export default class Uu5BricksPlugin {
  constructor(opts) {
    this._opts = opts;
  }

  applyUu5Plugin(uu5ToMarkdown) {
    uu5ToMarkdown.registerPlugin(new Uu5Converters());
  }

  applyMarkdownPlugin(markdownRenderer) {
    markdownRenderer.use(uu5MdPlugin);
  }
}
