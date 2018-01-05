import chai from 'chai';
import UU5ToMarkdown from '../../src/uu5-to-markdown.js';
import UU5CodeKitConverters from '../../src/converters/uu5CodeKit-converters.js';

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(new UU5CodeKitConverters());

function uu5ToMdTest(name, uu5string, mdString) {

  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });

}

describe('Uu5.Bricks.CodeViewer', () => {
  uu5ToMdTest('code block',
    ['<UU5.CodeKit.CodeViewer><uu5string.pre>def hello_world',
      '  # 42 < 9001',
      '  "Hello world!"',
      'end</uu5string.pre></UU5.CodeKit.CodeViewer>'].join('\n'),
    ['```',
      'def hello_world',
      '  # 42 < 9001',
      '  "Hello world!"',
      'end',
      '```'].join('\n'));

  uu5ToMdTest('multiple code blocks',
    ['<UU5.CodeKit.CodeViewer><uu5string.pre>def foo',
      '  # 42 < 9001',
      "  'Hello world!'",
      'end</uu5string.pre></UU5.CodeKit.CodeViewer>',
      '<UU5.Bricks.P>next:</UU5.Bricks.P>',
      '<UU5.CodeKit.CodeViewer><uu5string.pre>def bar',
      '  # 42 < 9001',
      "  'Hello world!'",
      'end</uu5string.pre></UU5.CodeKit.CodeViewer>'].join('\n'),
    ['```',
      'def foo',
      '  # 42 < 9001',
      "  'Hello world!'",
      'end',
      '```',
      '',
      'next:',
      '',
      '```',
      'def bar',
      '  # 42 < 9001',
      "  'Hello world!'",
      'end',
      '```'].join('\n'));
  uu5ToMdTest('code block in pretty format',
    `
    <UU5.CodeKit.CodeViewer>
      <uu5string.pre>def hello_world
  # 42 < 9001
  "Hello world!"
end</uu5string.pre>
</UU5.CodeKit.CodeViewer>`,
    ['```',
      'def hello_world',
      '  # 42 < 9001',
      '  "Hello world!"',
      'end',
      '```'].join('\n'));
});
