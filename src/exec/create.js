const createStyledComponent = require('./createStyledComponent');
const createTemplateComponent = require('./createTemplateComponent');
const createFunctionalComponent = require('./createFunctionalComponent');
const createDefaultComponent = require('./createDefaultComponent');

/**
 * Handles creating the correct component
 * based on command line input using a wrapper function.
 * @param program Object commander program object (parsed cli commands)
 * @param templates Object Templates object to use to create the component (filled with the component name)
 */
module.exports = (program, templates) => {
  if(program.style) return createStyledComponent(program, templates);
  if(program.template) return createTemplateComponent(program);
  if(program.functional) return createFunctionalComponent(program, templates);

  return createDefaultComponent(program, templates);
};
