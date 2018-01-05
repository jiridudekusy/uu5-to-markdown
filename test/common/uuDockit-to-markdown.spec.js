import chai from 'chai';
import UU5ToMarkdown from '../../src/uu5-to-markdown.js';
import UuDockitToMarkdown from '../../src/uuDockit-to-markdown';

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown();
let uuDockitToMarkdown = new UuDockitToMarkdown(uu5ToMarkdown);

function uuDockitToMdTest(name, uuDockitString, mdString) {

  it(name, () => {
    let parsed = uuDockitToMarkdown.toMarkdown(uuDockitString);
    expect(parsed).to.be.equal(mdString);
  });

}

describe('uuDockitToMarkdown', () => {

  uuDockitToMdTest('default',
    `{
  "code": "BusinessModel",
  "body": [
    "<uu5string/><UU5.Bricks.P>paragraph content</UU5.Bricks.P>",
    "  <uu5string/>\\n  \\n    <UU5.Bricks.Section header=\\"Process Flow\\">\\n      Section content \\n    </UU5.Bricks.Section>    \\n      \\n\\n    \\n"
  ]
}`, `{uuDocKit-pageCode} BusinessModel

paragraph content

{uuDocKit-partBreak}

# {section} Process Flow
Section content

{section}`);

});
