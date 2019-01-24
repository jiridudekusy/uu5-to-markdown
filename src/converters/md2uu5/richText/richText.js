const RICHTEXT_OPEN_MARKER = "{richtext}";
const RICHTEXT_CLOSE_MARKER = "{/richtext}";

/**
 * Block parser for UU5.RichText.Block .
 *
 * The rich text block is using following signature:
 *
 * {richtext}
 * ...richtext content...
 *
 * {/richtext}
 *
 * @param state
 * @param startLine
 * @param endLine
 * @param silent
 * @returns {boolean}
 */
function richtext(state, startLine, endLine, silent, opts) {
  let pos = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine],
    contentEndLine;

  if (pos >= max) {
    return false;
  }

  let line = state.getLines(startLine, startLine + 1, 0, false);

  if (!line.startsWith(RICHTEXT_OPEN_MARKER)) {
    return false;
  }

  if (silent) {
    return true;
  }

  let nextLine = startLine + 1;
  let content = "";

  for (; nextLine < endLine; nextLine++) {
    let line = state.getLines(nextLine, nextLine + 1, 0, false);

    if (line.trim() === RICHTEXT_CLOSE_MARKER) {
      contentEndLine = nextLine - 1;
      break;
    }
    content += line + "\n";
  }

  state.line = contentEndLine + 2;

  // convert md subcontent to uu5string
  let uu5content = opts.markdownToUu5.render(content, state.env);

  state.tokens.push({
    type: "UU5.RichText.Block",
    uu5string: uu5content
  });
  return true;
}

// rendering rules
function escapeUU5string(uu5string) {
  return uu5string.replace(/([^\\])"/g, '$1\\"');
}

function prepareRichTextUU5String(uu5string, escape = true) {
  let res = uu5string
    .replace(/<UU5.Bricks.P>/g, "<UU5.Bricks.Div>")
    .replace(/<\/UU5.Bricks.P>/g, "</UU5.Bricks.Div>");
  if (escape) {
    res = escapeUU5string(res);
  }
  return res;
}

function richTextRenderer(tokens, idx, options, env) {
  if (env.previewMode) {
    return `<UU5.Bricks.Div>${prepareRichTextUU5String(
      tokens[idx].uu5string,
      false
    )}</UU5.Bricks.Div>\n`;
  } else {
    return `<UU5.RichText.Block uu5string="${prepareRichTextUU5String(
      tokens[idx].uu5string
    )}"/>\n`;
  }
}

export { richtext, richTextRenderer };
