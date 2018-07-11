import Setup from "./tools/setup";
import chai from "chai";
import {pd} from "../../src/tools/markdownRenderer/pretty-data";

chai.expect();

const expect = chai.expect;


function prettyPrintTest(name, input, expectedOutput) {
  it(name, () => {
    let prettyUu5 = pd.xml(input);
    expect(prettyUu5).to.be.equal(expectedOutput);
  });
}

describe("UU5PrettyPrint", () => {
  prettyPrintTest("default",
  `<uu5string/><UU5.Bricks.Section header="My Header"> <UU5.Bricks.P>Some text</UU5.Bricks.P></UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="My Header">
  <UU5.Bricks.P>Some text</UU5.Bricks.P>
</UU5.Bricks.Section>`
  );
  prettyPrintTest("nestedLi",
    `<uu5string/><UU5.Bricks.Section header="Header"><UU5.Bricks.Ol><UU5.Bricks.Li>Content 1<UU5.Bricks.Ol>
        <UU5.Bricks.Li>
          Content 1.1
        </UU5.Bricks.Li>
        <UU5.Bricks.Li>
          Content 1.2
        </UU5.Bricks.Li>
      </UU5.Bricks.Ol>
    </UU5.Bricks.Li>
    <UU5.Bricks.Li>
      Content 2
    </UU5.Bricks.Li>
    <UU5.Bricks.Li>
      Content 3
    </UU5.Bricks.Li>
  </UU5.Bricks.Ol>
</UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="Header">
  <UU5.Bricks.Ol>
    <UU5.Bricks.Li>Content 1
      <UU5.Bricks.Ol>
        <UU5.Bricks.Li>
          Content 1.1
        </UU5.Bricks.Li>
        <UU5.Bricks.Li>
          Content 1.2
        </UU5.Bricks.Li>
      </UU5.Bricks.Ol>
    </UU5.Bricks.Li>
    <UU5.Bricks.Li>
      Content 2
    </UU5.Bricks.Li>
    <UU5.Bricks.Li>
      Content 3
    </UU5.Bricks.Li>
  </UU5.Bricks.Ol>
</UU5.Bricks.Section>`
  );
  prettyPrintTest("DesignKitJSON",
    `<uu5string/>
  <UU5.Bricks.Section header="Basic Information">
    <UuApp.DesignKit.UuCmdInfo data='<uu5json/>[
      "uuCMD createArea",
      "This command will create new Area.",
      "post",
      "https://{gateway}/{vendor}-{uuApp}-{uuSubApp}/{tid}-{awid}/createArea",
      "Executives"
    ]'/>
  </UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="Basic Information">
  <UuApp.DesignKit.UuCmdInfo data='
    <uu5json/>[
      "uuCMD createArea",
      "This command will create new Area.",
      "post",
      "https://{gateway}/{vendor}-{uuApp}-{uuSubApp}/{tid}-{awid}/createArea",
      "Executives"
    ]'/>
  </UU5.Bricks.Section>`
  );
  prettyPrintTest("DesignKitCodeJSON",
    `<uu5string/>
<UU5.Bricks.Section header="Input (dtoIn)">
  <UuApp.DesignKit.EmbeddedText label="dtoIn" codeStyle="javascript">
    const createAreaDtoInSchema = {
      name: "...", //name of the area
      EIC: "10Y...", //user defined EIC code unique for given time validity
      type: "MBA", //type of an area - Market Balance Area or Bidding Zone, one of [MBA, BZN] 
      TSO: "...", //reference to a responsible Organization (EIC code) 
      includedInArea: "...", //reference to superior area in hierarchy. It is used for BZN included in MBA. Empty for MBAs. (code)
      needsBZNLevel: true, //define if the needs are submitted on BZN or MBA level (boolean)
      validFrom: "...", //starting date of area time validity. CET/CEST day. Stored in UTC on database level.
      validTo: "..." //ending date of area time validity. CET/CEST day. Stored in UTC on database level. Null value mean unlimited validity.
    };
  </UuApp.DesignKit.EmbeddedText>
</UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="Input (dtoIn)">
  <UuApp.DesignKit.EmbeddedText label="dtoIn" codeStyle="javascript">
    const createAreaDtoInSchema = {
      name: "...", //name of the area
      EIC: "10Y...", //user defined EIC code unique for given time validity
      type: "MBA", //type of an area - Market Balance Area or Bidding Zone, one of [MBA, BZN] 
      TSO: "...", //reference to a responsible Organization (EIC code) 
      includedInArea: "...", //reference to superior area in hierarchy. It is used for BZN included in MBA. Empty for MBAs. (code)
      needsBZNLevel: true, //define if the needs are submitted on BZN or MBA level (boolean)
      validFrom: "...", //starting date of area time validity. CET/CEST day. Stored in UTC on database level.
      validTo: "..." //ending date of area time validity. CET/CEST day. Stored in UTC on database level. Null value mean unlimited validity.
    };
  </UuApp.DesignKit.EmbeddedText>
</UU5.Bricks.Section>`
  );
  prettyPrintTest("DesignKitCodeJSONwithIndents",
    `<uu5string/>
<UU5.Bricks.Section header="Validation Schema (dtoInType)">
    <UuApp.DesignKit.EmbeddedText label="dtoInType" codeStyle="javascript">
  const processDefinitionListDtoInType = shape({
      code: code(),
      pageInfo: shape({
        pageIndex: integer(0, null),
        pageSize: integer(1, 1000)
      })
    })
    </UuApp.DesignKit.EmbeddedText>
    </UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="Validation Schema (dtoInType)">
  <UuApp.DesignKit.EmbeddedText label="dtoInType" codeStyle="javascript">
  const processDefinitionListDtoInType = shape({
      code: code(),
      pageInfo: shape({
        pageIndex: integer(0, null),
        pageSize: integer(1, 1000)
      })
    })
    </UuApp.DesignKit.EmbeddedText>
</UU5.Bricks.Section>`
  );


});
