import * as DesignKitHelper from './designkit-helpers';
import UuAppDesignKitConverterConfiguration from '../../uuAppDesignKitConverterConfiguration';

/**
 * Plugin for MarkdownRenderer that is part of uu5CodeKit.
 * @param renderer instance of MarkdownRenderer
 * @param opts options for this plugin. Currently no options are supported.
 */
export default function mdToUu5Plugin(renderer, opts) {
  UuAppDesignKitConverterConfiguration.forEach((cfg) => {
    renderer.block.ruler.before('code', cfg.tagName, DesignKitHelper.createListToTableDesignKitJsonDesignKit(cfg, opts));
    renderer.renderer.rules[cfg.tagName] = DesignKitHelper.createDesignKitRenderer(cfg.tagName, opts);
  });
}

