import Setup from './tools/setup';
import chai from 'chai';
import CodeKit from 'uu5codekitg01';
import mdToUu5Plugin from '../../src/converters/md-uu5-plugin';
import DesignKitMdToUu5Plugin from '../../src/converters/md2uu5/designKit/designKit-md-uu5-plugin';

chai.expect();

// TODO this test is currently not working because the uu5codekitg01 module cannot be loaded

const expect = chai.expect;

let markdownToUu5 = new CodeKit.MarkdownRenderer('full', {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
markdownToUu5.use(mdToUu5Plugin);
markdownToUu5.use(DesignKitMdToUu5Plugin);

function mdToUu5Test(name, mdString, uu5String) {

  it(name, () => {
    let parsed = markdownToUu5.render(mdString);

    expect(parsed).to.be.equal(uu5String);
  });

}

describe('UuApp.DesignKit', () => {
  describe('UuSubAppDataStoreList', () => {
    mdToUu5Test('with link in first column, text in desc',
      `{UuSubAppDataStoreList}
- [datastore1 label](datastore1Code)
  - O
  - datastore1 description
- [datastore2 label](datastore2Code)
  - B
  - datastore2 description`,
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[[["datastore1Code","datastore1 label"],"O","datastore1 description"],[["datastore2Code","datastore2 label"],"B","datastore2 description"]]'/>\n`);
    mdToUu5Test('with text in first column, text in desc',
      `{UuSubAppDataStoreList}
- datastore1Code
  - O
  - datastore1 description
- datastore2Code
  - B
  - datastore2 description`,
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[["datastore1Code","O","datastore1 description"],["datastore2Code","B","datastore2 description"]]'/>\n`);
  });
});
