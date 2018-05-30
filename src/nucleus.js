const fs = require('fs');
const chalk = require('chalk');
const template = require('./template');
const error = require('./error');
const { exec, execSync } = require('child_process');
const program = require('commander');

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
    const templates = template({
      name: program.name,
    });

    /**
    * Template Error Checking
    */
    if (program.template) {
      program.templateFileName = program.template.substring(program.template.lastIndexOf('/') + 1).trim();

      if (!fs.existsSync(program.template)) {
        error('', `[Nucleus] Could not locate the template file: ${program.template}`);
      }

      if (!program.templateFileName.includes('.js')) {
        error(null, '[Nucleus] The template file must be a valid Javascript (.js) file.');
      }
    }

    // Try creating plain first because it does not require a dir
    if (template.plain) {
      if (template.style) {
        execSync(`echo "${templates.style}" > ${program.out}/${program.name}.js && touch ${program.out}/${program.name}.css`);
      } else if (program.functional) {
        execSync(`echo "${templates.functional}" > ${program.out}/${program.name}.js`);
      } else {
        execSync(`echo "${templates.default}" > ${program.out}/${program.name}.js`);
      }

      process.exit(0);
    }

    /**
    * Executes CLI commands to create the components
    */
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

      // Create a custom stylesheet component
      if (program.style) {
        console.log(chalk.green('[Nucleus] Creating additional stylesheet! \u2713'));
        try {
          execSync(`touch ${program.writePath}/${program.name}.css && echo "${templates.style}" > ${program.writePath}/${program.name}.js`);
        } catch (styleError) {
          error(styleError, '[Nucleus] Could not create the React component!');
          return;
        }
      } else {
        // Create a component with a custom template
        if (program.template) {
          try {
            // This command reads the template and writes a copy to the output directory
            // then searches and replaces the copy component name with the specified component name
            execSync(`cat ${program.template} > ${program.writePath}/${program.name}.js | sed -i '' -e 's/${program.templateFileName.substring(0, program.templateFileName.indexOf('.'))}/${program.name}/g' ${program.writePath}/${program.name}.js`);
          } catch (templateError) {
            error(templateError, `[Nucleus] Error creating component from template file: ${program.template}`);
            process.exit(0);
          }
        } else {
          // Create a functional components
          if (program.functional) {
            try {
              console.log(chalk.green('[Nucleus] Creating functional React Component! \u2713'));
              execSync(`echo "${templates.functional}" > ${program.writePath}/${program.name}.js`);
            } catch (functionalError) {
              error(functionalError, '[Nucleus] Could not create functional component!');
              process.exit(0);
            }
          } else {
            try {
              // Create the default template
              execSync(`echo "${templates.default}" > ${program.writePath}/${program.name}.js`);
            } catch (defaultError) {
              error(defaultError, '[Nucleus] Could not create default component!');
              process.exit(0);
            }
          }
        }
      }
      console.log(chalk.green('[Nucleus] Done!'));
    });
  }

};
