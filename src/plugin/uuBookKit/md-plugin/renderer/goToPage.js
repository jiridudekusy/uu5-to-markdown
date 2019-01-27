import {
  escapeHtml,
  replaceEntities
} from "../../../../tools/markdownRenderer/mdRendererUtils";
// override default rendering rules from codeKit
let link_open = function(tokens, idx, options, env) {
  let href = escapeHtml(tokens[idx].href);
  let title = tokens[idx].title
    ? escapeHtml(replaceEntities(tokens[idx].title))
    : "";
  if (href.startsWith("book:")) {
    env.bookLink = true;
    return `<UuBookKit.Bricks.GoToPageLink page="${href.substring(
      5
    )}">${title}`;
  }
  let target = options.linkTarget ? ' target="' + options.linkTarget + '"' : "";
  return `<UU5.Bricks.Link href="${href}"${
    title ? ' title="' + title + '"' : ""
  }${target}>`;
};

let link_close = function(tokens, idx, options, env) {
  if (env.bookLink) {
    env.bookLink = false;
    return "</UuBookKit.Bricks.GoToPageLink>";
  }
  return "</UU5.Bricks.Link>";
};

export { link_open, link_close };
