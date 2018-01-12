import chai from 'chai';
import UU5ToMarkdown from '../../src/uu5-to-markdown.js';
import UuAppDesignKitConverters from '../../src/converters/uuAppDesignKit-converters';

chai.expect();

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(new UuAppDesignKitConverters());

function uu5ToMdTest(name, uu5string, mdString) {

  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });

}

function skipUu5ToMdTest(name, uu5string, mdString) {
  it.skip(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    expect(parsed).to.be.equal(mdString);
  });
}

describe('UuApp.DesignKit', () => {
  describe('UuSubAppDataStoreList', () => {
    uu5ToMdTest('default(link,text,text)',
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
[["datastore1Code","datastore1 label"],"O","datastore1 description"],
[["datastore2Code","datastore2 label"],"B","datastore2 description"]]
'/>`,
      `{UuSubAppDataStoreList}
*   [datastore1 label](datastore1Code)
    *   O
    *   datastore1 description
*   [datastore2 label](datastore2Code)
    *   B
    *   datastore2 description`);
    uu5ToMdTest('default(link,uu5,uu5)',
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
[["datastore1Code","datastore1 label"],"<uu5string/><UU5.Bricks.Strong>O</UU5.Bricks.Strong>","<uu5string/><UU5.Bricks.Strong>datastore1</UU5.Bricks.Strong> description"]
]'/>`,
      `{UuSubAppDataStoreList}
*   [datastore1 label](datastore1Code)
    *   **O**
    *   **datastore1** description`);

    // TODO Lists are not yet correctly supported by uu5->md convertor in uu5json attributes
    skipUu5ToMdTest('default(link,uu5,uu5)',
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
[["datastore1Code","datastore1 label"],"<uu5string/><UU5.Bricks.Strong>O</UU5.Bricks.Strong>","<uu5string/><UU5.Bricks.Strong>datastore1</UU5.Bricks.Strong> description<UU5.Bricks.Ul><UU5.Bricks.Li>item 1</UU5.Bricks.Li></UU5.Bricks.Ul>"]
]'/>`,
      `{UuSubAppDataStoreList}
*   [datastore1 label](datastore1Code)
    *   **O**
    *   **datastore1** description
        *   item 1`);
  });
  describe('UuSubAppInfo', () => {
    uu5ToMdTest('default(link,text,text)',
      `<uu5string/><UuApp.DesignKit.UuSubAppInfo data='<uu5json/>["uuCourse","Multi","uuSubApp do something.",["ues:UU-BT:4419189","ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git"]]'/>`,
      `{UuSubAppInfo}
*   uuCourse
*   Multi
*   uuSubApp do something.
*   [ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git](ues:UU\\-BT:4419189)`);
  });
});
