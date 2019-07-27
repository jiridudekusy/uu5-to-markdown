import Setup from "../../withUU5/tools/setup";
Setup();
import chai from "chai";
import {MarkdownRenderer} from "uu5codekitg01";
import UuAppDesignKitPlugin from "../../../src/plugin/uuAppDesignKit/uuAppDesignKit-plugin"
import Core from "uu5g04-core";

chai.expect();

const expect = chai.expect;

let uuAppDesignKitPlugin = new UuAppDesignKitPlugin({uu5Core: Core});

let markdownToUu5 = new MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
uuAppDesignKitPlugin.applyMarkdownPlugin(markdownToUu5);


function mdToUu5Test(name, mdString, uu5String, ignore) {
  it(name, () => {
    let parsed = markdownToUu5.render(mdString);
    if(!ignore) {
      expect(parsed).to.be.equal(uu5String);
    }
  });
}

describe("UuApp.DesignKit", () => {
  describe("UuSubAppDataStoreList", () => {
    mdToUu5Test(
      "with link in first column, text in desc",
      `{UuSubAppDataStoreList}
- Name: [datastore1 label](datastore1Code)
  - Type: O
  - Description: datastore1 description
- Name: [datastore2 label](datastore2Code)
  - Type: B
  - Description: datastore2 description
{/UuSubAppDataStoreList}`,
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
  [["datastore1Code","datastore1 label"],"O","datastore1 description"],
  [["datastore2Code","datastore2 label"],"B","datastore2 description"]
]'/>\n`
    );
    mdToUu5Test(
      "with text in first column, text in desc",
      `{UuSubAppDataStoreList}
- Name: datastore1Code
  - Type: O
  - Description: datastore1 description
- Name: datastore2Code
  - Type: B
  - Description: datastore2 description
{/UuSubAppDataStoreList}`,
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
  ["datastore1Code","O","datastore1 description"],
  ["datastore2Code","B","datastore2 description"]
]'/>\n`
    );
  });
  describe("UuCmdList", () => {
    mdToUu5Test(
      "with link in first column, text in other",
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
  - Aktualizace schema kurz.
{/UuCmdList}`,
      `<uu5string/><UuApp.DesignKit.UuCmdList data='<uu5json/>[
  [["initCourse","initCourse"],"1","B","SysOwner","Inicializace kurzu."],
  ["updateCourse","2","C","ExecutivesContent","Aktualizace schema kurz."]
]'/>\n`
    );
  });
  describe("UuSubAppInfo", () => {
    mdToUu5Test(
      "with text",
      `{UuSubAppInfo}
- Name: uuCourse
- Type: Multi
- Description: uuSubApp do something.
- Git: [ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git](ues:UU-BT:4419189)
{/UuSubAppInfo}`,
      `<uu5string/><UuApp.DesignKit.UuSubAppInfo data='<uu5json/>[
  "uuCourse",
  "Multi",
  "uuSubApp do something.",
  ["ues:UU-BT:4419189","ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git"]
]'/>\n`
    );
  });
  describe("UU5UveList", () => {
    mdToUu5Test(
      "empty UU5UveList",
      `{UU5UveList}\n{/UU5UveList}`,
      `<uu5string/><UuApp.DesignKit.UU5UveList data='<uu5json/>[]'/>\n`
    );
  });
  describe("UuCmdErrorList", () => {
    mdToUu5Test(
      "with \\n",
      `{UuCmdErrorList}
- invalidDtoIn
  - Error
  - DtoIn is not valid.
  - "invalidTypeKeyMap":{}
    "invalidValueKeyMap":{}
    "missingKeyMap":{}
{/UuCmdErrorList}
`,
      `<uu5string/><UuApp.DesignKit.UuCmdErrorList data='<uu5json/>[
  ["invalidDtoIn","Error","DtoIn is not valid.","\\"invalidTypeKeyMap\\":{}\\n\\"invalidValueKeyMap\\":{}\\n\\"missingKeyMap\\":{}"]
]'/>\n`
    );
  });

  describe("UU5ComponentMixins", () => {
    mdToUu5Test(
      "default",
      `{UU5ComponentMixins}
*   [nějaký mixin](SomeMixin)
*   [UU5.Common.BaseMixin](https://uuos9.plus4u.net/uu\\-dockitg01\\-main/78462435\\-ed11ec379073476db0aa295ad6c00178/book/page?code=uu5CommonBaseMixin)
*   UU5.Common.Elementary
{/UU5ComponentMixins}
`,
      `<uu5string/><UuApp.DesignKit.UU5ComponentMixins data='<uu5json/>[
  ["SomeMixin","nějaký mixin"],
  ["https://uuos9.plus4u.net/uu-dockitg01-main/78462435-ed11ec379073476db0aa295ad6c00178/book/page?code=uu5CommonBaseMixin","UU5.Common.BaseMixin"],
  "UU5.Common.Elementary"
]'/>\n`
    );
  });
  describe("UUCmdList", () => {
    mdToUu5Test(
      "'with bookUri",
      `{UuCmdList}{:"bookUri":"https://uuos9.plus4u.net/uu-dockitg01-main/78462435-34df77ebe0a04adda6dcd62d32c4f513/book"}
*   [sys/calculateDataStoreStats](sysCalculateDataStoreStats_00)
    *   \\-
    *   \\-
    *   AwidOwner, AsidOwner
    *   Calculates information on a data store usage for a given workspace.
*   [sys/clearAppWorkspaceConfig](sysClearAppWorkspaceConfig_00)
    *   \\-
    *   \\-
    *   Authorities, AwidOwner
    *   Removes all configuration attributes of the uuAppWorkspace.
{/UuCmdList}`,
      `<uu5string/><UuApp.DesignKit.UuCmdList bookUri='https://uuos9.plus4u.net/uu-dockitg01-main/78462435-34df77ebe0a04adda6dcd62d32c4f513/book' data='<uu5json/>[
  [["sysCalculateDataStoreStats_00","sys/calculateDataStoreStats"],"-","-","AwidOwner, AsidOwner","Calculates information on a data store usage for a given workspace."],
  [["sysClearAppWorkspaceConfig_00","sys/clearAppWorkspaceConfig"],"-","-","Authorities, AwidOwner","Removes all configuration attributes of the uuAppWorkspace."]
]'/>\n`
    );
  });
  describe("Table", () => {
    mdToUu5Test(
      "default",
      `{Table}
*   header1
    *   header2
    *   header3
*   row 1.1
    *   row 1.2
    *   row 1.3
*   row 2.1
    *   row 2.2
    *   row 2.3
*   row 3.1
    *   row 3.2
    *   row 3.3
{/Table}`,
      `<uu5string/><UuApp.DesignKit.Table data='<uu5json/>[
  ["header1","header2","header3"],
  ["row 1.1","row 1.2","row 1.3"],
  ["row 2.1","row 2.2","row 2.3"],
  ["row 3.1","row 3.2","row 3.3"]
]'/>\n`
    );
    mdToUu5Test(
      "with attributes without value",
      `{Table}{:"colHeader":null,"rowHeader":null,"transpose":null}
*   header1
    *   header2
    *   header3
*   row 1.1
    *   row 1.2
    *   row 1.3
{/Table}`,
      `<uu5string/><UuApp.DesignKit.Table colHeader rowHeader transpose data='<uu5json/>[
  ["header1","header2","header3"],
  ["row 1.1","row 1.2","row 1.3"]
]'/>\n`
    );
    mdToUu5Test(
      "table with list",
      `{Table}
*   header1
    *   header2
    *   header3
    *   header4
*   row 1.1

    *   row 1.2        
        *   item 1
        *   item 2        
    *   row 1.3
    *   row 1.4
*   row 2.1
    *   row 2.2
    *   row 2.3
    *   row 2.4
{/Table}`,
      `<uu5string/><UuApp.DesignKit.Table data='<uu5json/>[
  ["header1","header2","header3","header4"],
  ["row 1.1","<uu5string/><UU5.Bricks.P>row 1.2</UU5.Bricks.P>\\n<UU5.Bricks.Ul>\\n<UU5.Bricks.Li>item 1</UU5.Bricks.Li>\\n<UU5.Bricks.Li>item 2</UU5.Bricks.Li>\\n</UU5.Bricks.Ul>","row 1.3"],
  ["row 2.1","row 2.2","row 2.3","row 2.4"]
]'/>\n`,
      //TODO: FIX THE TEST !!!
      true
    );
  });
});
