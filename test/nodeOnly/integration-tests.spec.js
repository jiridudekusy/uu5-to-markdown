import Setup from "../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../src/uu5-to-markdown.js";
import UuBookKitPlugin from "../../src/plugin/uuBookKit/uuBookKit-plugin";
import Uu5BricksPlugin from "../../src/plugin/uu5Bricks/uu5Bricks-plugin";
import Uu5CodeKitPlugin from "../../src/plugin/uu5CodeKit/uu5CodeKit-plugin";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts);
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyUu5Plugin(uu5ToMarkdown);
let uuBookKitPlugin = new UuBookKitPlugin();
uuBookKitPlugin.applyUu5Plugin(uu5ToMarkdown);
let uu5CodeKitPlugin = new Uu5CodeKitPlugin();
uu5CodeKitPlugin.applyUu5Plugin(uu5ToMarkdown);

function uu5FileTest(name, uu5stringFile, mdStringFile) {
  let fs = require("fs");
  let uu5string = fs.readFileSync(
    "./test/nodeOnly/data/" + uu5stringFile,
    "utf8"
  );
  let mdString = fs.readFileSync(
    "./test/nodeOnly/data/" + mdStringFile,
    "utf8"
  );

  // remove the latest \n from mdString, since IntelliJ always put \n to the end of MD file
  mdString = mdString.slice(0, -1);

  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });
}

describe("whole document", () => {
  uu5FileTest("common md", "sdm-design.uu5", "sdm-design.md");
  // uu5FileTest('with section', 'terre-business-summary-integration.uu5', 'sdm-design.md');
});
