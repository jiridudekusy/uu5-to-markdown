import Setup from './tools/setup';
import chai from 'chai';
import CodeKit from 'uu5codekitg01';
import mdToUu5Plugin from '../../src/converters/md-uu5-plugin';
import DesignKitMdToUu5Plugin from '../../src/converters/md2uu5/designKit/designKit-md-uu5-plugin';

Setup();
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
markdownToUu5.use(DesignKitMdToUu5Plugin, {markdownToUu5: markdownToUu5});

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
  describe('UuCmdList', () => {
    mdToUu5Test('with link in first column, text in other',
      `{UuCmdList}
- [initCourse](initCourse)
  - 1
  - B
  - SysOwner
  - Inicializace kurzu.
- updateCourse
  - 2
  - C
  - ExecutivesContent
  - Aktualizace schema kurz.`,
      `<uu5string/><UuApp.DesignKit.UuCmdList data='<uu5json/>[[["initCourse","initCourse"],"1","B","SysOwner","Inicializace kurzu."],["updateCourse","2","C","ExecutivesContent","Aktualizace schema kurz."]]'/>\n`);
  });
  describe('UuSubAppInfo', () => {
    mdToUu5Test('with text',
      `{UuSubAppInfo}
- uuCourse
- Multi
- uuSubApp do something.
- [ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git](ues:UU-BT:4419189)`,
      `<uu5string/><UuApp.DesignKit.UuSubAppInfo data='<uu5json/>["uuCourse","Multi","uuSubApp do something.",["ues:UU-BT:4419189","ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git"]]'/>\n`);
  });
  describe('UU5UveList', () => {
    mdToUu5Test('empty UU5UveList',
      `{UU5UveList}\n`,
      `<uu5string/><UuApp.DesignKit.UU5UveList data='<uu5json/>[]'/>\n`);
  });
  describe('UuCmdErrorList', () => {
    mdToUu5Test('with \\n',
      `{UuCmdErrorList}
- invalidDtoIn
  - Error
  - DtoIn is not valid.
  - "invalidTypeKeyMap":{}
    "invalidValueKeyMap":{}
    "missingKeyMap":{}
`,
      `<uu5string/><UuApp.DesignKit.UuCmdErrorList data='<uu5json/>[["invalidDtoIn","Error","DtoIn is not valid.","\\"invalidTypeKeyMap\\":{}\\n\\"invalidValueKeyMap\\":{}\\n\\"missingKeyMap\\":{}"]]'/>\n`);
  });

  describe('UU5ComponentMixins', () => {
    mdToUu5Test('default',
      `{UU5ComponentMixins}
*   [nějaký mixin](SomeMixin)
*   [UU5.Common.BaseMixin](https://uuos9.plus4u.net/uu\\-dockitg01\\-main/78462435\\-ed11ec379073476db0aa295ad6c00178/book/page?code=uu5CommonBaseMixin)
*   UU5.Common.Elementary
`,
      `<uu5string/><UuApp.DesignKit.UU5ComponentMixins data='<uu5json/>[["SomeMixin","nějaký mixin"],["https://uuos9.plus4u.net/uu-dockitg01-main/78462435-ed11ec379073476db0aa295ad6c00178/book/page?code=uu5CommonBaseMixin","UU5.Common.BaseMixin"],"UU5.Common.Elementary"]'/>\n`);
  });

});
