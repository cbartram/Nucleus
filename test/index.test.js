const { expect } = require('chai');
const firstToCaps = require('../src/capitalize');
const error = require('../src/error');
const template = require('../src/template');

describe('Nucleus - Tests', () => {
  describe('Nucleus - Helper Functions', () => {
    it('Transitions: foo -> Foo', (done) => {
      expect(firstToCaps('foo')).to.be.a('string').that.equals('Foo');
      done();
    });

    it('Validates Nucleus Component Templates', (done) => {
      expect(template).to.be.a('function');

      const templateObj = template({
        name: 'Auth',
      });

      const keys = Object.keys(templateObj);

      expect(templateObj).to.be.a('object');
      expect(keys).to.be.an('array').that.include('style');
      expect(keys).to.be.an('array').that.include('default');
      expect(keys).to.be.an('array').that.include('functional');

      done();
    });
  });

  describe('Nucleus - Error Handler', () => {
    it('Correctly renders an error message', (done) => {
      expect(error(null, null, false)).to.be.a('boolean').that.equals(true);
      done();
    });
  });
});
