const { expect } = require('chai');
const firstToCaps = require('../src/capitalize');
const parse = require('../src/parse');
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

  describe('Nucleus - Parser', () => {
    it('Correctly Parses CLI Arguments', (done) => {
      const parsed = parse(config, ['--quiet', 'Auth', '-f', '-p', '--style', '--dev', '--out=./foo', '--template=./foo.js']);

      expect(parsed).to.be.a('object').that.deep.equals({
        functional: true,
        dev: true,
        plain: true,
        version: '1.0.6',
        writePath: null,
        style: true,
        name: 'Auth',
        out: './foo',
        quiet: true,
        templatePath: './foo.js',
        templateFileName: 'foo.js',
      });

      done();
    });
  });
});
