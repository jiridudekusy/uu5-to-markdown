import chai from 'chai';
import UU5Parser from '../src/parser/uu5parser.js';

chai.expect();

const expect = chai.expect;

let uu5parser;

describe('Given an instance of UU5Parser', () => {
  before(() => {
    uu5parser = new UU5Parser();
  });
  describe('when I parse document', () => {
    it('the root element should be present and correct', () => {
      let parsed = uu5parser.parse('<Test></Test>');

      expect(parsed.documentElement.tagName).to.be.equal('Test');
    });
  });
});

