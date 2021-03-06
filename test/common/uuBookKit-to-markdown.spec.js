import Setup from "../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../src/uu5-to-markdown.js";
import UuDockitToMarkdown from "../../src/uuBookKit-to-markdown";
import Core from "uu5g04-core";
import Uu5BricksPlugin from "../../src/plugin/uu5Bricks/uu5Bricks-plugin";
const opts = {uu5Core: Core};
chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts);
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyUu5Plugin(uu5ToMarkdown);
let uuDockitToMarkdown = new UuDockitToMarkdown(uu5ToMarkdown);

function uuDockitToMdTest(name, uuDockitString, mdString) {
  it(name, () => {
    let parsed = uuDockitToMarkdown.toMarkdown(uuDockitString);
    expect(parsed).to.be.equal(mdString);
  });
}

describe("uuDockitToMarkdown", () => {
  uuDockitToMdTest(
    "default",
    `{
  "code": "BusinessModel",
  "body": [
    {     
      "code":"abcd",
      "sys" : {
        "rev": 1
      },
      "content":"<uu5string/><UU5.Bricks.P>paragraph content</UU5.Bricks.P>"
    },
    {
      "code":"efgh",
      "sys" : {
        "rev": 3
      },
      "content":"<uu5string/>\\n  \\n    <UU5.Bricks.Section header=\\"Process Flow\\">\\n      Section content \\n    </UU5.Bricks.Section>    \\n      \\n\\n    \\n"
    }
  ]
}`,
    `{uuBookKit-pageCode} BusinessModel

{uuBookKit-part}{:"code":"abcd", "rev": 1}
paragraph content

{uuBookKit-part}{:"code":"efgh", "rev": 3}
# {section} Process Flow
Section content

{section}`
  );
});
