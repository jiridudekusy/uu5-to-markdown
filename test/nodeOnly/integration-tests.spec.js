import Setup from "../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../src/uu5-to-markdown.js";
import UU5CodeKitConverters from "../../src/converters/uu5CodeKit-converters.js";
import UuBookKitPlugin from "../../src/converters/uuBookKit-plugin.js";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(
  opts,
  new UU5CodeKitConverters(),
  new UuBookKitPlugin()
);

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
