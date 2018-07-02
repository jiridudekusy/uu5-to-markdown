export default class UU5Parser {
  constructor() {
    // use xmldom parser from node_modules instead of the one in browser
    let DOMParser = require("xmldom-uu5").DOMParser;

    this._parser = new DOMParser();
  }

  parse(source) {
    // do mot use any specific type
    //    application/xml has problem with <> in attributes
    //    text/html has lower cased element s etc.
    return this._parser.parseFromString(source);
  }
}
