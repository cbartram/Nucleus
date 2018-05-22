/* global describe it */
const expect = require('chai').expect;
const firstToCaps = require('../src/cli/capitalize.js');
const parse = require('../src/cli/parse.js');
const error = require('../src/error.js');
const template = require('../src/template.js');

describe('Functional Tests', () => {
  it('Capitalizes the first letter of a word', (done) => {
    let word = "foo";
    let capitalizedWord = firstToCaps(word);
    expect(capitalizedWord).to.be.a('string').that.equals("Foo");
    done();
  });

  it('Correctly Parses CLI Arguments', (done) => {
      let parsed = parse({}, ['-f', '--style', '--dev', '--out=./foo', '--template=./'])
      expect(parsed).to.be.a('object').that.deep.equals({
        functional: true,
        dev: true,
        style: true,
        out: './foo',
        templatePath: './',
        templateFileName: ''
      });
      done();
  });

  it('Correctly renders an error message', (done) => {
      let e = error('error', {name: 'Foo'}, '');
      expect(e).to.be.a('boolean').that.equals(true);
      done();
  });

});
