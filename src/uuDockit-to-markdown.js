export default class UuDocKitToMarkdown {
  constructor(uu5ToMarkdown) {
    this._uu5ToMarkdown = uu5ToMarkdown;
  }

  toMarkdown(dockitJsonString) {
    let uuDockitObject = JSON.parse(dockitJsonString);
    let res;

    res = '{uuDocKit-pageCode} ' + uuDockitObject.code + '\n\n';
    res += uuDockitObject.body.map(part => this._uu5ToMarkdown.toMarkdown(part)).join('\n\n{uuDocKit-partBreak}\n\n');

    return res;
  }
}
