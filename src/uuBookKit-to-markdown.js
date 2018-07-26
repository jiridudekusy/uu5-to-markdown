export default class UuBookKitToMarkdown {
  constructor(uu5ToMarkdown) {
    this._uu5ToMarkdown = uu5ToMarkdown;
  }

  toMarkdown(bookKitJsonString) {
    let uuDockitObject = JSON.parse(bookKitJsonString);
    let res;

    res = "{uuBookKit-pageCode} " + uuDockitObject.code + "\n";
    //TODO check if needed...probably not.
    // if (!Array.isArray(uuDockitObject.body)) {
    //   uuDockitObject.body = [uuDockitObject.body];
    // }
    res += uuDockitObject.body
      .map(
        part =>
          `\n{uuBookKit-part}{:"code":"${part.code}", "rev": ${
            part.sys.rev
          }}\n` + this._uu5ToMarkdown.toMarkdown(part.content)
      )
      .join("\n");

    return res;
  }
}
