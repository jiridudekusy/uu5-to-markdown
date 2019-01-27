import Setup from "../../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../../src/uu5-to-markdown.js";
import Uu5CodeKitPlugin from "../../../src/plugin/uu5CodeKit/uu5CodeKit-plugin";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts);
let uu5CodeKitPlugin = new Uu5CodeKitPlugin();
uu5CodeKitPlugin.applyUu5Plugin(uu5ToMarkdown);
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyUu5Plugin(uu5ToMarkdown);

function uu5ToMdTest(name, uu5string, mdString) {
  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });
}

describe("Uu5.Bricks.CodeViewer", () => {
  uu5ToMdTest(
    "code block",
    [
      "<UU5.CodeKit.CodeViewer><uu5string.pre>def hello_world",
      "  # 42 < 9001",
      '  "Hello world!"',
      "end</uu5string.pre></UU5.CodeKit.CodeViewer>"
    ].join("\n"),
    [
      "```",
      "def hello_world",
      "  # 42 < 9001",
      '  "Hello world!"',
      "end",
      "```"
    ].join("\n")
  );

  uu5ToMdTest(
    "multiple code blocks",
    [
      "<UU5.CodeKit.CodeViewer><uu5string.pre>def foo",
      "  # 42 < 9001",
      "  'Hello world!'",
      "end</uu5string.pre></UU5.CodeKit.CodeViewer>",
      "<UU5.Bricks.P>next:</UU5.Bricks.P>",
      "<UU5.CodeKit.CodeViewer><uu5string.pre>def bar",
      "  # 42 < 9001",
      "  'Hello world!'",
      "end</uu5string.pre></UU5.CodeKit.CodeViewer>"
    ].join("\n"),
    [
      "```",
      "def foo",
      "  # 42 < 9001",
      "  'Hello world!'",
      "end",
      "```",
      "",
      "next:",
      "",
      "```",
      "def bar",
      "  # 42 < 9001",
      "  'Hello world!'",
      "end",
      "```"
    ].join("\n")
  );
  uu5ToMdTest(
    "code block in pretty format",
    `
    <UU5.CodeKit.CodeViewer>
      <uu5string.pre>def hello_world
  # 42 < 9001
  "Hello world!"
end</uu5string.pre>
</UU5.CodeKit.CodeViewer>`,
    [
      "```",
      "def hello_world",
      "  # 42 < 9001",
      '  "Hello world!"',
      "end",
      "```"
    ].join("\n")
  );
});
