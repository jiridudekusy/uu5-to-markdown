import Setup from "../../withUU5/tools/setup";
Setup()
import chai from "chai";
import {MarkdownRenderer} from "uu5codekitg01";
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";

chai.expect();

const expect = chai.expect;

let markdownToUu5 = new MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyMarkdownPlugin(markdownToUu5);

function mdToUu5Test(name, mdString, uu5String) {
  it(name, () => {
    let parsed = markdownToUu5.render(mdString);

    expect(parsed).to.be.equal(uu5String);
  });
}

describe("UU5.Bricks.Section", () => {
  mdToUu5Test(
    "default",
    `# {section} My Header
Some text

{section}`,
    `<uu5string/><UU5.Bricks.Section header="My Header">
<UU5.Bricks.P>Some text</UU5.Bricks.P>
</UU5.Bricks.Section>
`
  );
});

describe("UU5.Bricks.Ol - type A", () => {
  mdToUu5Test(
    "default",
    `
A.  Item 1
B.  Item 2
C.  Item 3`,
    `<uu5string/><UU5.Bricks.Ol type="A">
<UU5.Bricks.Li>Item 1</UU5.Bricks.Li>
<UU5.Bricks.Li>Item 2</UU5.Bricks.Li>
<UU5.Bricks.Li>Item 3</UU5.Bricks.Li>
</UU5.Bricks.Ol>
`
  );
});
