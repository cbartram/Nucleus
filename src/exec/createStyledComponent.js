const error = require('../error');
const { execSync } = require('child_process');

/**
 * Creates a React component with associated and linked stylesheets
 * @param program Object commander program object (parsed cli commands)
 * @param templates Object Templates object to use to create the component (filled with the component name)
 */
const createStyledComponent = (program, templates) => {
  try {
    execSync(`touch ${program.writePath}/${program.name}.css && echo "${templates.style}" > ${program.writePath}/${program.name}.js`);
  } catch (styleError) {
    error(styleError, '[Nucleus] Could not create the React component!');
  }
};

module.exports = createStyledComponent;
