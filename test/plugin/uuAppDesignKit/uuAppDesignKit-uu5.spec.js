import Setup from "../../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../../src/uu5-to-markdown.js";
import Core from "uu5g04-core";
import UuAppDesignKitPlugin from "../../../src/plugin/uuAppDesignKit/uuAppDesignKit-plugin"
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";
const opts = {uu5Core: Core};

const expect = chai.expect;

let uu5ToMarkdown = new UU5ToMarkdown(opts);
let uuAppDesignKitPlugin = new UuAppDesignKitPlugin({uu5Core: Core});
uuAppDesignKitPlugin.applyUu5Plugin(uu5ToMarkdown);
let uu5BricksPlugin = new Uu5BricksPlugin();
uu5BricksPlugin.applyUu5Plugin(uu5ToMarkdown);

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

describe("UuApp.DesignKit", () => {
  describe("UuSubAppDataStoreList", () => {
    uu5ToMdTest(
      "default(link,text,text)",
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
[["datastore1Code","datastore1 label"],"O","datastore1 description"],
[["datastore2Code","datastore2 label"],"B","datastore2 description"]]
'/>`,
      `{UuSubAppDataStoreList}
*   Name: [datastore1 label](datastore1Code)
    *   Type: O
    *   Description: datastore1 description
*   Name: [datastore2 label](datastore2Code)
    *   Type: B
    *   Description: datastore2 description
{/UuSubAppDataStoreList}`
    );
    uu5ToMdTest(
      "default(link,uu5,uu5)",
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
[["datastore1Code","datastore1 label"],"<uu5string/><UU5.Bricks.Strong>O</UU5.Bricks.Strong>","<uu5string/><UU5.Bricks.Strong>datastore1</UU5.Bricks.Strong> description"]
]'/>`,
      `{UuSubAppDataStoreList}
*   Name: [datastore1 label](datastore1Code)
    *   Type: **O**
    *   Description: **datastore1** description
{/UuSubAppDataStoreList}`
    );

    uu5ToMdTest(
      "default(link,uu5,uu5)",
      `<uu5string/><UuApp.DesignKit.UuSubAppDataStoreList data='<uu5json/>[
[["datastore1Code","datastore1 label"],"<uu5string/><UU5.Bricks.Strong>O</UU5.Bricks.Strong>","<uu5string/><UU5.Bricks.Strong>datastore1</UU5.Bricks.Strong> description<UU5.Bricks.Ul><UU5.Bricks.Li>item 1</UU5.Bricks.Li></UU5.Bricks.Ul>"]
]'/>`,
      `{UuSubAppDataStoreList}
*   Name: [datastore1 label](datastore1Code)
    *   Type: **O**
    *   Description: **datastore1** description

        *   item 1
{/UuSubAppDataStoreList}`
    );
  });
  describe("UuSubAppInfo", () => {
    uu5ToMdTest(
      "default(link,text,text)",
      `<uu5string/><UuApp.DesignKit.UuSubAppInfo data='<uu5json/>["uuCourse","Multi","uuSubApp do something.",["ues:UU-BT:4419189","ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git"]]'/>`,
      `{UuSubAppInfo}
*   Name: uuCourse
*   Type: Multi
*   Description: uuSubApp do something.
*   Git: [ssh://git@codebase.plus4u.net:9422/uu_uuapp_subapp01.git](ues:UU\\-BT:4419189)
{/UuSubAppInfo}`
    );
  });
  describe("UU5ComponentMixins", () => {
    uu5ToMdTest(
      "default(links)",
      `<uu5string/><UuApp.DesignKit.UU5ComponentMixins
  data='<uu5json/>[
    ["SomeMixin", "nějaký mixin"],
    ["https://uuos9.plus4u.net/uu-dockitg01-main/78462435-ed11ec379073476db0aa295ad6c00178/book/page?code=uu5CommonBaseMixin", "UU5.Common.BaseMixin"],
    "UU5.Common.Elementary"
  ]'
/>`,
      `{UU5ComponentMixins}
*   [nějaký mixin](SomeMixin)
*   [UU5.Common.BaseMixin](https://uuos9.plus4u.net/uu\\-dockitg01\\-main/78462435\\-ed11ec379073476db0aa295ad6c00178/book/page?code=uu5CommonBaseMixin)
*   UU5.Common.Elementary
{/UU5ComponentMixins}`
    );
  });
  describe("UUCmdList", () => {
    uu5ToMdTest(
      "with bookUri",
      `<uu5string/><UuApp.DesignKit.UuCmdList bookUri="https://uuos9.plus4u.net/uu-dockitg01-main/78462435-34df77ebe0a04adda6dcd62d32c4f513/book" data='<uu5json/>[
          [["sysCalculateDataStoreStats_00", "sys/calculateDataStoreStats"], "-", "-", "AwidOwner, AsidOwner", "Calculates information on a data store usage for a given workspace."],
          [["sysClearAppWorkspaceConfig_00", "sys/clearAppWorkspaceConfig"], "-", "-", "Authorities, AwidOwner", "Removes all configuration attributes of the uuAppWorkspace."]         
        ]'/>`,
      `{UuCmdList}{:"bookUri":"https://uuos9.plus4u.net/uu-dockitg01-main/78462435-34df77ebe0a04adda6dcd62d32c4f513/book"}
*   Name: [sys/calculateDataStoreStats](sysCalculateDataStoreStats_00)
    *   Priority: \\-
    *   Complexity: \\-
    *   Profiles: AwidOwner, AsidOwner
    *   Description: Calculates information on a data store usage for a given workspace.
*   Name: [sys/clearAppWorkspaceConfig](sysClearAppWorkspaceConfig_00)
    *   Priority: \\-
    *   Complexity: \\-
    *   Profiles: Authorities, AwidOwner
    *   Description: Removes all configuration attributes of the uuAppWorkspace.
{/UuCmdList}`
    );
  });
  describe("Table", () => {
    uu5ToMdTest(
      "default",
      `<uu5string/><UuApp.DesignKit.Table data='<uu5json/>[
          ["header1", "header2", "header3"],
          ["row 1.1", "row 1.2", "row 1.3"],         
          ["row 2.1", "row 2.2", "row 2.3"],         
          ["row 3.1", "row 3.2", "row 3.3"]         
        ]'/>`,
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
{/Table}`
    );
    uu5ToMdTest(
      "with attributes without value",
      `<uu5string/><UuApp.DesignKit.Table rowHeader colHeader transpose data='<uu5json/>[
          ["header1", "header2", "header3"],
          ["row 1.1", "row 1.2", "row 1.3"]      
        ]'/>`,
      `{Table}{:"colHeader":null,"rowHeader":null,"transpose":null}
*   header1
    *   header2
    *   header3
*   row 1.1
    *   row 1.2
    *   row 1.3
{/Table}`
    );
  });
  uu5ToMdTest(
    "with boolean attributes with false value",
    `<uu5string/><UuApp.DesignKit.Table rowHeader=false colHeader=false transpose=false data='<uu5json/>[
          ["header1", "header2", "header3"],
          ["row 1.1", "row 1.2", "row 1.3"]      
        ]'/>`,
    `{Table}
*   header1
    *   header2
    *   header3
*   row 1.1
    *   row 1.2
    *   row 1.3
{/Table}`
  );
});
