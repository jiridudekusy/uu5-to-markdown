export default class UU5Parser {
  constructor() {
    // todo this is only for nodeJs ?
    if (typeof DOMParser === 'function') {
      this._parser = new DOMParser();
    } else {
      let DOMParser = require('xmldom').DOMParser;

      this._parser = new DOMParser();
    }
  }

  parse(source) {
    return this._parser.parseFromString(source, 'application/xml');
  }
}
