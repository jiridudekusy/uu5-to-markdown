import chai from "chai";
import UU5ToMarkdown from "../../src/uu5-to-markdown.js";
import UuDockitToMarkdown from "../../src/uuBookKit-to-markdown";

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown();
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
