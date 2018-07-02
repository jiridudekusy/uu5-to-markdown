import Setup from "./tools/setup";
import chai from "chai";
import CodeKit from "uu5codekitg01";
import mdToUu5Plugin from "../../src/converters/md-uu5-plugin";

chai.expect();

const expect = chai.expect;

let markdownToUu5 = new CodeKit.MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
markdownToUu5.use(mdToUu5Plugin);

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
