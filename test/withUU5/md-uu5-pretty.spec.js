import Setup from "./tools/setup";
import chai from "chai";
import UU5Prettifyer from "../../src/uu5-prettifyer";

chai.expect();

const expect = chai.expect;

const uu5prettifyer = new UU5Prettifyer();

function prettyPrintTest(name, input, expectedOutput) {
  it(name, () => {
    let prettyUu5 = uu5prettifyer.prettify(input);
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
        <UU5.Bricks.Li>Content 1.1 </UU5.Bricks.Li>
        <UU5.Bricks.Li>Content 1.2 </UU5.Bricks.Li>
      </UU5.Bricks.Ol>
    </UU5.Bricks.Li>
    <UU5.Bricks.Li>Content 2 </UU5.Bricks.Li>
    <UU5.Bricks.Li>Content 3 </UU5.Bricks.Li>
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
  <UuApp.DesignKit.UuCmdInfo data='<uu5json/>[
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
  prettyPrintTest("DesignKitCodeJSONwithUU5String",
    `<uu5string/>
<UU5.Bricks.Section header="Error list">
    <UuApp.DesignKit.UuCmdErrorList data='<uu5json/>[
    ["xmlParseError","Error","An exception occurred during verification of XML.","cause: {…SAXException}"],
    ["validationError","Error","The document contains invalid content.","\\"validationErrors\\":{…}"],
    ["mappingError","Error","Could not map the document.","cause: {…RuntimeException}"],
    ["remoteCallFailed","Error","An error occurred during remote system call.","\\"cause\\":{…RuntimeException}"],
    ["persistenceError","Error","A persistence error occurred.","<uu5string/>\\"dbObject\\":{…},<br/>\\n\\"cause\\": {…DatastoreRuntimeException}"]
  ]'/>
  </UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="Error list">
  <UuApp.DesignKit.UuCmdErrorList data='<uu5json/>[
    ["xmlParseError","Error","An exception occurred during verification of XML.","cause: {…SAXException}"],
    ["validationError","Error","The document contains invalid content.","\\"validationErrors\\":{…}"],
    ["mappingError","Error","Could not map the document.","cause: {…RuntimeException}"],
    ["remoteCallFailed","Error","An error occurred during remote system call.","\\"cause\\":{…RuntimeException}"],
    ["persistenceError","Error","A persistence error occurred.","<uu5string/>\\"dbObject\\":{…},<br/>\\n\\"cause\\": {…DatastoreRuntimeException}"]
  ]'/>
</UU5.Bricks.Section>`
  );
  prettyPrintTest("inilineTags",
    `<uu5string/><UU5.Bricks.Section header="My Header"> <UU5.Bricks.P>Some <UU5.Bricks.Code>text</UU5.Bricks.Code></UU5.Bricks.P></UU5.Bricks.Section>`,
    `<uu5string/>
<UU5.Bricks.Section header="My Header">
  <UU5.Bricks.P>Some <UU5.Bricks.Code>text</UU5.Bricks.Code></UU5.Bricks.P>
</UU5.Bricks.Section>`
  );


});
