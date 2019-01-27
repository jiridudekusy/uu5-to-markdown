import UuAppDesignKitConverters from "./uu5-plugin/uuAppDesignKit-converters";
import designKitMdPlugin from "./md-plugin/designKit-md-uu5-plugin";

export default class UuAppDesignKitPlugin {
  constructor(opts) {
    this._opts = opts;
  }

  applyUu5Plugin(uu5ToMarkdown) {
    uu5ToMarkdown.registerPlugin(new UuAppDesignKitConverters());
  }

  applyMarkdownPlugin(markdownRenderer) {
    markdownRenderer.use(
      designKitMdPlugin,
      Object.assign({ markdownToUu5: markdownRenderer }, this._opts)
    );
  }
}
