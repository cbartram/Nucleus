const error = require('../error');
const { execSync } = require('child_process');

/**
 * Creates a React component based on a given template js File
 * @param program Object commander program object (parsed cli commands)
 */
const createTemplateComponent = (program) => {
  try {
    // This command reads the template and writes a copy to the output directory
    // then searches and replaces the copy component name with the specified component name
    execSync(`cat ${program.template} > ${program.writePath}/${program.name}.js | sed -i '' -e 's/${program.templateFileName.substring(0, program.templateFileName.indexOf('.'))}/${program.name}/g' ${program.writePath}/${program.name}.js`);
  } catch (templateError) {
    error(templateError, `[Nucleus] Error creating component from template file: ${program.template}`);
  }
};

module.exports = createTemplateComponent;
