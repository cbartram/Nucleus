const chalk = require('chalk');
const template = require('./template');
const error = require('./error');
const { exec } = require('child_process');
const program = require('commander');
const isVarName = require('is-valid-var-name');

// Modules to create components
const checkTemplateError = require('./exec/checkTemplateError');
const createPlainComponent = require('./exec/createPlainComponent');
const create = require('./exec/create');

/**
 * Simply prints the Nucleus intro
 * unless the --quiet flag is specified
 */
const intro = () => {
  console.log(' _   _            _');
  console.log('| \\\ | |_   _  ___| | ___ _   _ ___');
  console.log('|  \\| | | | |/ __| |/ _ \\\ | | / __|');
  console.log('| |\\\  | |_| | (__| |  __/ |_| \\\__ \\');
  console.log('|_| \\\_|\\\__,_|\\\___|_|\\\___|\\\__,_|___/');
  console.log(chalk.blueBright('------------------------------------'));
  console.log(chalk.green('[Nucleus] Initializing \u2713'));
};

// Parse CLI Arguments
// TODO use Regex to ensure --name does not contain any invalid
// TODO JS classname characters like \-/.,\{}()*&^%$#@![0-9]\g
program
  .version('1.0.9')
  .option('-n, --name <name>, Specify a name for the component')
  .option('-o, --out <location>', 'Specify an output directory.', '.')
  .option('-s, --style', 'Links a stylesheet to the created react component.')
  .option('-f, --functional', 'Creates a functional react component.')
  .option('-t, --template <location>', 'Use another react component as a template.')
  .option('-d, --dev', 'Runs Nucleus in development mode for more verbose errors.')
  .option('-p, --plain', 'Creates only the component without any enclosing directory or stylesheet.')
  .option('-q, --quiet', 'Runs Nucleus in development mode for more verbose errors.')
  .parse(process.argv);


// Executes the program
module.exports = {
  run: () => {
    if (!program.quiet) {
      intro();
    }

    if (program.dev) {
      console.log(chalk.blueBright(`[Nucleus Dev] Config -> ${JSON.stringify(program)}`));
    }

    // Basic Error Checking
    if (typeof program.name === 'function') {
      error(null, '[Nucleus] The --name flag is required.');
    }

    if (!isVarName(program.name)) {
      error(null, `[Nucleus] ${program.name} is not a valid ES6 Class Name`);
    }

    if (program.style && program.template) {
      error(null, '[Nucleus] Cannot use both --template and --style');
    }

    if (program.functional && program.template) {
      error(null, '[Nucleus] Cannot use both --template and --functional');
    }

    if (program.template && program.plain) {
      error(null, '[Nucleus] Cannot use both --template and --plain');
    }

    if (program.style && program.functional) {
      error(null, '[Nucleus] Cannot use both --style and --functional');
    }


    // Create template initialization
    const templates = template(program.name);

    // Check for any errors in the template
    checkTemplateError(program);
    createPlainComponent(program, templates);

    // Executes CLI commands to create the components
    exec(`cd ${program.out} && mkdir -p ${program.name} && cd ./${program.name}`, (err) => {
      if (err) {
        console.log(chalk.red('[Nucleus] Failed to create directory please specify a component name and ensure the folder does not exist!'));
        console.log(chalk.red(`[Nucleus] Ensure ${program.out} directory exists or use the --out /path/to/component flag to define an output location for the ${program.name} component.`));

        error(err, null);
      }

      program.writePath = `${program.out}/${program.name}`;

      if (!program.quiet) {
        console.log(chalk.green(`[Nucleus] Successfully Created Directory: ${program.name} \u2713`));
        console.log(chalk.green('[Nucleus] Creating Component... \u2713'));
      }

      // Create the correct component based on cli input
      create(program, templates);

      console.log(chalk.green('[Nucleus] Done!'));
    });
  },

};
