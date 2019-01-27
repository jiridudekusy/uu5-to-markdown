import Setup from "../../withUU5/tools/setup";
Setup();
import chai from "chai";
import {MarkdownRenderer} from "uu5codekitg01";
import UuBookKitPlugin from "../../../src/plugin/uuBookKit/uuBookKit-plugin";

const expect = chai.expect;

let markdownToUu5 = new MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
let uuBookKitPlugin = new UuBookKitPlugin();
uuBookKitPlugin.applyMarkdownPlugin(markdownToUu5);

function mdToUu5Test(name, mdString, uu5String) {
  it(name, () => {
    let parsed = markdownToUu5.render(mdString);

    expect(parsed).to.be.equal(uu5String);
  });
}

describe("UuBookKit", () => {
  describe("UuBookKit.Bricks.GoToPageLink", () => {
    mdToUu5Test(
      "with label",
      '[Common Schemas](book:usyLibraDataMngOper_helpers_schemas)',
      '<uu5string/><UU5.Bricks.P><UuBookKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas">Common Schemas</UuBookKit.Bricks.GoToPageLink></UU5.Bricks.P>\n'
    );
    mdToUu5Test(
      "without content",
      '[](book:usyLibraDataMngOper_helpers_schemas)',
      '<uu5string/><UU5.Bricks.P><UuBookKit.Bricks.GoToPageLink page="usyLibraDataMngOper_helpers_schemas"></UuBookKit.Bricks.GoToPageLink></UU5.Bricks.P>\n'
    );
  });
});
