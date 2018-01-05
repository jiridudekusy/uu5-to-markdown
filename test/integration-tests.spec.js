import chai from 'chai';
import UU5ToMarkdown from '../src/uu5-to-markdown.js';
import UU5CodeKitConverters from '../src/converters/uu5CodeKit-converters.js';
import UUDockitPlugin from '../src/converters/uuDockit-plugin.js';

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(new UU5CodeKitConverters(), new UUDockitPlugin());

function uu5FileTest(name, uu5stringFile, mdStringFile) {
  let fs = require('fs');
  let uu5string = fs.readFileSync('./test/data/' + uu5stringFile, 'utf8');
  let mdString = fs.readFileSync('./test/data/' + mdStringFile, 'utf8');

  // remove the latest \n from mdString, since IntelliJ always put \n to the end of MD file
  mdString = mdString.slice(0, -1);

  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });
}

describe('whole document', () => {
  uu5FileTest('common md', 'sdm-design.uu5', 'sdm-design.md');
  // uu5FileTest('with section', 'terre-business-summary-integration.uu5', 'sdm-design.md');
});

