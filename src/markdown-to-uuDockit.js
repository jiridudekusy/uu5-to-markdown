const PAGE_CODE_RE = /^\{uuDocKit-pageCode\} *([^\n]*)\n/;

export default class MarkdownToUuDocKit {
  constructor(makrdownRenderer) {
    this._markDownRenderer = makrdownRenderer;
  }

  toUu5(markdown) {
    let dockitMdParts = markdown.split("\n{uuDocKit-partBreak}\n");
    let res = dockitMdParts
      .map(mdPart => this._markDownRenderer.render(mdPart))
      .map(part => part.substring("<uu5string/>".length))
      .join("\n");

    return "<uu5string/>" + res;
  }

  toUuDocKit(markdown) {
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

    uuDockitObject.body = dockitMdParts.map(mdPart =>
      this._markDownRenderer.render(mdPart)
    );
    return JSON.stringify(uuDockitObject, null, 2);
  }
}
