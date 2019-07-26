import Setup from "../../withUU5/tools/setup";
import chai from "chai";
import UU5ToMarkdown from "../../../src/uu5-to-markdown.js";
import UuAppDesignKitPlugin from "../../../src/plugin/uuAppDesignKit/uuAppDesignKit-plugin"
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";
import Core from "uu5g04-core";

Setup()

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

describe("UuApp.DesignKit.Algorithm", () => {
  uu5ToMdTest(
    "default",
    `<uu5string/>
<UuApp.DesignKit.Algorithm data="<uu5json/>{
  \\"id\\": \\"c2549d54e158e4314b7c68932969d8bb\\",
  \\"name\\": \\"JDK Test algorithm\\",
  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Describtion of test algorithm.</UU5.Bricks.Div><br />\\",
  \\"errorPrefix\\": \\"jdk-test-main/testCmd\\",
  \\"statementList\\": [
    {
      \\"id\\": \\"a23ef2d6ebc13448486c3c1a9a1a9fc8\\",
      \\"label\\": \\"1.\\",
      \\"type\\": \\"step\\",
      \\"name\\": \\"\\",
      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Step1 descrbtion</UU5.Bricks.Div>\\",
      \\"comment\\": \\"Step 1 name\\"
    },
    {
      \\"name\\": \\"\\",
      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>run all statements in sequence 1</UU5.Bricks.Div>\\",
      \\"id\\": \\"886dc65354d4b43138ed5d4f7f65c047\\",
      \\"label\\": \\"2.\\",
      \\"type\\": \\"sequence\\",
      \\"comment\\": \\"sequence 1 name\\",
      \\"collapsed\\": false,
      \\"statementList\\": [
        {
          \\"name\\": \\"\\",
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>step 1 in sequence 1</UU5.Bricks.Div>\\",
          \\"id\\": \\"f84c6bb276a8e43249193cfab71817d1\\",
          \\"label\\": \\"2.1.\\",
          \\"type\\": \\"step\\",
          \\"comment\\": \\"sequence 1 step 1\\"
        },
        {
          \\"name\\": \\"\\",
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>step 2 in sequence 1</UU5.Bricks.Div>\\",
          \\"id\\": \\"c0baacf49cd9d42f493c93032beeea8b\\",
          \\"label\\": \\"2.2.\\",
          \\"type\\": \\"step\\",
          \\"comment\\": \\"sequence 1 step 2\\"
        }
      ]
    },
    {
      \\"name\\": \\"\\",
      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>selection1 describtion</UU5.Bricks.Div>\\",
      \\"id\\": \\"606d3d593875e4f8eafe0beb98b086a7\\",
      \\"label\\": \\"3.\\",
      \\"type\\": \\"selectionIf\\",
      \\"statementList\\": [
        {
          \\"name\\": \\"\\",
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>test if a is 5</UU5.Bricks.Div>\\",
          \\"type\\": \\"if\\",
          \\"id\\": \\"7aece616e057a406e83333da948ba8f5\\",
          \\"label\\": \\"3.A.\\",
          \\"comment\\": \\"if1 name\\",
          \\"condition\\": \\"<uu5string /><UU5.Bricks.Div><UU5.Bricks.Code>a</UU5.Bricks.Code> == 5</UU5.Bricks.Div>\\",
          \\"collapsed\\": false,
          \\"statementList\\": [
            {
              \\"name\\": \\"\\",
              \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>print a + 10</UU5.Bricks.Div>\\",
              \\"id\\": \\"3d297116edfa24c63bd25014799cba3f\\",
              \\"label\\": \\"3.A.1.\\",
              \\"type\\": \\"step\\",
              \\"comment\\": \\"a is 5\\"
            }
          ]
        },
        {
          \\"name\\": \\"\\",
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>test if a is 10</UU5.Bricks.Div>\\",
          \\"id\\": \\"1324cd1f833c649ba83fa5321fd5981c\\",
          \\"label\\": \\"3.B.\\",
          \\"type\\": \\"elseIf\\",
          \\"comment\\": \\"elseif name\\",
          \\"condition\\": \\"<uu5string /><UU5.Bricks.Div><UU5.Bricks.Code>a</UU5.Bricks.Code> == 10</UU5.Bricks.Div>\\",
          \\"collapsed\\": false,
          \\"statementList\\": [
            {
              \\"name\\": \\"\\",
              \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>print a + 20</UU5.Bricks.Div>\\",
              \\"id\\": \\"38d61dcf56f4c41efa277348fcaf0a90\\",
              \\"label\\": \\"3.B.1.\\",
              \\"type\\": \\"step\\",
              \\"comment\\": \\"a is 10\\"
            }
          ]
        },
        {
          \\"name\\": \\"\\",
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>elsse statement</UU5.Bricks.Div>\\",
          \\"id\\": \\"d69ab91f87c4f4e7981bb21a853ba803\\",
          \\"label\\": \\"3.C.\\",
          \\"type\\": \\"else\\",
          \\"comment\\": \\"else name\\",
          \\"collapsed\\": false,
          \\"statementList\\": [
            {
              \\"name\\": \\"\\",
              \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>else error</UU5.Bricks.Div>\\",
              \\"id\\": \\"d0e8934ee987a4e70b6bcc37f42725b7\\",
              \\"label\\": \\"3.C.1.\\",
              \\"type\\": \\"error\\",
              \\"comment\\": \\"else error\\",
              \\"message\\": \\"Value is not valid\\",
              \\"params\\": \\"value\\",
              \\"code\\": \\"invalidValue\\",
              \\"exception\\": true
            }
          ]
        }
      ],
      \\"comment\\": \\"selection 1 name\\"
    },
    {
      \\"name\\": \\"\\",
      \\"desc\\": \\"\\",
      \\"id\\": \\"e8fb95c8ea256413b8513468ebb9d842\\",
      \\"label\\": \\"4.\\",
      \\"type\\": \\"step\\",
      \\"comment\\": \\"comment\\"
    }
  ]
}"/>`,
    ``
  );
});

