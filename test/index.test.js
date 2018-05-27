/* global describe it */
const expect = require('chai').expect;
const firstToCaps = require('../src/cli/capitalize.js');
const parse = require('../src/cli/parse.js');
const error = require('../src/error.js');
const template = require('../src/template.js');
const config = require('../config/config.js');

describe('Functional Tests', () => {
  it('Capitalizes the first letter of a word', (done) => {
    let word = "foo";
    let capitalizedWord = firstToCaps(word);
    expect(capitalizedWord).to.be.a('string').that.equals("Foo");
    done();
  });


  it('Ensures the configuration file is valid', (done) => {
    expect(config).to.be.an('object').that.deep.equals({
      version: '1.0.6',
      quiet: false,
      plain: false, // True if we should not use a directory and use just a simple js file
      style: false, // True if we should include a stylesheet
      functional: false, //True if we should use the functional template
      dev: false,
      name: null,
      out: '.',
      templatePath: null,
      templateFileName: null,
      writePath: null,
    })

    done();
  });

  it('Correctly Parses CLI Arguments', (done) => {
      let parsed = parse({}, ['-f', '--style', '--quiet', '--dev', '--out=./foo', '--template=./foo.js'])
      expect(parsed).to.be.a('object').that.deep.equals({
        functional: true,
        dev: true,
        style: true,
        out: './foo',
        quiet: true,
        templatePath: './foo.js',
        templateFileName: 'foo.js'
      });
      done();
  });

  it('Correctly renders an error message', (done) => {
      let e = error('error', {name: 'Foo'}, '');
      expect(e).to.be.a('boolean').that.equals(true);
      done();
  });

});
