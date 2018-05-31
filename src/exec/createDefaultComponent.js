const error = require('../error');
const { execSync } = require('child_process');

/**
 * Creates a Normal React component (without stylesheets, non-functional, no-template file)
 * @param program Object commander program object (parsed cli commands)
 * @param templates Object Templates object to use to create the component (filled with the component name)
 */
const createDefaultComponent = (program, templates) => {
  try {
    // Create the default template
    execSync(`echo "${templates.default}" > ${program.writePath}/${program.name}.js`);
  } catch (defaultError) {
    error(defaultError, '[Nucleus] Could not create default component!');
  }
};

module.exports = createDefaultComponent;
