import Setup from "../../withUU5/tools/setup";
Setup();
import chai from "chai";
import UU5ToMarkdown from "../../../src/uu5-to-markdown.js";
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";
import Core from "uu5g04-core";
const opts = {uu5Core: Core};

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts);
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyUu5Plugin(uu5ToMarkdown);

function uu5ToMdTest(name, uu5string, mdString) {
  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);

    expect(parsed).to.be.equal(mdString);
  });
}

describe("Attributes escapings - uu5json", () => {
  uu5ToMdTest(
    "embedded uujson with styles - level 0",
    String.raw`<UU5.Bricks.Span style="<uu5json />{\"backgroundColor\":\"rgb(255, 255, 255)\"}">Some Text</UU5.Bricks.Span>`,
    String.raw`<UU5.Bricks.Span style='<uu5json/>{\"backgroundColor\":\"rgb(255, 255, 255)\"}'>Some Text</UU5.Bricks.Span>`
  );
});

describe("Attributes escapings - uu5string", () => {
  uu5ToMdTest(
    "embedded uujson with styles - level 0",
    String.raw`<uu5string/>
<UU5.Bricks.Box colorSchema='cyan-rich' content='<uu5string/>0th level - " \' \\
  <UU5.Bricks.Box colorSchema="blue-rich" content="<uu5string/>1st level - \" \' \\\\
  <UU5.Bricks.Box colorSchema=\'blue\' content=\'<uu5string/>1st level - \" \\\' \\\\\\\\
<UU5.Bricks.Box colorSchema=\"yellow\" content=\"<uu5string/>1st level - \\\\\" \\\' \\\\\\\\\\\\\\\\
      \" />
    \' />
"/>
'/>`,
    String.raw`<uu5string/>
<UU5.Bricks.Box colorSchema='cyan-rich' content='<uu5string/>0th level - " \' \\
  <UU5.Bricks.Box colorSchema="blue-rich" content="<uu5string/>1st level - \" \' \\\\
  <UU5.Bricks.Box colorSchema=\'blue\' content=\'<uu5string/>1st level - \" \\\' \\\\\\\\
<UU5.Bricks.Box colorSchema=\"yellow\" content=\"<uu5string/>1st level - \\\\\" \\\' \\\\\\\\\\\\\\\\
      \" />
    \' />
"/>
'/>`
  );
});





