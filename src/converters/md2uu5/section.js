const SECTION_MARKER = "{section}";
const SECTION_OPEN_REGEXP = /#+ \{section\}.*/;

/**
 * Block parser for UU5.Bricks.Section .
 *
 * The section is defined similar to the header:
 *
 * # {section} Section title
 * ...section content...
 *
 * {section}
 *
 * @param state
 * @param startLine
 * @param endLine
 * @param silent
 * @returns {boolean}
 */
function section(state, startLine, endLine, silent) {
  var ch,
    level,
    tmp,
    pos = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine];

  if (pos >= max) {
    return false;
  }

  ch = state.src.charCodeAt(pos);

  if (ch !== 0x23 /* # */ || pos >= max) {
    return false;
  }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23 /* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && ch !== 0x20) /* space */) {
    return false;
  }

  pos++;
  let posibleMarker = state.src.substring(pos, pos + SECTION_MARKER.length);

  if (posibleMarker !== SECTION_MARKER) {
    return false;
  }
  pos = pos + SECTION_MARKER.length;

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipCharsBack(max, 0x20, pos); // space
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20 /* space */) {
    max = tmp;
  }

  state.line = startLine + 1;

  let sectionHeader = state.src.slice(pos, max).trim();

  let nextLine = startLine + 1;
  let endRecoginzed = false;
  let contentEndLine;
  let innerSectionCounter = 0;

  for (; nextLine < endLine; nextLine++) {
    let line = state.getLines(nextLine, nextLine + 1, 0, false);

    if (SECTION_OPEN_REGEXP.test(line)) {
      innerSectionCounter++;
    }
    if (line === SECTION_MARKER) {
      // skip inner sections
      if (innerSectionCounter > 0) {
        innerSectionCounter--;
        continue;
      }
      contentEndLine = nextLine - 1;
      endRecoginzed = true;
      break;
    }
  }

  if (!endRecoginzed) {
    return false;
  }

  if (silent) {
    return true;
  }

  state.line = contentEndLine + 2;

  state.tokens.push({
    type: "section_open",
    hLevel: level,
    lines: [startLine, state.line],
    level: state.level,
    header: sectionHeader
  });

  state.line = startLine + 1;
  state.parser.tokenize(state, startLine + 1, contentEndLine, false);

  state.tokens.push({
    type: "section_close",
    hLevel: level,
    level: state.level
  });

  state.line = contentEndLine + 2;
  return true;
}

// rendering rules

function sectionOpen(tokens, idx) {
  return `<UU5.Bricks.Section header="${tokens[idx].header}">\n`;
}

function sectionClose(tokens, idx, options, env, renderer) {
  return "</UU5.Bricks.Section>" + renderer.getBreak(tokens, idx);
}

export { section, sectionOpen, sectionClose };
