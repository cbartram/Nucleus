const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const firstToCaps = require('../src/capitalize');
const error = require('../src/error');
const template = require('../src/template')('Foo');

// Global Variables
const OUT_PATH = path.join(__dirname, 'out');

// Create Modules
const createPlainComponent = require('../src/exec/createPlainComponent');
const createTemplateComponent = require('../src/exec/createTemplateComponent');
const createStyledComponent = require('../src/exec/createStyledComponent');

describe('Nucleus - Tests', () => {
  // Remove Components
  afterEach(() => {
    const component = fs.existsSync(path.join(OUT_PATH, 'Foo.js'));
    const stylesheet = fs.existsSync(path.join(OUT_PATH, 'Foo.css'));

    if (component) fs.unlinkSync(path.join(OUT_PATH, 'Foo.js'));
    if (stylesheet) fs.unlinkSync(path.join(OUT_PATH, 'Foo.css'));
  });

  describe('Template React Component Tests', () => {
    it('Creates a Template React Component', (done) => {
      createTemplateComponent({
        template: path.join(OUT_PATH, 'Template/Template.js'),
        writePath: OUT_PATH,
        name: 'Foo',
        templateFileName: 'Foo.js',
      });

      // Test the file and template are the same
      expect(fs.existsSync(path.join(OUT_PATH, 'Foo.js'))).to.be.a('boolean').that.equals(true);
      expect(fs.statSync(path.join(OUT_PATH, 'Foo.js')).size).to.be.a('number').that.equals(202);
      done();
    });
  });

  describe('Styled Component Tests', () => {
    it('Creates a React Component and Linked Stylesheet', (done) => {
      createStyledComponent({
        writePath: OUT_PATH,
        name: 'Foo',
      }, template);

      expect(fs.existsSync(path.join(OUT_PATH, 'Foo.js'))).to.be.a('boolean').that.equals(true);
      expect(fs.existsSync(path.join(OUT_PATH, 'Foo.css'))).to.be.a('boolean').that.equals(true);
      expect(fs.statSync(path.join(OUT_PATH, 'Foo.js')).size).to.be.a('number').that.equals(165);
      done();
    });
  });

  describe('Plain React Component Tests', () => {
    it('Capitalizes "foo"', (done) => {
      expect(firstToCaps('foo')).to.be.a('string').that.equals('Foo');
      done();
    });

    it('Creates a plain React Component', (done) => {
      createPlainComponent({
        plain: true,
        style: false,
        functional: false,
        name: 'Foo',
        out: OUT_PATH,
      }, template, false);

      expect(fs.existsSync(path.join(OUT_PATH, 'Foo.js'))).to.be.a('boolean').that.equals(true);
      expect(fs.statSync(path.join(OUT_PATH, 'Foo.js')).size).to.be.a('number').that.equals(143);
      done();
    });

    it('Creates a plain React component (Stylesheet)', (done) => {
      createPlainComponent({
        plain: true,
        style: true,
        functional: false,
        name: 'Foo',
        out: OUT_PATH,
      }, template, false);

      expect(fs.existsSync(path.join(OUT_PATH, 'Foo.js'))).to.be.a('boolean').that.equals(true);
      done();
    });

    it('Creates a plain React component (Functional)', (done) => {
      createPlainComponent({
        plain: true,
        style: false,
        functional: true,
        name: 'Foo',
        out: OUT_PATH,
      }, template, false);

      expect(fs.existsSync(path.join(OUT_PATH, 'Foo.js'))).to.be.a('boolean').that.equals(true);
      expect(fs.statSync(path.join(OUT_PATH, 'Foo.js')).size).to.be.a('number').that.equals(100);
      done();
    });

    it('Validates Nucleus Component Templates', (done) => {
      const keys = Object.keys(template);
      expect(template).to.be.a('object');
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
