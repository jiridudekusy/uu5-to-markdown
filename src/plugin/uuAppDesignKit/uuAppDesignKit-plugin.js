import UuAppDesignKitConverters from "./uu5-plugin/uuAppDesignKit-converters";
import designKitMdPlugin from "./md-plugin/designKit-md-uu5-plugin";
import designKitAlgorithmMdPlugin from "./md-plugin/designKit-algorithm-md-uu5-plugin";
import UUAppDesignKitAlgorithmConverter from "./uu5-plugin/uuAppDesignKit-algorithm-converter";

export default class UuAppDesignKitPlugin {
  constructor(opts) {
    this._opts = opts;
  }

  applyUu5Plugin(uu5ToMarkdown) {
    uu5ToMarkdown.registerPlugin(new UuAppDesignKitConverters());
    uu5ToMarkdown.registerPlugin(new UUAppDesignKitAlgorithmConverter());
  }

  applyMarkdownPlugin(markdownRenderer) {
    markdownRenderer.use(
      designKitMdPlugin,
      Object.assign({ markdownToUu5: markdownRenderer }, this._opts)
    );
    markdownRenderer.use(
      designKitAlgorithmMdPlugin,
      Object.assign({ markdownToUu5: markdownRenderer }, this._opts)
    );
  }
}
