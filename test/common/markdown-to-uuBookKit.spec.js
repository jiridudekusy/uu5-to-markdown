import Setup from "../withUU5/tools/setup";
Setup()
import chai from "chai";
import MarkdownToUuBookKit from "../../src/markdown-to-uuBookKit";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};

const expect = chai.expect;

/**
 * Use test enderer because currently there is no tests with MarkdownRenderer from CodeKit.
 */
class TestMarkdownRenderer {
  render(md) {
    return md;
  }
}

let markdownToUuDocKit = new MarkdownToUuBookKit(new TestMarkdownRenderer(), opts);

function markdownToUuDocKitTest(name, mdString, uuDockitString) {
  it(name, () => {
    let parsed = markdownToUuDocKit.toUuDocKit(mdString, false);

    expect(parsed).to.be.equal(uuDockitString);
  });
}

describe("markdownToUuDocKit", () => {
  // tests currently use test MarkdownRenderer which just returns input markdown string
  markdownToUuDocKitTest(
    "default",
    `{uuBookKit-pageCode} BusinessModel

{uuBookKit-part}{:"code":"abcd", "rev": 1}
paragraph content

{uuBookKit-part}{:"code":"efgh", "rev": 3}
# {section} Process Flow
Section content

{section}`,
    `{
  "code": "BusinessModel",
  "sectionList": [
    {
      "code": "abcd",
      "sys": {
        "rev": 1
      },
      "content": "paragraph content\\n"
    },
    {
      "code": "efgh",
      "sys": {
        "rev": 3
      },
      "content": "# {section} Process Flow\\nSection content\\n\\n{section}"
    }
  ]
}`
  );
  markdownToUuDocKitTest(
    "new section",
    `{uuBookKit-pageCode} BusinessModel

{uuBookKit-part}
paragraph content
`,
    `{
  "code": "BusinessModel",
  "sectionList": [
    {
      "content": "paragraph content\\n"
    }
  ]
}`
  );
});
