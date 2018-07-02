import { section, sectionClose, sectionOpen } from "./md2uu5/section";

/**
 * Plugin for MarkdownRenderer that is part of uu5CodeKit.
 * @param renderer instance of MarkdownRenderer
 * @param opts options for this plugin. Currently no options are supported.
 */
export default function mdToUu5Plugin(renderer) {
  console.log("Initilaizing plugin");
  renderer.block.ruler.before("heading", "UU5.Bricks.Section", section);
  renderer.renderer.rules["section_open"] = sectionOpen;
  renderer.renderer.rules["section_close"] = sectionClose;
}
