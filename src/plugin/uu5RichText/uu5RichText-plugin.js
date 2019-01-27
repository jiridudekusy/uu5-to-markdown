import UU5RichTextKitConverters from "./uu5-plugin/uu5RichText-converters";
import richtextMdPlugin from "./md-plugin/uu5RichText-md-uu5-plugin";

export default class Uu5RichTextPlugin {
  constructor(opts) {
    this._opts = opts;
  }

  applyUu5Plugin(uu5ToMarkdown) {
    uu5ToMarkdown.registerPlugin(new UU5RichTextKitConverters());
  }

  applyMarkdownPlugin(markdownRenderer) {
    markdownRenderer.use(
      richtextMdPlugin,
      Object.assign({ markdownToUu5: markdownRenderer }, this._opts)
    );
  }
}
