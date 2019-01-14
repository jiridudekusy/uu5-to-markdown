import Setup from "./tools/setup";
Setup();
import chai from "chai";
import {MarkdownRenderer} from "uu5codekitg01";
import mdToUu5Plugin from "../../src/converters/md-uu5-plugin";
import BookKitMdToUu5Plugin from "../../src/converters/md2uu5/bookKit/bookkit-md-uu5-plugin";
import Core from "uu5g04-core";

chai.expect();

const expect = chai.expect;

let markdownToUu5 = new MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
markdownToUu5.use(mdToUu5Plugin);
markdownToUu5.use(BookKitMdToUu5Plugin, { markdownToUu5: markdownToUu5 , uu5Core: Core});

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
