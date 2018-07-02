import { link_open, link_close } from "./renderer/goToPage";

/**
 * Plugin for MarkdownRenderer that is part of uu5CodeKit.
 * @param renderer instance of MarkdownRenderer
 * @param opts options for this plugin. Currently no options are supported.
 */
export default function bookKitMdToUu5Plugin(renderer) {
  renderer.renderer.rules["link_open"] = link_open;
  renderer.renderer.rules["link_close"] = link_close;
}
