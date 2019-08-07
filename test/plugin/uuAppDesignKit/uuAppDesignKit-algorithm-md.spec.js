import Setup from "../../withUU5/tools/setup";
import chai from "chai";
import {MarkdownRenderer} from "uu5codekitg01";
import UuAppDesignKitPlugin from "../../../src/plugin/uuAppDesignKit/uuAppDesignKit-plugin"
import Core from "uu5g04-core";
import Uu5BricksPlugin from "../../../src/plugin/uu5Bricks/uu5Bricks-plugin";

Setup();

chai.expect();

const expect = chai.expect;

let uuAppDesignKitPlugin = new UuAppDesignKitPlugin({uu5Core: Core});
let uu5BricksPlugin = new Uu5BricksPlugin();

let markdownToUu5 = new MarkdownRenderer("full", {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
uuAppDesignKitPlugin.applyMarkdownPlugin(markdownToUu5);
uu5BricksPlugin.applyMarkdownPlugin(markdownToUu5);

function mdToUu5Test(name, mdString, uu5String, ignore) {
  it(name, () => {
    let parsed = markdownToUu5.render(mdString);
    if (!ignore) {
      expect(parsed).to.be.equal(uu5String);
    } else {
      console.log(parsed);
    }
  });
}

describe("UuApp.DesignKit.Algorithm", () => {
  describe("default", () => {
    mdToUu5Test(
      "with link in first column, text in desc",
      `{algorithm}
*   Name: Calculation of set of quadratic equations (QE)
*   Description: This algorithm calculates the results of a set of quadratic equations(QE). Each QE is specified by \`[a,b,c]\` where \`a\`, \`b\`, \`c\` are real numbers. It means that defines the equation \`ax2+bx+c=0\`.    
    There is array of organized triads \`inputList:[[a,b,c],[a,b,c],...]\` in the \`dtoIn\`.    
    Algorithm is limited up to \`20\` of these triads.
    
*   Error Prefix: ucl-algorithms-main/solveQuadraticEquation/

1.  Sequence: //Initialize  
    Description: Initialize  
    Statements:  
    1.  Step: //  
        Description: Initialize \`dtoOut\`.  

        \`dtoOut = {uuAppErrorMap:{}, resultList: []}\`

2.  Sequence: //  
    Description: Because the algorithm is a standard \`uuCmd\` of **uuApp architecture**, the validation of \`dtoIn\` is also done standardly. The method \`Validator.validate\` with passed \`dtoIn\` and \`dtoInType\` is called. The validator fills in the \`validationResult\` which is written down into \`uuAppErrorMap\`. Standard warnings and errors are created. Typically, 4 cases are checked:  

    *   key type - error  
    *   key value (if it is constrained) - error  
    *   whether the key is required - error  
    *   whether the key is expected - unexpected keys are deleted - warning
    
    Statements:  
    1.  Sequence: //  
        Description: Standard uuCommand \`dtoIn\` validation.  
        Statements:  
        1.  Step: //  
            Description: Call the \`validate\` method for \`dtoIn\` by \`dtoInType\` and fills \`validationResult\` with it.  
        2.  Sequence: //  
            Description: Call the \`validationHelper\` that write \`validationResults\` into the \`uuAppErrorMap\`.  
            Statements:  
            1.  Warning: //  
                Description: Write warning to uuAppErrorMap, if dtoIn contains unsupported keys.  
                Code: unsupportedKeys  
                Message: DtoIn contains unsupported keys.  
                Params: unsupportedKeyList:["..."] //unsupported dtoIn keys were deleted  
            2.  Error: //  
                Description: Write error to uuAppErrorMap and terminate, if dtoIn is not valid.  
                Code: invalidDtoIn  
                Message: DtoIn is not valid.  
                Throw exception: true  
                Params: invalidTypeKeyMap:{"..."} //map of keys with invalid type  
                invalidValueKeyMap:{"..."} //map of keys with invalid value  
                missingKeyMap:{"..."} //map of required keys

3.  Iteration: //Iterate inputList  
    Description: Calculate the result for each triads of the \`inputList\`.  
    Statements:  
    1.  Sequence: //  
        Description: Prepare result record into \`dtoOut\`  

        \`a=dtoIn.inputList[i].a\`, dtto for \`b\`, \`c\`  

        \`dtoOut.resultList[i]={a:a,b:b,c:c}\`

    2.  SelectionIf: //// Test of the type ...  
        Description: Test the type of equation - **quadratic**, **linear**, **constant** (no equation)  
        Statements:  
        A.  If: //Quadratic equation  
            Condition: \`a !== 0\`  
            Description: \`a\` not equal 0 means **quadratic equation** (\`ax2+bx+c=0\`)  
            Statements:  
            1.  Step: //  
                Description: Write type into \`dtoOut\`  

                \`dtoOut.resultList[i].type="quadraticEquation"\`

            2.  Step: //  
                Description: Calculate the discriminant \`d\`  

                \`d=b<UU5.Bricks.Span style='<uu5json/>{"verticalAlign":"super","fontSize":"0.8em"}'>2</UU5.Bricks.Span>-4ac\`

            3.  SelectionIf: //Test discriminant  
                Description: Test of the discriminant  
                Statements:  
                A.  If: //  
                    Condition: \`d > 0\`  
                    Description: The discriminant is positive.  
                    Statements:  
                    1.  Step: //  
                        Description: There are two roots. Calculate them.  

                        \`x1=(-b-sqrt(d))/2a\`  

                        \`x2=(-b+sqrt(d))/2a\`  

                        sqrt(x) means square root of x.

                    2.  Step: //  
                        Description: Write the result to the \`dtoOut\`  

                        \`dtoOut.resultList[i].x1=x1\`  

                        \`dtoOut.resultList[i].x2=x2\`

                B.  ElseIf: //  
                    Condition: \`d < 0\`  
                    Description: The discriminant is negative.  
                    Statements:  
                    1.  Step: //  
                        Description: There are no solution on the set of real numbers but there are two roots on the set of complex numbers. Calculate them.  

                        \`xc1=[-b/2a,-sqrt(-d)/2a]\`  

                        \`xc2=[-b/2a,sqrt(-d)/2a]\`  

                        sqrt(x) means square root of x.  

                        Where complex number c = c1 + ic2. c1 is a real part and c2 is a imaginary part of complex number c.    
                        So, there is a notation \`c = [c1,c2]\`.

                    2.  Step: //  
                        Description: Write the result to the dtoOut  

                        \`dtoOut.resultList[i].xc1=[-b/2a,-sqrt(-d)/2a]\`  

                        \`dtoOut.resultList[i].xc2=[-b/2a,+sqrt(-d)/2a]\`

                    3.  Warning: //  
                        Description: Write warning to \`uuAppErrorMap\` into key \`resultMap.i\` that there is no solution on the set of real numbers.  
                        Code: complexRoots  
                        Message: There is no solution on the set of real numbers.  
                        Params: resultMap.i = {  
                          type:"warning",  
                          code:"complex roots",  
                          msg:msg  
                        }

                C.  Else: //  
                    Description: \`d = 0\`  

                    The discriminant is equal zero.

                    Statements:  
                    1.  Step: //  
                        Description: \`x=-b/2a\`  
                    2.  Step: //  
                        Description: Write the result to the dtoOut.  

                        \`dtoOut.resultList[i].x=x\`

                    3.  Warning: //  
                        Description: Write warning to \`uuAppErrorMap\` into the key \`resultMap.i\`that there is just one root - so called double root.  
                        Code: doubleRoot  
                        Message: There is just one root (double root).  
                        Params: resultMap.i = {  
                          type:"warning",  
                          code:"double root",  
                          msg:msg  
                        }

        B.  ElseIf: //linear equation  
            Condition: \`b !== 0\`  
            Description:     

            \`b\` not equal 0 means **linear equation** (\`bx+c=0\`)

            Statements:  
            1.  Step: //  
                Description: There is one root of the linear equation. Calculate it.  

                \`x=-c/b\`

            2.  Step: //  
                Description: Write the result to the dtoOut.  

                \`dtoOut.resultList[i].type="linearEquation"\`  

                \`dtoOut.resultList[i].x=x\`

            3.  Warning: //  
                Description: {}">Write warning to \`uuAppErrorMap\` into the key \`resultMap.i\`that the equation is linear and there is just one root.  
                Code: linearEquation  
                Message: The specified equation is linear. So there is just one root.  
                Params: resultMap.i = {  
                  type:"warning",  
                  code:"linear equation",  
                  msg:msg  
                }

        C.  ElseIf: //nonsense  
            Condition: \`c !== 0\`  
            Description: This is the situation when the equation is \`c = 0\` where \`c !== 0\`. It is **obvious nonsense**.  
            Statements:  
            1.  Step: //  
                Description: Write the result to the dtoOut.  

                \`dtoOut.resultList[i].type = "nonsense"\`

            2.  Error: //  
                Description: Write error to \`uuAppErrorMap\` into the key \`resultMap.i\`that the specified situation is a nonsense.  
                Code: nonsense  
                Message: The specified situation is a nonsense. It is not a correct equation. This means there is no solution.  
                Throw exception: false  
                Params: resultMap.i = {  
                  type:"error",  
                  code:"nonsense",  
                  msg:msg  
                }  

        D.  Else: //tautology  
            Description: This is the situation when the equation is \`c=0\` where \`c = 0\`. It is a **tautology** - always true.  
            Statements:  
            1.  Step: //  
                Description: Write the result to the dtoOut.  

                \`dtoOut.resultList[i].type = "tautology"\`

            2.  Warning: //  
                Description: Write warning to \`uuAppErrorMap\` into the key \`resultMap.i\`that the specified situation is a tautology.  
                Code: tautology  
                Message: The specified situation brings a tautology (always true).  
                Params: resultMap.i = {  
                  type:"warning",  
                  code:"tautology",  
                  msg:msg  
                }

4.  Step: //  
    Description: Return properly filled \`dtoOut\` with results.  

{/algorithm}`,
      `<uu5string/><UuApp.DesignKit.Algorithm />\n`, true
    );

  });
});
