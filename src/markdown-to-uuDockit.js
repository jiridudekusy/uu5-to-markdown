import { pd } from "./tools/markdownRenderer/pretty-data";

const PAGE_CODE_RE = /^\{uuDocKit-pageCode\} *([^\n]*)\n/;

export default class MarkdownToUuDocKit {
  constructor(makrdownRenderer) {
    this._markDownRenderer = makrdownRenderer;
  }

  toUu5(markdown, pretty) {
    let markdownTmp = markdown;
    let pageCodeSearch = PAGE_CODE_RE.exec(markdownTmp);
    if (pageCodeSearch) {
      markdownTmp = markdownTmp.replace(PAGE_CODE_RE, "");
    }

    let dockitMdParts = markdownTmp.split("\n{uuDocKit-partBreak}\n");
    let res = dockitMdParts
      .map(mdPart => this._markDownRenderer.render(mdPart))
      .map(part => part.substring("<uu5string/>".length))
      .map(part => (pretty ? pd.xml(part) : part))
      .join(
        "\n\n<div hidden>Part end(uu5string does not support comments)</div>\n\n"
      );

    return "<uu5string/>" + res;
  }

  toUuDocKit(markdown, pretty) {
    let uuDockitObject = {
      code: "",
      body: []
    };
    let markdownTmp = markdown;
    let pageCodeSearch = PAGE_CODE_RE.exec(markdownTmp);

    if (pageCodeSearch) {
      uuDockitObject.code = pageCodeSearch[1];
      markdownTmp = markdownTmp.replace(PAGE_CODE_RE, "");
    }

    let dockitMdParts = markdownTmp.split("\n{uuDocKit-partBreak}\n");

    uuDockitObject.body = dockitMdParts
      .map(mdPart => this._markDownRenderer.render(mdPart))
      .map(part => (pretty ? pd.xml(part) : part));
    return JSON.stringify(uuDockitObject, null, 2);
  }
}
