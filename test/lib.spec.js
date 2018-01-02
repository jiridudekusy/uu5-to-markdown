import chai from 'chai';
// todo test against lib is not working
import {UU5ToMarkdown} from '../lib/uu5-to-markdown.js';

chai.expect();

const expect = chai.expect;

// let uu5ToMarkdown = new UU5ToMarkdown();
//
// function uu5ToMdTest(name, uu5string, mdString) {
//   describe('do not fail on toMarkdown', () => {
//     it(name, () => {
//       let parsed = uu5ToMarkdown.toMarkdown(uu5string);
//       console.log(parsed);
//       expect(parsed).to.be.equal(mdString);
//     });
//   });
// }
//
// uu5ToMdTest('the root element should be present and correct',
//   '<uu5string/><UU5.Bricks.P attrName="value">test content<UU5.Bricks.Strong>strong content</UU5.Bricks.Strong></UU5.Bricks.P>',
//   '\n\ntest content**strong content**\n\n');
//
// // describe('Given an instance of UU5ToMarkdown (lib)', () => {
// //   before(() => {
// //     uu5ToMarkdown = new UU5ToMarkdown();
// //   });
// //
// //   describe('do not fail on toMarkdown', () => {
// //     it('the root element should be present and correct', () => {
// //       let parsed = uu5ToMarkdown.toMarkdown(
// //         '<root><uu5string/><UU5.Bricks.P attrName="value">test content<UU5.Bricks.Strong>strong content</UU5.Bricks.Strong></UU5.Bricks.P></root>');
// //       // expect(parsed.documentElement.tagName).to.be.equal('Test');
// //     });
// //   });
// // });
