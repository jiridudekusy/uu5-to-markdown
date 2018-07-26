import chai from "chai";
import MarkdownToUuBookKit from "../../src/markdown-to-uuBookKit";

const expect = chai.expect;

/**
 * Use test enderer because currently there is no tests with MarkdownRenderer from CodeKit.
 */
class TestMarkdownRenderer {
  render(md) {
    return md;
  }
}

let markdownToUuDocKit = new MarkdownToUuBookKit(new TestMarkdownRenderer());

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
    `{uuDocKit-pageCode} BusinessModel

paragraph content

{uuDocKit-partBreak}

# {section} Process Flow
Section content

{section}`,
    `{
  "code": "BusinessModel",
  "body": [
    "\\nparagraph content\\n",
    "\\n# {section} Process Flow\\nSection content\\n\\n{section}"
  ]
}`
  );
});
