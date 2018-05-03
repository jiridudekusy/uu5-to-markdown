import chai from 'chai';
import UU5ToMarkdown from '../../src/uu5-to-markdown.js';

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown();

function uu5ToMdTest(name, uu5string, mdString) {

  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);

    expect(parsed).to.be.equal(mdString);
  });

}

describe('Unknown tags', () => {
  uu5ToMdTest('Unknown tag without MD content',
    '<UUS.Unknown>Some Text</UUS.Unknown>',
    '<UUS.Unknown>Some Text</UUS.Unknown>');
  uu5ToMdTest('Unknown tag with known UU5 -> MD content (simple)',
    '<UUS.Unknown>Some <UU5.Bricks.Strong>Text</UU5.Bricks.Strong></UUS.Unknown>',
    '<UUS.Unknown>Some <UU5.Bricks.Strong>Text</UU5.Bricks.Strong></UUS.Unknown>');
  uu5ToMdTest('Unknown tag with known UU5 -> MD content (complex)',
    ['<UUS.Unknown>',
      '<UU5.Bricks.P>Some <UU5.Bricks.Strong>Text</UU5.Bricks.Strong></UU5.Bricks.P>',
      '<UU5.Bricks.P>Some <UUS.Bricks.Em> Other<UU5.Bricks.Strong>Text</UU5.Bricks.Strong></UUS.Bricks.Em></UU5.Bricks.P>',
      '</UUS.Unknown>'].join('\n'),
    ['<UUS.Unknown>',
      '<UU5.Bricks.P>Some <UU5.Bricks.Strong>Text</UU5.Bricks.Strong></UU5.Bricks.P>',
      '<UU5.Bricks.P>Some <UUS.Bricks.Em> Other<UU5.Bricks.Strong>Text</UU5.Bricks.Strong></UUS.Bricks.Em></UU5.Bricks.P>',
      '</UUS.Unknown>'].join('\n'));
  uu5ToMdTest('Unknown tag with entities',
    '<UUS.Unknown attr1="\'><&" attr2=\'"><&\'>Some Text</UUS.Unknown>',
    '<UUS.Unknown attr1="\'><&" attr2=\'"><&\'>Some Text</UUS.Unknown>');
  uu5ToMdTest('Unknown tag with uu5json',
    `      <UU5.Unknown data='<uu5json/>[
        ["name1", "value1"],
        ["name2", "value2"],
        ["name3", "value3"]
      ]'/>`,
    `<UU5.Unknown data='<uu5json/>[
        ["name1", "value1"],
        ["name2", "value2"],
        ["name3", "value3"]
      ]'/>`);
  uu5ToMdTest('Known tag with unknown attribute',
    '<UUS.Bricks.P unknownAttribute="val">Some Text</UUS.Bricks.P>',
    '<UUS.Bricks.P unknownAttribute="val">Some Text</UUS.Bricks.P>');
  uu5ToMdTest('Known tag with unknown attribute without value',
    '<UUS.Bricks.P unknownAttribute>Some Text</UUS.Bricks.P>',
    '<UUS.Bricks.P unknownAttribute>Some Text</UUS.Bricks.P>');

});

describe('Uu5.Bricks.P', () => {
  uu5ToMdTest('single Paragraph test',
    '<UU5.Bricks.P>Lorem ipsum</UU5.Bricks.P>',
    'Lorem ipsum');
  uu5ToMdTest('multiple Paragraphs test',
    '<UU5.Bricks.P>Lorem</UU5.Bricks.P><UU5.Bricks.P>ipsum</UU5.Bricks.P>',
    'Lorem\n\nipsum');
});

describe('Uu5.Bricks.Strong', () => {
  uu5ToMdTest('single Strong test',
    '<UU5.Bricks.Strong>Hello world</UU5.Bricks.Strong>',
    '**Hello world**');
  uu5ToMdTest('multiple Strong test',
    '<UU5.Bricks.Strong>Hello</UU5.Bricks.Strong> <UU5.Bricks.Strong>world</UU5.Bricks.Strong>',
    '**Hello** **world**');
});

describe('Uu5.Bricks.Em', () => {
  uu5ToMdTest('single Em test',
    '<UU5.Bricks.Em>Hello world</UU5.Bricks.Em>',
    '*Hello world*');
  uu5ToMdTest('multiple Em test',
    '<UU5.Bricks.Em>Hello</UU5.Bricks.Em> <UU5.Bricks.Em>world</UU5.Bricks.Em>',
    '*Hello* *world*');
  uu5ToMdTest('strong within Em test',
    '<UU5.Bricks.Em><UU5.Bricks.Strong>Hello world</UU5.Bricks.Strong></UU5.Bricks.Em>',
    '***Hello world***');
});

describe('Uu5.Bricks.Code', () => {
  uu5ToMdTest('inline code',
    '<UU5.Bricks.Code>print(\'test\')</UU5.Bricks.Code>',
    '`print(\'test\')`');

  uu5ToMdTest('code block',
    ['<UU5.Bricks.Pre><UU5.Bricks.Code>def hello_world',
      '  # 42 &lt; 9001',
      '  "Hello world!"',
      'end</UU5.Bricks.Code></UU5.Bricks.Pre>'].join('\n'),
    ['    def hello_world',
      '      # 42 < 9001',
      '      "Hello world!"',
      '    end'].join('\n'));

  uu5ToMdTest('multiple code blocks',
    ['<UU5.Bricks.Pre><UU5.Bricks.Code>def foo',
      '  # 42 &lt; 9001',
      "  'Hello world!'",
      'end</UU5.Bricks.Code></UU5.Bricks.Pre>',
      '<UU5.Bricks.P>next:</UU5.Bricks.P>',
      '<UU5.Bricks.Pre><UU5.Bricks.Code>def bar',
      '  # 42 &lt; 9001',
      "  'Hello world!'",
      'end</UU5.Bricks.Code></UU5.Bricks.Pre>'].join('\n'),
    ['    def foo',
      '      # 42 < 9001',
      "      'Hello world!'",
      '    end',
      '',
      'next:',
      '',
      '    def bar',
      '      # 42 < 9001',
      "      'Hello world!'",
      '    end'].join('\n'));
});

describe('Uu5.Bricks.Pre', () => {
  uu5ToMdTest('plain pre',
    '<UU5.Bricks.Pre>preformatted</UU5.Bricks.Pre>',
    '<UU5.Bricks.Pre>preformatted</UU5.Bricks.Pre>');
});

describe('UU5.Bricks.Header', () => {
  uu5ToMdTest('level 1',
    '<UU5.Bricks.Header level="1">Hello world</UU5.Bricks.Header>',
    '# Hello world');
  uu5ToMdTest('level 3',
    '<UU5.Bricks.Header level="3">Hello world</UU5.Bricks.Header>',
    '### Hello world');
  uu5ToMdTest('level 6',
    '<UU5.Bricks.Header level="6">Hello world</UU5.Bricks.Header>',
    '###### Hello world');
  uu5ToMdTest('level 4 with Em',
    '<UU5.Bricks.Header level="4"><UU5.Bricks.Em>Hello</UU5.Bricks.Em> world</UU5.Bricks.Header>',
    '#### *Hello* world');
  uu5ToMdTest('level 8 - invalid heading',
    '<UU5.Bricks.Header level="8">Hello world</UU5.Bricks.Header>',
    '<UU5.Bricks.Header level="8">Hello world</UU5.Bricks.Header>');
});

describe('UU5.Bricks.Section', () => {
  uu5ToMdTest('single section',
    '<UU5.Bricks.Section header="Section title">Section content</UU5.Bricks.Section>',
    ['# {section} Section title',
      'Section content',
      '',
      '{section}'].join('\n'));

  uu5ToMdTest('nested section',
    ['<UU5.Bricks.Section header="Section title">',
      'Section content',
      '<UU5.Bricks.Section header="Nested section title">',
      'Nested section content',
      '</UU5.Bricks.Section>',
      'Additional section content',
      '</UU5.Bricks.Section>'].join('\n'),
    ['# {section} Section title',
      'Section content',
      '',
      '# {section} Nested section title',
      'Nested section content',
      '',
      '{section}',
      '',
      'Additional section content',
      '',
      '{section}'].join('\n'));

});

describe('Uu5.Bricks.Link', () => {
  uu5ToMdTest('default',
    '<UU5.Bricks.Link href="http://example.com/about">About us</UU5.Bricks.Link>',
    '[About us](http://example.com/about)');
  uu5ToMdTest('with title',
    '<UU5.Bricks.Link href="http://example.com/about" title="About this company">About us</UU5.Bricks.Link>',
    '[About us](http://example.com/about "About this company")');
  uu5ToMdTest('with no src',
    '<UU5.Bricks.Link id="donuts3">About us</UU5.Bricks.Link>',
    '<UU5.Bricks.Link id="donuts3">About us</UU5.Bricks.Link>');
  uu5ToMdTest('with span',
    '<UU5.Bricks.Link href="http://example.com/about"><span>About us</span></UU5.Bricks.Link>',
    '[<span>About us</span>](http://example.com/about)');
});

// TODO finsish table tests
describe('UU5.Bricks.Table', () => {
  uu5ToMdTest('Basic table',
    ['<UU5.Bricks.Table>',
      '  <UU5.Bricks.Table.THead>',
      '    <UU5.Bricks.Table.Tr>',
      '      <UU5.Bricks.Table.Th>Column 1</UU5.Bricks.Table.Th>',
      '      <UU5.Bricks.Table.Th>Column 2</UU5.Bricks.Table.Th>',
      '    </UU5.Bricks.Table.Tr>',
      '  </UU5.Bricks.Table.THead>',
      '  <UU5.Bricks.Table.TBody>',
      '    <UU5.Bricks.Table.Tr>',
      '      <UU5.Bricks.Table.Td>Row 1, Column 1</UU5.Bricks.Table.Td>',
      '      <UU5.Bricks.Table.Td>Row 1, Column 2</UU5.Bricks.Table.Td>',
      '    </UU5.Bricks.Table.Tr>',
      '    <UU5.Bricks.Table.Tr>',
      '      <UU5.Bricks.Table.Td>Row 2, Column 1</UU5.Bricks.Table.Td>',
      '      <UU5.Bricks.Table.Td>Row 2, Column 2</UU5.Bricks.Table.Td>',
      '    </UU5.Bricks.Table.Tr>',
      '  </UU5.Bricks.Table.TBody>',
      '</UU5.Bricks.Table>'].join('\n'),

    ['| Column 1 | Column 2 |',
      '| --- | --- |',
      '| Row 1, Column 1 | Row 1, Column 2 |',
      '| Row 2, Column 1 | Row 2, Column 2 |'].join('\n'));
});

// TODO Section tests

// TODO Finish lists

describe('Lists', () => {
  uu5ToMdTest('ol triggers are escaped',
    '1986. What a great season.',
    '1986\. What a great season.');
  describe('Uu5.Bricks.Ol', () => {
    uu5ToMdTest('default',
      '<UU5.Bricks.Ol>\n\t<UU5.Bricks.Li>Hello world</UU5.Bricks.Li>\n\t<UU5.Bricks.Li>Foo bar</UU5.Bricks.Li>\n</UU5.Bricks.Ol>',
      '1.  Hello world\n2.  Foo bar');
  });
  describe('Uu5.Bricks.Ul', () => {
    uu5ToMdTest('Multiple uls',
      ['<UU5.Bricks.Ul>',
        '  <UU5.Bricks.Li>Hello world</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>Lorem ipsum</UU5.Bricks.Li>',
        '</UU5.Bricks.Ul>',
        '<UU5.Bricks.Ul>',
        '  <UU5.Bricks.Li>Hello world</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>Lorem ipsum</UU5.Bricks.Li>',
        '</UU5.Bricks.Ul>'].join('\n'),
      ['*   Hello world',
        '*   Lorem ipsum',
        '',
        '*   Hello world',
        '*   Lorem ipsum'].join('\n'));
    uu5ToMdTest('Nested uls',
      ['<UU5.Bricks.Ul>',
        '  <UU5.Bricks.Li>This is a list item at root level</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>This is another item at root level</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>',
        '    <UU5.Bricks.Ul>',
        '      <UU5.Bricks.Li>This is a nested list item</UU5.Bricks.Li>',
        '      <UU5.Bricks.Li>This is another nested list item</UU5.Bricks.Li>',
        '      <UU5.Bricks.Li>',
        '        <UU5.Bricks.Ul>',
        '          <UU5.Bricks.Li>This is a deeply nested list item</UU5.Bricks.Li>',
        '          <UU5.Bricks.Li>This is another deeply nested list item</UU5.Bricks.Li>',
        '          <UU5.Bricks.Li>This is a third deeply nested list item</UU5.Bricks.Li>',
        '        </UU5.Bricks.Ul>',
        '      </UU5.Bricks.Li>',
        '    </UU5.Bricks.Ul>',
        '  </UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>This is a third item at root level</UU5.Bricks.Li>',
        '</UU5.Bricks.Ul>'].join('\n'),
      ['*   This is a list item at root level',
        '*   This is another item at root level',
        '*   *   This is a nested list item',
        '    *   This is another nested list item',
        '    *   *   This is a deeply nested list item',
        '        *   This is another deeply nested list item',
        '        *   This is a third deeply nested list item',
        '*   This is a third item at root level'].join('\n'));
    uu5ToMdTest('Nested uls without Li',
      ['<UU5.Bricks.Ul>',
        '  <UU5.Bricks.Li>This is a list item at root level</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>This is another item at root level</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>',
        '    <UU5.Bricks.Ul>',
        '      <UU5.Bricks.Li>This is a nested list item</UU5.Bricks.Li>',
        '      <UU5.Bricks.Li>This is another nested list item',
        '        <UU5.Bricks.Ul>',
        '          <UU5.Bricks.Li>This is a deeply nested list item</UU5.Bricks.Li>',
        '          <UU5.Bricks.Li>This is another deeply nested list item</UU5.Bricks.Li>',
        '          <UU5.Bricks.Li>This is a third deeply nested list item</UU5.Bricks.Li>',
        '        </UU5.Bricks.Ul>',
        '      </UU5.Bricks.Li>',
        '    </UU5.Bricks.Ul>',
        '  </UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>This is a third item at root level</UU5.Bricks.Li>',
        '</UU5.Bricks.Ul>'].join('\n'),
      ['*   This is a list item at root level',
        '*   This is another item at root level',
        '*   *   This is a nested list item',
        '    *   This is another nested list item',
        '        *   This is a deeply nested list item',
        '        *   This is another deeply nested list item',
        '        *   This is a third deeply nested list item',
        '*   This is a third item at root level'].join('\n'));
    uu5ToMdTest('Nested ols',
      ['<UU5.Bricks.Ul>',
        '  <UU5.Bricks.Li>This is a list item at root level</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>This is another item at root level</UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>',
        '    <UU5.Bricks.Ol>',
        '      <UU5.Bricks.Li>This is a nested list item</UU5.Bricks.Li>',
        '      <UU5.Bricks.Li>This is another nested list item</UU5.Bricks.Li>',
        '      <UU5.Bricks.Li>',
        '        <UU5.Bricks.Ul>',
        '          <UU5.Bricks.Li>This is a deeply nested list item</UU5.Bricks.Li>',
        '          <UU5.Bricks.Li>This is another deeply nested list item</UU5.Bricks.Li>',
        '          <UU5.Bricks.Li>This is a third deeply nested list item</UU5.Bricks.Li>',
        '        </UU5.Bricks.Ul>',
        '      </UU5.Bricks.Li>',
        '    </UU5.Bricks.Ol>',
        '  </UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>This is a third item at root level</UU5.Bricks.Li>',
        '</UU5.Bricks.Ul>'].join('\n'),
      ['*   This is a list item at root level',
        '*   This is another item at root level',
        '*   1.  This is a nested list item',
        '    2.  This is another nested list item',
        '    3.  *   This is a deeply nested list item',
        '        *   This is another deeply nested list item',
        '        *   This is a third deeply nested list item',
        '*   This is a third item at root level'].join('\n'));
    uu5ToMdTest('ul with blockquote',
      ['<UU5.Bricks.Ul>',
        '  <UU5.Bricks.Li>',
        '    <UU5.Bricks.P>A list item with a blockquote:</UU5.Bricks.P>',
        '    <UU5.Bricks.Blockquote>',
        '      <UU5.Bricks.P>This is a blockquote inside a list item.</UU5.Bricks.P>',
        '    </UU5.Bricks.Blockquote>',
        '  </UU5.Bricks.Li>',
        '</UU5.Bricks.Ul>'].join('\n'),
      ['*   A list item with a blockquote:',
        '',
        '    > This is a blockquote inside a list item.'].join('\n'));
    uu5ToMdTest('ul with p',
      '<UU5.Bricks.Ul><UU5.Bricks.Li><UU5.Bricks.P>Hello world</UU5.Bricks.P></UU5.Bricks.Li><UU5.Bricks.Li>Lorem ipsum</UU5.Bricks.Li></UU5.Bricks.Ul>',
      '*   Hello world\n\n*   Lorem ipsum');
    uu5ToMdTest('ol with multiple ps',
      ['<UU5.Bricks.Ol>',
        '  <UU5.Bricks.Li>',
        '    <UU5.Bricks.P>This is a list item with two paragraphs.</UU5.Bricks.P>',
        '    <UU5.Bricks.P>Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</UU5.Bricks.P>',
        '  </UU5.Bricks.Li>',
        '  <UU5.Bricks.Li>',
        '    <p>Suspendisse id sem consectetuer libero luctus adipiscing.</p>',
        '  </UU5.Bricks.Li>',
        '</UU5.Bricks.Ol>'].join('\n'),
      ['1.  This is a list item with two paragraphs.',
        '',
        '    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
        '',
        '2.  Suspendisse id sem consectetuer libero luctus adipiscing.'].join('\n'));
  });

});

describe('Whitespaces', () => {
  uu5ToMdTest('Header with leading and trailing spaces',
    `
<UU5.Bricks.Header level="2">
    Header with leading and trailing spaces   
</UU5.Bricks.Header>
    `,
    '## Header with leading and trailing spaces');

  uu5ToMdTest('Multiline Header',
    `
<UU5.Bricks.Header level="2">
    Header 
    on
    Multiple
    Lines 
  
  
  
</UU5.Bricks.Header>
    `,
    '## Header on Multiple Lines');

  uu5ToMdTest('Paragraph with emphasis in pretty format',
    `
<UU5.Bricks.P>
  Some
  <UU5.Bricks.Strong>
    multiline
  </UU5.Bricks.Strong>
  text
  with
  <UU5.Bricks.Em>
    emphasis
  </UU5.Bricks.Em>
  
  
</UU5.Bricks.P>
    `,
    'Some **multiline** text with *emphasis*');
  uu5ToMdTest('Header with following unknown element',
    `
<UU5.Bricks.Header level="2">Header</UU5.Bricks.Header>
<UUS.Unknown>Some Text</UUS.Unknown>
    `,
    ['## Header',
      '',
      '<UUS.Unknown>Some Text</UUS.Unknown>'].join('\n'));

});
