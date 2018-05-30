const { expect } = require('chai');
const firstToCaps = require('../src/capitalize');
const error = require('../src/error');
const template = require('../src/template');
const config = require('../config/config');

describe('Nucleus - Tests', () => {
  describe('Nucleus - Helper Functions', () => {
    it('Capitalizes the first letter of a word', (done) => {
      expect(firstToCaps('foo')).to.be.a('string').that.equals('Foo');
      done();
    });

    it('Validates Nucleus File Templates', (done) => {
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


    it('Validates configuration file', (done) => {
      expect(config).to.be.an('object').that.deep.equals({
        version: '1.0.6',
        quiet: false,
        plain: false,
        style: false,
        functional: false,
        dev: false,
        name: null,
        out: '.',
        templatePath: null,
        templateFileName: null,
        writePath: null,
      });

      done();
    });
  });

  describe('Nucleus - Error Handler', () => {
    it('Correctly renders an error message', (done) => {
      expect(error('error', { name: 'Foo' }, '', false)).to.be.a('boolean').that.equals(true);
      done();
    });
  });
});
