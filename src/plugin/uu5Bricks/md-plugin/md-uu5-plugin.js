import { section, sectionClose, sectionOpen } from "./section";
import __list from "./override/list";
import __orderedListOpen from "./override/ordered-list-open";

/**
 * Plugin for MarkdownRenderer that is part of uu5CodeKit.
 * @param renderer instance of MarkdownRenderer
 * @param opts options for this plugin. Currently no options are supported.
 */
export default function mdToUu5Plugin(renderer) {
  console.log("Initilaizing plugin");
  renderer.block.ruler.before("heading", "UU5.Bricks.Section", section);
  renderer.block.ruler.before("list", "list_override", __list, {
    alt: ["paragraph", "blockquote"]
  });
  renderer.renderer.rules["section_open"] = sectionOpen;
  renderer.renderer.rules["section_close"] = sectionClose;
  renderer.renderer.rules["ordered_list_open"] = __orderedListOpen;
}
