const { execSync } = require('child_process');


/**
 * Creates a plain react component without the enclosing directory
 * @param program Object commander program object (parsed cli commands)
 * @param templates Object Templates object to use to create the component (filled with the component name)
 */
const createPlainComponent = (program, templates) => {
  if (program.plain) {
    if (program.style) {
      execSync(`echo "${templates.style}" > ${program.out}/${program.name}.js && touch ${program.out}/${program.name}.css`);
    } else if (program.functional) {
      execSync(`echo "${templates.functional}" > ${program.out}/${program.name}.js`);
    } else {
      execSync(`echo "${templates.default}" > ${program.out}/${program.name}.js`);
    }
    // Exit once complete because we dont want to hit the other exec statement in nucleus.js
    process.exit(0);
  }
}

module.exports = createPlainComponent;
