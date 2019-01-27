import Setup from "../../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../../src/uu5-to-markdown.js";
import UuBookKitPlugin from "../../../src/plugin/uuBookKit/uuBookKit-plugin";
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};


const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts);
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyUu5Plugin(uu5ToMarkdown);
let uuBookKitPlugin = new UuBookKitPlugin();
uuBookKitPlugin.applyUu5Plugin(uu5ToMarkdown);

function uu5ToMdTest(name, uu5string, mdString) {
  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });
}

describe("uuDockit-plugin", () => {
  describe("UU5.Bricks.Header", () => {
    uu5ToMdTest(
      "level 1 - invalid heading",
      '<UU5.Bricks.Header level="1">Hello world</UU5.Bricks.Header>',
      '<UU5.Bricks.Header level="1">Hello world</UU5.Bricks.Header>'
    );
    uu5ToMdTest(
      "level 3",
      '<UU5.Bricks.Header level="3">Hello world</UU5.Bricks.Header>',
      "## Hello world"
    );
    uu5ToMdTest(
      "level 6",
      '<UU5.Bricks.Header level="6">Hello world</UU5.Bricks.Header>',
      "##### Hello world"
    );
    uu5ToMdTest(
      "level 4 with Em",
      '<UU5.Bricks.Header level="4"><UU5.Bricks.Em>Hello</UU5.Bricks.Em> world</UU5.Bricks.Header>',
      "### *Hello* world"
    );
    uu5ToMdTest(
      "level 9 - invalid heading",
      '<UU5.Bricks.Header level="9">Hello world</UU5.Bricks.Header>',
      '<UU5.Bricks.Header level="9">Hello world</UU5.Bricks.Header>'
    );
  });

  describe("UuBookKit.Bricks.GoToPageLink", () => {
    uu5ToMdTest(
      "with label",
      '<UuBookKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas" label="Common Schemas"/>',
      '[Common Schemas](book:usyLibraDataMngOper_helpers_schemas)'
    );
    uu5ToMdTest(
      "with content",
      '<UuBookKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas">Common Schemas</UuBookKit.Bricks.GoToPageLink>',
      '[Common Schemas](book:usyLibraDataMngOper_helpers_schemas)'
    );
    uu5ToMdTest(
      "with empty content",
      '<UuBookKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas"> \t\n</UuBookKit.Bricks.GoToPageLink>',
      '[](book:usyLibraDataMngOper_helpers_schemas)'
    );
    uu5ToMdTest(
      "withoutContentAndLAbel",
      '<UuBookKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas"/>',
      '[](book:usyLibraDataMngOper_helpers_schemas)'
    );
  });
  describe("UuBookKit.Bricks.GoToPageLink", () => {
    uu5ToMdTest(
      "with label",
      '<UuDocKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas" label="Common Schemas"/>',
      '[Common Schemas](book:usyLibraDataMngOper_helpers_schemas)'
    );
  });
});
