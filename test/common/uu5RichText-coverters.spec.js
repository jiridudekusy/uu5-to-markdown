import Setup from "../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../src/uu5-to-markdown.js";
import UU5RichTextKitConverters from "../../src/converters/uu5RichText-converters.js";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};
chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts,new UU5RichTextKitConverters());

function uu5ToMdTest(name, uu5string, mdString) {
  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });
}

describe("Uu5.RichText.Block", () => {
  uu5ToMdTest(
    "richtext with strong and code",
    `<UU5.RichText.Block uu5string="<uu5string/><UU5.Bricks.Div>Test <UU5.Bricks.Strong>with strong</UU5.Bricks.Strong> text and <UU5.Bricks.Code>code</UU5.Bricks.Code>.</UU5.Bricks.Div>"/>`,
    `{richtext}
Test **with strong** text and \`code\`.

{/richtext}`
  );

  uu5ToMdTest(
    "richtext lists and complex formatting",
    String.raw`<UU5.RichText.Block uu5string="<uu5string/><UU5.Bricks.Div>Test text with <UU5.Bricks.Strong>strong.</UU5.Bricks.Strong> Normal text.</UU5.Bricks.Div><UU5.Bricks.Ul><UU5.Bricks.Li>Li with <UU5.Bricks.Code>code</UU5.Bricks.Code></UU5.Bricks.Li><UU5.Bricks.Li>another li with<UU5.Bricks.Ul><UU5.Bricks.Li>nested list</UU5.Bricks.Li><UU5.Bricks.Li>and another element</UU5.Bricks.Li></UU5.Bricks.Ul></UU5.Bricks.Li><UU5.Bricks.Li>3rd li</UU5.Bricks.Li><UU5.Bricks.Li>4th li</UU5.Bricks.Li></UU5.Bricks.Ul><UU5.Bricks.Div><UU5.Bricks.Link href=\"linkHref\">Link text</UU5.Bricks.Link></UU5.Bricks.Div>"/>`,
    `{richtext}
Test text with **strong.** Normal text.

*   Li with \`code\`
*   another li with
    *   nested list
    *   and another element
*   3rd li
*   4th li

[Link text](linkHref)

{/richtext}`
  );

});
