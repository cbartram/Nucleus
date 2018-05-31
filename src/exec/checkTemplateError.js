const error = require('../error');
const fs = require('fs');

/**
 * When the --template flag is used checks the input for any errors
 * @param program Object commander program object (parsed cli commands)
 */
const checkTemplateError = (program) => {
  if (program.template) {
    program.templateFileName = program.template.substring(program.template.lastIndexOf('/') + 1).trim();

    if (!fs.existsSync(program.template)) {
      error('', `[Nucleus] Could not locate the template file: ${program.template}`);
    }

    if (!program.templateFileName.includes('.js')) {
      error(null, '[Nucleus] The template file must be a valid Javascript (.js) file.');
    }
  }
};

module.exports = checkTemplateError
