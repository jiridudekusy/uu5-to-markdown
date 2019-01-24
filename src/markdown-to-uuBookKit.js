import UU5Pertifier from "./uu5-prettifyer";

const PAGE_CODE_RE = /^\{uuBookKit-pageCode\} *([^\n]*)\n/;

const PART_MARKER = "{uuBookKit-part}";

export default class MarkdownToUuBookKit {
  constructor(makrdownRenderer, options) {
    this._markDownRenderer = makrdownRenderer;
    this._uu5pertifier = new UU5Pertifier(options);
  }

  toUu5(markdown, pretty, env) {
    let markdownTmp = markdown;
    let pageCodeSearch = PAGE_CODE_RE.exec(markdownTmp);
    if (pageCodeSearch) {
      markdownTmp = markdownTmp.replace(PAGE_CODE_RE, "");
    }

    let parts = this._getParts(markdown);

    let res = parts
      .map(mdPart => this._markDownRenderer.render(mdPart.content, env))
      .map(part => part.substring("<uu5string/>".length))
      .map(part => (pretty ? this._uu5pertifier.prettify(part) : part))
      .join(
        "\n\n<div hidden>Part end(uu5string does not support comments)</div>\n\n"
      );

    return "<uu5string/>" + res;
  }

  _getParts(markdown) {
    let parts = [];
    let lines = markdown.split("\n");
    let part;
    for (let line of lines) {
      if (line.startsWith(PART_MARKER)) {
        line = line.replace(PART_MARKER, "").trim();
        line = line.replace("{:", "{");
        let params;
        if (line.length > 0) {
          params = JSON.parse(line);
        }
        if (part) {
          parts.push(part);
        }
        if (params) {
          part = {
            code: params.code,
            sys: {
              rev: params.rev
            },
            lines: []
          };
        } else {
          part = {
            lines: []
          };
        }
      } else if (part) {
        part.lines.push(line);
      }
    }

    if (part) {
      parts.push(part);
    }

    parts = parts.map(part => {
      return {
        code: part.code,
        sys: part.sys,
        content: part.lines.join("\n")
      };
    });
    return parts;
  }

  toUuDocKit(markdown, pretty, env) {
    let uuBookKitObject = {
      code: "",
      sectionList: []
    };
    let markdownTmp = markdown;
    let pageCodeSearch = PAGE_CODE_RE.exec(markdownTmp);

    if (pageCodeSearch) {
      uuBookKitObject.code = pageCodeSearch[1];
      markdownTmp = markdownTmp.replace(PAGE_CODE_RE, "");
    }

    let parts = this._getParts(markdownTmp);

    uuBookKitObject.sectionList = parts
      .map(mdPart =>
        Object.assign(mdPart, {
          content: this._markDownRenderer.render(mdPart.content, env)
        })
      )
      .map(part =>
        pretty?Object.assign(part, {
            content: this._uu5pertifier.prettify(part).content
          }):part
      );
    return JSON.stringify(uuBookKitObject, null, 2);
  }
}
