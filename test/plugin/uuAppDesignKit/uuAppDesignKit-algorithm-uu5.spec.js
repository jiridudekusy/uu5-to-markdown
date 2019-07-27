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

function uu5ToMdTest(name, uu5string, mdString, ignore) {
  it(name, () => {
    let parsed = uu5ToMarkdown.toMarkdown(uu5string);
    if(!ignore) {
      expect(parsed).to.be.equal(mdString);
    }else{
      console.warn(`Ignoring result of test ${name}`);
      console.log(parsed);
    }
  });
}

describe("UuApp.DesignKit.Algorithm", () => {
  uu5ToMdTest(
    "default",
    `<uu5string/>
<UuApp.DesignKit.Algorithm data="<uu5json/>{
  \\"id\\": \\"07c2b11a363ff436890b5667113b4175\\",
  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>This algorithm calculates the results of a set of quadratic equations(QE). Each QE is specified by <UU5.Bricks.Code>[a,b,c]</UU5.Bricks.Code> where <UU5.Bricks.Code>a</UU5.Bricks.Code>, <UU5.Bricks.Code>b</UU5.Bricks.Code>, <UU5.Bricks.Code>c</UU5.Bricks.Code> are real numbers. It means that defines the equation <UU5.Bricks.Code>ax2+bx+c=0</UU5.Bricks.Code>.<br />There is array of organized triads <UU5.Bricks.Code>inputList:[[a,b,c],[a,b,c],...]</UU5.Bricks.Code> in the <UU5.Bricks.Code>dtoIn</UU5.Bricks.Code>.<br />Algorithm is limited up to <UU5.Bricks.Code>20</UU5.Bricks.Code> of these triads.</UU5.Bricks.Div>\\",
  \\"statementList\\": [
    {
      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Initialize</UU5.Bricks.Div>\\",
      \\"id\\": \\"faf0fce27a77341ec9137c566055bbe5\\",
      \\"label\\": \\"1.\\",
      \\"type\\": \\"sequence\\",
      \\"collapsed\\": false,
      \\"statementList\\": [
        {
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Initialize <UU5.Bricks.Code>dtoOut</UU5.Bricks.Code>.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut = {uuAppErrorMap:{}, resultList: []}</UU5.Bricks.Code></UU5.Bricks.Div>\\",
          \\"id\\": \\"a815fecf3ba304d2dabb8b7d18b52435\\",
          \\"label\\": \\"1.1.\\",
          \\"type\\": \\"step\\"
        }
      ],
      \\"comment\\": \\"Initialize\\"
    },
    {
      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Because the algorithm is a standard <UU5.Bricks.Code>uuCmd</UU5.Bricks.Code> of <strong>uuApp architecture</strong>, the validation of <UU5.Bricks.Code>dtoIn</UU5.Bricks.Code> is also done standardly. The method <UU5.Bricks.Code>Validator.validate</UU5.Bricks.Code> with passed <UU5.Bricks.Code>dtoIn</UU5.Bricks.Code> and <UU5.Bricks.Code>dtoInType</UU5.Bricks.Code> is called. The validator fills in the <UU5.Bricks.Code>validationResult</UU5.Bricks.Code> which is written down into <UU5.Bricks.Code>uuAppErrorMap</UU5.Bricks.Code>. Standard warnings and errors  are created. Typically, 4 cases are checked:</UU5.Bricks.Div><UU5.Bricks.Ul><UU5.Bricks.Li>key type - error</UU5.Bricks.Li><UU5.Bricks.Li>key value (if it is constrained) - error</UU5.Bricks.Li><UU5.Bricks.Li>whether the key is required - error</UU5.Bricks.Li><UU5.Bricks.Li>whether the key is expected - unexpected keys are deleted - warning<br /></UU5.Bricks.Li></UU5.Bricks.Ul>\\",
      \\"id\\": \\"a383bf99c6fd94fa0b3d1d7fdfdde41a\\",
      \\"label\\": \\"2.\\",
      \\"type\\": \\"sequence\\",
      \\"collapsed\\": false,
      \\"statementList\\": [
        {
          \\"name\\": \\"\\",
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Standard uuCommand <UU5.Bricks.Code>dtoIn</UU5.Bricks.Code> validation.</UU5.Bricks.Div>\\",
          \\"id\\": \\"d7bc8c9ffd8624142adc1956b56efb50\\",
          \\"label\\": \\"2.1.\\",
          \\"type\\": \\"sequence\\",
          \\"collapsed\\": false,
          \\"statementList\\": [
            {
              \\"desc\\": \\"<uu5string />Call the <UU5.Bricks.Code>validate</UU5.Bricks.Code> method for <UU5.Bricks.Code>dtoIn</UU5.Bricks.Code> by <UU5.Bricks.Code>dtoInType</UU5.Bricks.Code> and fills <UU5.Bricks.Code>validationResult</UU5.Bricks.Code> with it.\\",
              \\"id\\": \\"18ff7f199a61449f09fb3a25a43a2690\\",
              \\"label\\": \\"2.1.1.\\",
              \\"type\\": \\"step\\"
            },
            {
              \\"name\\": \\"\\",
              \\"desc\\": \\"<uu5string />Call the <UU5.Bricks.Code id=\\\\\\"794b0e4f9942d46e98811d75bea7884a-code\\\\\\">validationHelper</UU5.Bricks.Code> that write <UU5.Bricks.Code id=\\\\\\"3e607bda7e4484fafa5175f636221471-code\\\\\\">validationResults</UU5.Bricks.Code> into the <UU5.Bricks.Code id=\\\\\\"2957dddd4d10b49cc8984ab99ef96b79-code\\\\\\">uuAppErrorMap</UU5.Bricks.Code>.\\",
              \\"id\\": \\"2d9e58778589c43a6be08b7b82e57cf2\\",
              \\"label\\": \\"2.1.2.\\",
              \\"type\\": \\"sequence\\",
              \\"collapsed\\": false,
              \\"statementList\\": [
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string />Write warning to uuAppErrorMap, if dtoIn contains unsupported keys.\\",
                  \\"id\\": \\"0e0ac7f3207644c608a56b5595d169dd\\",
                  \\"label\\": \\"2.1.2.1.\\",
                  \\"type\\": \\"warning\\",
                  \\"message\\": \\"DtoIn contains unsupported keys.\\",
                  \\"code\\": \\"unsupportedKeys\\",
                  \\"params\\": \\"unsupportedKeyList:[\\\\\\"...\\\\\\"] //unsupported dtoIn keys were deleted\\"
                },
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string />Write error to uuAppErrorMap and terminate, if dtoIn is not valid.\\",
                  \\"id\\": \\"9955501c546364192a814f8798b55aa2\\",
                  \\"label\\": \\"2.1.2.2.\\",
                  \\"type\\": \\"error\\",
                  \\"message\\": \\"DtoIn is not valid.\\",
                  \\"params\\": \\"invalidTypeKeyMap:{\\\\\\"...\\\\\\"} //map of keys with invalid type\\\\r\\\\ninvalidValueKeyMap:{\\\\\\"...\\\\\\"} //map of keys with invalid value\\\\r\\\\nmissingKeyMap:{\\\\\\"...\\\\\\"} //map of required keys\\",
                  \\"code\\": \\"invalidDtoIn\\",
                  \\"exception\\": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      \\"desc\\": \\"<uu5string />Calculate the result for each triads of the <UU5.Bricks.Code>inputList</UU5.Bricks.Code>.\\",
      \\"id\\": \\"6de05fb0f2e6d46cd8f1a9c8f2a80d54\\",
      \\"label\\": \\"3.\\",
      \\"type\\": \\"iteration\\",
      \\"condition\\": \\"<uu5string /><UU5.Bricks.Div><UU5.Bricks.Code>inputList.foreach</UU5.Bricks.Code></UU5.Bricks.Div>\\",
      \\"collapsed\\": false,
      \\"statementList\\": [
        {
          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Prepare result record into <UU5.Bricks.Code>dtoOut</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>a=dtoIn.inputList[i].a</UU5.Bricks.Code>, dtto for <UU5.Bricks.Code>b</UU5.Bricks.Code>, <UU5.Bricks.Code>c</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i]={a:a,b:b,c:c}</UU5.Bricks.Code></UU5.Bricks.Div>\\",
          \\"id\\": \\"aac9c21a598194fa5bc744aeafc608d2\\",
          \\"label\\": \\"3.1.\\",
          \\"type\\": \\"sequence\\"
        },
        {
          \\"comment\\": \\"// Test of the type ...\\",
          \\"desc\\": \\"<uu5string />Test the type of equation - <strong>quadratic</strong>, <strong>linear</strong>, <strong>constant</strong> (no equation)\\",
          \\"id\\": \\"490fe15db76ca47b587933090ef7a148\\",
          \\"label\\": \\"3.2.\\",
          \\"type\\": \\"selectionIf\\",
          \\"statementList\\": [
            {
              \\"desc\\": \\"<uu5string /><UU5.Bricks.Div><UU5.Bricks.Code>a</UU5.Bricks.Code> not equal 0 means <strong>quadratic equation</strong> (<UU5.Bricks.Code>ax2+bx+c=0</UU5.Bricks.Code>)</UU5.Bricks.Div>\\",
              \\"type\\": \\"if\\",
              \\"id\\": \\"1aa2d02e2ef4c48d89e51c4f31642741\\",
              \\"label\\": \\"3.2.A.\\",
              \\"collapsed\\": false,
              \\"statementList\\": [
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write type into <UU5.Bricks.Code id=\\\\\\"a5f45a1b79c9a45e5be5472941b5091a-code\\\\\\">dtoOut</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].type=\\\\\\"quadraticEquation\\\\\\"</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                  \\"id\\": \\"a6bcfd3fb25474152bc25141afcfc328\\",
                  \\"label\\": \\"3.2.A.1.\\",
                  \\"type\\": \\"step\\"
                },
                {
                  \\"comment\\": \\"\\",
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Calculate the discriminant <UU5.Bricks.Code>d</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>d=b<UU5.Bricks.Span style=\\\\\\"<uu5json />{\\\\\\\\\\\\\\"verticalAlign\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"super\\\\\\\\\\\\\\",\\\\\\\\\\\\\\"fontSize\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"0.8em\\\\\\\\\\\\\\"}\\\\\\">2</UU5.Bricks.Span>-4ac</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                  \\"id\\": \\"5f959ba698141443989e631ea6378865\\",
                  \\"label\\": \\"3.2.A.2.\\",
                  \\"type\\": \\"step\\"
                },
                {
                  \\"comment\\": \\"Test discriminant\\",
                  \\"desc\\": \\"<uu5string />Test of the discriminant\\",
                  \\"id\\": \\"301c12530f9e5407aa08513af1e99396\\",
                  \\"label\\": \\"3.2.A.3.\\",
                  \\"type\\": \\"selectionIf\\",
                  \\"statementList\\": [
                    {
                      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>The discriminant is positive.</UU5.Bricks.Div>\\",
                      \\"type\\": \\"if\\",
                      \\"id\\": \\"554031d40d2414a53a31b0737f0d7c34\\",
                      \\"label\\": \\"3.2.A.3.A.\\",
                      \\"collapsed\\": false,
                      \\"statementList\\": [
                        {
                          \\"comment\\": \\"\\",
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>There are two roots. Calculate them.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>x1=(-b-sqrt(d))/2a</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code id=\\\\\\"44d22320e5c6a4b63a1ebdf5144ab049-code\\\\\\">x2=(-b+sqrt(d))/2a</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div>sqrt(x) means square root of x.</UU5.Bricks.Div>\\",
                          \\"id\\": \\"32809f638cfd047ea98571ca3b99359d\\",
                          \\"label\\": \\"3.2.A.3.A.1.\\",
                          \\"type\\": \\"step\\"
                        },
                        {
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write the result to the <UU5.Bricks.Code>dtoOut</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].x1=x1</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code id=\\\\\\"51737ea37da394598bf2d108a44c1906-code\\\\\\">dtoOut.resultList[i].x2=x2</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                          \\"id\\": \\"1460dbdf8eb234dd99823ac2daf7d7ae\\",
                          \\"label\\": \\"3.2.A.3.A.2.\\",
                          \\"type\\": \\"step\\"
                        }
                      ],
                      \\"condition\\": \\"<uu5string /><UU5.Bricks.Code>d &gt; 0</UU5.Bricks.Code>\\"
                    },
                    {
                      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>The discriminant is negative.</UU5.Bricks.Div>\\",
                      \\"id\\": \\"772414b4a3a5448e699e65dbe4a09645\\",
                      \\"label\\": \\"3.2.A.3.B.\\",
                      \\"type\\": \\"elseIf\\",
                      \\"collapsed\\": false,
                      \\"statementList\\": [
                        {
                          \\"comment\\": \\"\\",
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>There are no solution on the set of real numbers but there are two roots on the set of complex numbers. Calculate them.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>xc1=[-b/2a,-sqrt(-d)/2a]</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code id=\\\\\\"0c89d7e278a6c40f4b71d566fce49c48-code\\\\\\">xc2=[-b/2a,sqrt(-d)/2a]</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div>sqrt(x) means square root of x.</UU5.Bricks.Div><UU5.Bricks.Div>Where complex number c = c1 + ic2. c1 is a real part and c2 is a imaginary part of complex number c.<br />So, there is a notation <UU5.Bricks.Code>c = [c1,c2]</UU5.Bricks.Code>.<br /></UU5.Bricks.Div>\\",
                          \\"id\\": \\"dc907445df133416eae10739fdd2e2e3\\",
                          \\"label\\": \\"3.2.A.3.B.1.\\",
                          \\"type\\": \\"step\\"
                        },
                        {
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write the result to the dtoOut</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].xc1=[-b/2a,-sqrt(-d)/2a]</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code id=\\\\\\"5a54d6f7ea07747ffae5879e3fde6d03-code\\\\\\">dtoOut.resultList[i].xc2=[-b/2a,+sqrt(-d)/2a]</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                          \\"id\\": \\"532dd562351c44245b059016b02c6ddb\\",
                          \\"label\\": \\"3.2.A.3.B.2.\\",
                          \\"type\\": \\"step\\"
                        },
                        {
                          \\"name\\": \\"\\",
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write warning to <UU5.Bricks.Code>uuAppErrorMap</UU5.Bricks.Code> into key <UU5.Bricks.Code>resultMap.i</UU5.Bricks.Code> that there is no solution on the set of real numbers.</UU5.Bricks.Div>\\",
                          \\"id\\": \\"1a6655dfcd02c42dc83103248d0c7e46\\",
                          \\"label\\": \\"3.2.A.3.B.3.\\",
                          \\"type\\": \\"warning\\",
                          \\"message\\": \\"There is no solution on the set of real numbers.\\",
                          \\"code\\": \\"complexRoots\\",
                          \\"params\\": \\"resultMap.i = {\\\\n  type:\\\\\\"warning\\\\\\",\\\\n  code:\\\\\\"complex roots\\\\\\",\\\\n  msg:msg\\\\n}\\"
                        }
                      ],
                      \\"condition\\": \\"<uu5string /><UU5.Bricks.Code>d &lt; 0</UU5.Bricks.Code>\\"
                    },
                    {
                      \\"desc\\": \\"<uu5string /><UU5.Bricks.Div><UU5.Bricks.Code>d = 0</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div>The discriminant is equal zero.</UU5.Bricks.Div>\\",
                      \\"id\\": \\"650d0b13475af41a5b2040f0b5e330c5\\",
                      \\"label\\": \\"3.2.A.3.C.\\",
                      \\"type\\": \\"else\\",
                      \\"collapsed\\": false,
                      \\"statementList\\": [
                        {
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div><UU5.Bricks.Code>x=-b/2a</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                          \\"id\\": \\"78c29bfb49ab34b2ba1a9e6934bf2515\\",
                          \\"label\\": \\"3.2.A.3.C.1.\\",
                          \\"type\\": \\"step\\"
                        },
                        {
                          \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write the result to the dtoOut.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].x=x</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                          \\"id\\": \\"d605cfb0f6b05458393bf077c5fe3dd7\\",
                          \\"label\\": \\"3.2.A.3.C.2.\\",
                          \\"type\\": \\"step\\"
                        },
                        {
                          \\"name\\": \\"\\",
                          \\"desc\\": \\"<uu5string />Write warning to <UU5.Bricks.Code>uuAppErrorMap</UU5.Bricks.Code> into the key <UU5.Bricks.Code>resultMap.i </UU5.Bricks.Code>that there is just one root - so called double root.\\",
                          \\"id\\": \\"b37186d362b394633ac115825278c6dc\\",
                          \\"label\\": \\"3.2.A.3.C.3.\\",
                          \\"type\\": \\"warning\\",
                          \\"message\\": \\"There is just one root (double root).\\",
                          \\"code\\": \\"doubleRoot\\",
                          \\"params\\": \\"resultMap.i = {\\\\n  type:\\\\\\"warning\\\\\\",\\\\n  code:\\\\\\"double root\\\\\\",\\\\n  msg:msg\\\\n}\\"
                        }
                      ]
                    }
                  ],
                  \\"collapsed\\": false
                }
              ],
              \\"condition\\": \\"<uu5string /><UU5.Bricks.Code>a !== 0</UU5.Bricks.Code>\\",
              \\"comment\\": \\"Quadratic equation\\"
            },
            {
              \\"desc\\": \\"<uu5string /><br /><UU5.Bricks.Div><UU5.Bricks.Code>b</UU5.Bricks.Code> not equal 0 means <strong>linear equation</strong> (<UU5.Bricks.Code>bx+c=0</UU5.Bricks.Code>)</UU5.Bricks.Div>\\",
              \\"id\\": \\"625ec0cbe5b504757bcfc56efb974bb8\\",
              \\"label\\": \\"3.2.B.\\",
              \\"type\\": \\"elseIf\\",
              \\"collapsed\\": false,
              \\"statementList\\": [
                {
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>There is one root of the linear equation. Calculate it.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>x=-c/b</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                  \\"id\\": \\"390747c8c893b45cba74989673cc7ccc\\",
                  \\"label\\": \\"3.2.B.1.\\",
                  \\"type\\": \\"step\\"
                },
                {
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write the result to the dtoOut.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code id=\\\\\\"62557690def3141ba8ad6c4594669725-code\\\\\\">dtoOut.resultList[i].type=\\\\\\"linearEquation\\\\\\"</UU5.Bricks.Code></UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].x=x</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                  \\"id\\": \\"16e8698cba5614a4db68e25eaac5b2c3\\",
                  \\"label\\": \\"3.2.B.2.\\",
                  \\"type\\": \\"step\\"
                },
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div style=\\\\\\"<uu5json />{}\\\\\\">Write warning to <UU5.Bricks.Code id=\\\\\\"a765c17758f074770a1396cadaa9c27f-code\\\\\\">uuAppErrorMap</UU5.Bricks.Code> into the key <UU5.Bricks.Code id=\\\\\\"a6b4de76caeee482daf0b87fa736b9e2-code\\\\\\">resultMap.i </UU5.Bricks.Code>that the equation is linear and there is just one root.</UU5.Bricks.Div><br />\\",
                  \\"id\\": \\"db531a398565c48ceb13e909ef799422\\",
                  \\"label\\": \\"3.2.B.3.\\",
                  \\"type\\": \\"warning\\",
                  \\"message\\": \\"The specified equation is linear. So there is just one root.\\",
                  \\"params\\": \\"resultMap.i = {\\\\n  type:\\\\\\"warning\\\\\\",\\\\n  code:\\\\\\"linear equation\\\\\\",\\\\n  msg:msg\\\\n}\\",
                  \\"code\\": \\"linearEquation\\"
                }
              ],
              \\"condition\\": \\"<uu5string /><UU5.Bricks.Code>b !== 0</UU5.Bricks.Code>\\",
              \\"comment\\": \\"linear equation\\"
            },
            {
              \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>This is the situation when the equation is <UU5.Bricks.Code>c = 0</UU5.Bricks.Code> where <UU5.Bricks.Code>c !== 0</UU5.Bricks.Code>. It is <strong>obvious nonsense</strong>.</UU5.Bricks.Div>\\",
              \\"id\\": \\"b6b3b7f67e88e4fdca3cd5245d6b85b0\\",
              \\"label\\": \\"3.2.C.\\",
              \\"type\\": \\"elseIf\\",
              \\"collapsed\\": false,
              \\"statementList\\": [
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write the result to the dtoOut.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].type = \\\\\\"nonsense\\\\\\"</UU5.Bricks.Code></UU5.Bricks.Div><br />\\",
                  \\"id\\": \\"06888c22b677a499c8271aedf338def9\\",
                  \\"label\\": \\"3.2.C.1.\\",
                  \\"type\\": \\"step\\"
                },
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string />Write error to <UU5.Bricks.Code id=\\\\\\"a765c17758f074770a1396cadaa9c27f-code-code\\\\\\">uuAppErrorMap</UU5.Bricks.Code> into the key <UU5.Bricks.Code id=\\\\\\"a6b4de76caeee482daf0b87fa736b9e2-code-code\\\\\\">resultMap.i </UU5.Bricks.Code>that the specified situation is a nonsense.\\",
                  \\"id\\": \\"7e6385d33af9b4e02a168cf3d5f925ad\\",
                  \\"label\\": \\"3.2.C.2.\\",
                  \\"type\\": \\"error\\",
                  \\"message\\": \\"The specified situation is a nonsense. It is not a correct equation. This means there is no solution.\\",
                  \\"params\\": \\"resultMap.i = {\\\\n  type:\\\\\\"error\\\\\\",\\\\n  code:\\\\\\"nonsense\\\\\\",\\\\n  msg:msg\\\\n}\\\\n  \\",
                  \\"code\\": \\"nonsense\\",
                  \\"comment\\": \\"\\",
                  \\"exception\\": false
                }
              ],
              \\"condition\\": \\"<uu5string /><UU5.Bricks.Code>c !== 0</UU5.Bricks.Code>\\",
              \\"comment\\": \\"nonsense\\"
            },
            {
              \\"comment\\": \\"tautology\\",
              \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>This is the situation when the equation is  <UU5.Bricks.Code>c=0</UU5.Bricks.Code> where <UU5.Bricks.Code>c = 0</UU5.Bricks.Code>. It is a <strong>tautology</strong> - always true.</UU5.Bricks.Div>\\",
              \\"id\\": \\"7c7776680d57442caab93a7034812de0\\",
              \\"label\\": \\"3.2.D.\\",
              \\"type\\": \\"else\\",
              \\"collapsed\\": false,
              \\"statementList\\": [
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string /><UU5.Bricks.Div>Write the result to the dtoOut.</UU5.Bricks.Div><UU5.Bricks.Div><UU5.Bricks.Code>dtoOut.resultList[i].type = \\\\\\"tautology\\\\\\"</UU5.Bricks.Code></UU5.Bricks.Div>\\",
                  \\"id\\": \\"1ddb4c31244e844568c21b86d90f4f1d\\",
                  \\"label\\": \\"3.2.D.1.\\",
                  \\"type\\": \\"step\\"
                },
                {
                  \\"name\\": \\"\\",
                  \\"desc\\": \\"<uu5string />Write warning to <UU5.Bricks.Code id=\\\\\\"a765c17758f074770a1396cadaa9c27f-code-code-code\\\\\\">uuAppErrorMap</UU5.Bricks.Code> into the key <UU5.Bricks.Code id=\\\\\\"a6b4de76caeee482daf0b87fa736b9e2-code-code-code\\\\\\">resultMap.i </UU5.Bricks.Code>that the specified situation is a tautology.\\",
                  \\"id\\": \\"967d23f0ce7b741238fdbef94456822f\\",
                  \\"label\\": \\"3.2.D.2.\\",
                  \\"type\\": \\"warning\\",
                  \\"message\\": \\"The specified situation brings a tautology (always true).\\",
                  \\"code\\": \\"tautology\\",
                  \\"params\\": \\"resultMap.i = {\\\\n  type:\\\\\\"warning\\\\\\",\\\\n  code:\\\\\\"tautology\\\\\\",\\\\n  msg:msg\\\\n}\\"
                }
              ]
            }
          ],
          \\"collapsed\\": false
        }
      ],
      \\"comment\\": \\"Iterate inputList\\"
    },
    {
      \\"desc\\": \\"<uu5string />Return properly filled <UU5.Bricks.Code id=\\\\\\"0a19a4ebb5ffe4f0cb6ce40022895b82-code\\\\\\">dtoOut</UU5.Bricks.Code> with results.\\",
      \\"id\\": \\"512b0e6febab7432cb04fd70335fc5fb\\",
      \\"label\\": \\"4.\\",
      \\"type\\": \\"step\\"
    }
  ],
  \\"name\\": \\"Calculation of set of quadratic equations (QE)\\",
  \\"errorPrefix\\": \\"ucl-algorithms-main/solveQuadraticEquation/\\"
}"/>`,
    ``,
    //TODO: Work-in-progress !!!
    true
  );
});

