import Setup from "../../withUU5/tools/setup";
import chai from "chai";
import {MarkdownRenderer} from "uu5codekitg01";
import mdToUu5Plugin from "../../../src/plugin/uu5Bricks/md-plugin/md-uu5-plugin";
import Uu5RichTextPlugin from "../../../src/plugin/uu5RichText/uu5RichText-plugin"
import Core from "uu5g04-core";

Setup();

chai.expect();

const expect = chai.expect;

let markdownToUu5 = new MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
let uu5RichTextPlugin = new Uu5RichTextPlugin({uu5Core: Core});
markdownToUu5.use(mdToUu5Plugin);
uu5RichTextPlugin.applyMarkdownPlugin(markdownToUu5);

function mdToUu5Test(name, mdString, uu5String, env) {
  it(name, () => {
    let parsed = markdownToUu5.render(mdString, env);

    expect(parsed).to.be.equal(uu5String);
  });
}

describe("UU5.RichText.Block", () => {
  mdToUu5Test(
    "with link in first column, text in desc",
    `{richtext}
Test text with **strong.** Normal text.

*   Li with \`code\`
*   another li with
    *   nested list
    *   and another element
*   3rd li
*   4th li

[Link text](linkHref)

{/richtext}`,
    String.raw`<uu5string/><UU5.RichText.Block uu5string="<uu5string/><UU5.Bricks.Div>Test text with <UU5.Bricks.Strong>strong.</UU5.Bricks.Strong> Normal text.</UU5.Bricks.Div>
<UU5.Bricks.Ul>
<UU5.Bricks.Li>Li with <UU5.Bricks.Code>code</UU5.Bricks.Code></UU5.Bricks.Li>
<UU5.Bricks.Li>another li with
<UU5.Bricks.Ul>
<UU5.Bricks.Li>nested list</UU5.Bricks.Li>
<UU5.Bricks.Li>and another element</UU5.Bricks.Li>
</UU5.Bricks.Ul></UU5.Bricks.Li>
<UU5.Bricks.Li>3rd li</UU5.Bricks.Li>
<UU5.Bricks.Li>4th li</UU5.Bricks.Li>
</UU5.Bricks.Ul>
<UU5.Bricks.Div><UU5.Bricks.Link href=\"linkHref\">Link text</UU5.Bricks.Link></UU5.Bricks.Div>
"/>
`);
  mdToUu5Test(
    "richtext in previewMode",
    `{richtext}
Test text with **strong.** Normal text.

*   Li with \`code\`
*   another li with
    *   nested list
    *   and another element
*   3rd li
*   4th li

[Link text](linkHref)

{/richtext}`,
    String.raw`<uu5string/><UU5.Bricks.Div><uu5string/><UU5.Bricks.Div>Test text with <UU5.Bricks.Strong>strong.</UU5.Bricks.Strong> Normal text.</UU5.Bricks.Div>
<UU5.Bricks.Ul>
<UU5.Bricks.Li>Li with <UU5.Bricks.Code>code</UU5.Bricks.Code></UU5.Bricks.Li>
<UU5.Bricks.Li>another li with
<UU5.Bricks.Ul>
<UU5.Bricks.Li>nested list</UU5.Bricks.Li>
<UU5.Bricks.Li>and another element</UU5.Bricks.Li>
</UU5.Bricks.Ul></UU5.Bricks.Li>
<UU5.Bricks.Li>3rd li</UU5.Bricks.Li>
<UU5.Bricks.Li>4th li</UU5.Bricks.Li>
</UU5.Bricks.Ul>
<UU5.Bricks.Div><UU5.Bricks.Link href="linkHref">Link text</UU5.Bricks.Link></UU5.Bricks.Div>
</UU5.Bricks.Div>
`, {previewMode: true});
});
