const error = require('../error');
const { execSync } = require('child_process');

/**
 * Creates a Functional React Component
 * @param program Object commander program object (parsed cli commands)
 * @param templates Object Templates object to use to create the component (filled with the component name)
 */
const createFunctionalComponent = (program, templates) => {
  try {
    execSync(`echo "${templates.functional}" > ${program.writePath}/${program.name}.js`);
  } catch (functionalError) {
    error(functionalError, '[Nucleus] Could not create functional component!');
  }
};

module.exports = createFunctionalComponent;
