import Setup from "../../withUU5/tools/setup";
Setup()
import chai from "chai";
import UU5ToMarkdown from "../../../src/uu5-to-markdown.js";
import UuAppDesignKitPlugin from "../../../src/plugin/uuAppDesignKit/uuAppDesignKit-plugin"
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";
import Core from "uu5g04-core";

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

describe("UuApp.DesignKit.Scenario", () => {
//   uu5ToMdTest(
//     "default(link,text,text)",
//     `<uu5string/>
// <UuApp.DesignKit.Scenario data='[
//   {
//     \\"content\\": \\"Check if mock is configured for uri.\\",
//     \\"itemList\\": [
//       {
//         \\"content\\": \\"Check if there exists one following files : [uuMocker_mocks_dir]/[product]/[command].json, [uuMocker_mocks_dir]/[product]/[command].conf.json\\",
//         \\"itemList\\": [
//           {
//             \\"content\\": \\"No mock configuration file exists\\",
//             \\"itemList\\": [
//               {
//                 \\"content\\": \\"Load file [uuMocker_mocks_dir]/mocks.json.\\",
//                 \\"itemList\\": [
//                   {
//                     \\"content\\": \\"File mocks.json does not exists\\",
//                     \\"itemList\\": [
//                       {
//                         \\"content\\": \\"Throws the noTargetUri exception.\\",
//                         \\"itemList\\": [],
//                         \\"type\\": \\"alternative\\",
//                         \\"id\\": \\"665c2f1caca8945bbaf0b0dec91798e5\\",
//                         \\"numbering\\": \\"1.\\",
//                         \\"number\\": \\"1.\\",
//                         \\"mainParent\\": {
//                           \\"type\\": \\"alternativeTitle\\",
//                           \\"numbering\\": \\"A2\\"
//                         }
//                       },
//                       {
//                         \\"content\\": \\"Scenario immediatelly ends.\\",
//                         \\"itemList\\": [],
//                         \\"type\\": \\"alternative\\",
//                         \\"id\\": \\"858fff78a72ab47ec8b08faf52a5db44\\",
//                         \\"numbering\\": \\"2.\\",
//                         \\"number\\": \\"2.\\",
//                         \\"mainParent\\": {
//                           \\"type\\": \\"alternativeTitle\\",
//                           \\"numbering\\": \\"A2\\"
//                         }
//                       }
//                     ],
//                     \\"type\\": \\"alternativeTitle\\",
//                     \\"id\\": \\"e0600dbba51944446b0c002ad6a2d7ab\\",
//                     \\"numbering\\": \\"A2\\"
//                   }
//                 ],
//                 \\"type\\": \\"alternative\\",
//                 \\"id\\": \\"625c0c75912894d5296fb7f2692f5955\\",
//                 \\"numbering\\": \\"1.\\",
//                 \\"number\\": \\"1.\\",
//                 \\"mainParent\\": {
//                   \\"type\\": \\"alternativeTitle\\",
//                   \\"numbering\\": \\"A1\\"
//                 }
//               },
//               {
//                 \\"content\\": \\"Additional step\\",
//                 \\"itemList\\": [],
//                 \\"type\\": \\"alternative\\",
//                 \\"id\\": \\"f9e553bf78653429f9f98a3cb45a8934\\",
//                 \\"numbering\\": \\"2.\\",
//                 \\"number\\": \\"2.\\",
//                 \\"mainParent\\": {
//                   \\"type\\": \\"alternativeTitle\\",
//                   \\"numbering\\": \\"A1\\"
//                 }
//               }
//             ],
//             \\"type\\": \\"alternativeTitle\\",
//             \\"id\\": \\"b68c0341fcccf4bbd8fba9338cfa8a11\\",
//             \\"numbering\\": \\"A1\\"
//           }
//         ],
//         \\"type\\": \\"happyDay\\",
//         \\"id\\": \\"71bed0bde819048cbb88bcd593b0d245\\",
//         \\"numbering\\": \\"HDS 1.1.\\",
//         \\"number\\": \\"1.1.\\"
//       }
//     ],
//     \\"type\\": \\"happyDay\\",
//     \\"id\\": \\"c88747d64259a4b5284b5dcd375fc1c7\\",
//     \\"numbering\\": \\"HDS 1.\\",
//     \\"number\\": \\"1.\\"
//   },
//   {
//     \\"content\\": \\"Another HDS step\\",
//     \\"itemList\\": [],
//     \\"type\\": \\"happyDay\\",
//     \\"id\\": \\"5433e0cf60685455fa612b3237b881fb\\",
//     \\"numbering\\": \\"HDS 2.\\",
//     \\"number\\": \\"2.\\"
//   },
//   {
//     \\"content\\": \\"Calls next middleware\\",
//     \\"itemList\\": [],
//     \\"type\\": \\"happyDay\\",
//     \\"id\\": \\"2c2460f5acac54ed0ac54fb73c5f4674\\",
//     \\"numbering\\": \\"HDS 3.\\",
//     \\"number\\": \\"3.\\"
//   }
// ]' header=''/>`,
//     ``
//   );
});

