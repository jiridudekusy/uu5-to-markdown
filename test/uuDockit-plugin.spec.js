import chai from 'chai';
import UU5ToMarkdown from '../src/uu5-to-markdown.js';
import UUDockitPlugin from '../src/converters/uuDockit-plugin.js';

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(new UUDockitPlugin());

function uu5ToMdTest(name, uu5string, mdString) {

  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });

}
describe('uuDockit-plugin', () => {

  describe('UU5.Bricks.Header', () => {
    uu5ToMdTest('level 1 - invalid heading',
      '<UU5.Bricks.Header level="1">Hello world</UU5.Bricks.Header>',
      '<UU5.Bricks.Header level="1">Hello world</UU5.Bricks.Header>');
    uu5ToMdTest('level 3',
      '<UU5.Bricks.Header level="3">Hello world</UU5.Bricks.Header>',
      '## Hello world');
    uu5ToMdTest('level 6',
      '<UU5.Bricks.Header level="6">Hello world</UU5.Bricks.Header>',
      '##### Hello world');
    uu5ToMdTest('level 4 with Em',
      '<UU5.Bricks.Header level="4"><UU5.Bricks.Em>Hello</UU5.Bricks.Em> world</UU5.Bricks.Header>',
      '### *Hello* world');
    uu5ToMdTest('level 9 - invalid heading',
      '<UU5.Bricks.Header level="9">Hello world</UU5.Bricks.Header>',
      '<UU5.Bricks.Header level="9">Hello world</UU5.Bricks.Header>');
  });

});
