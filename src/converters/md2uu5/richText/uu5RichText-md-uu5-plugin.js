import { richtext, richTextRenderer } from "./richText";

export default function mdToUu5Plugin(renderer, opts) {
  console.log("Initilaizing richtext plugin");
  renderer.block.ruler.before(
    "code",
    "UU5.RichText.Block",
    (state, startLine, endLine, silent) =>
      richtext(state, startLine, endLine, silent, opts)
  );
  renderer.renderer.rules["UU5.RichText.Block"] = richTextRenderer;
}
