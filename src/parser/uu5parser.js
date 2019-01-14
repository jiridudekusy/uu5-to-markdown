import UU5StringParser from "./uu5StringParser";

export default class UU5Parser {
  constructor(opts) {
    // use xmldom parser from node_modules instead of the one in browser
    // let DOMParser = require("xmldom-uu5").DOMParser;
    //
    // this._parser = new DOMParser();
    this._parser = new UU5StringParser(opts);
  }

  parse(source) {
    // do mot use any specific type
    //    application/xml has problem with <> in attributes
    //    text/html has lower cased element s etc.
    return this._parser.parseFromString(source);
  }
}
