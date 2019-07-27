let { UU5ToMarkdown } = require("../lib/uu5-to-markdown");
let { UuBookKitToMarkdown } = require("../lib/uu5-to-markdown");
let { UuAppDesignKitConverters } = require("../lib/uu5-to-markdown");
let { UuBookKitPlugin } = require("../lib/uu5-to-markdown");
let fs = require("fs");

/*
Helper test script to check if certain uuBookKit JSOn can be parsed.
*/

let uu5ToMarkdown = new UU5ToMarkdown(
  new UuBookKitPlugin(),
  new UuAppDesignKitConverters()
);
let uuDockitToMarkdown = new UuBookKitToMarkdown(uu5ToMarkdown);
let uu5string = fs.readFileSync("./tools/data.json", "utf8");
let md = uuDockitToMarkdown.toMarkdown(uu5string);
console.log(md);
