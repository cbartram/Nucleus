const chalk = require('chalk');
const parse = require('./cli/parse.js');
const template = require('./template');
const error = require('./error');
const config = parse(require('../config/config'), process.argv);
const { exec, execSync } = require('child_process');
const fs = require('fs');

//Holds the templates as objects
let templates;

console.log(' _   _            _');
console.log('| \\\ | |_   _  ___| | ___ _   _ ___');
console.log('|  \\| | | | |/ __| |/ _ \\\ | | / __|');
console.log('| |\\\  | |_| | (__| |  __/ |_| \\\__ \\\/');
console.log('|_| \\\_|\\\__,_|\\\___|_|\\\___|\\\__,_|___/');
console.log(chalk.blueBright('------------------------------------'));
console.log(chalk.green('[Nucleus] Initializing \u2713'));

//Parse CLI Arguments into a configuration object & Generate templates
templates = template(config);

config.dev && console.log(chalk.blueBright(`[Nucleus Dev] Config -> ${JSON.stringify(config)}`));

//Basic Error Checking
if(config.style && config.templatePath !== null) {
  error('', config, `[Nucleus] Cannot use both --template and --style`);
  process.exit(1);
}

if(config.functional && config.templatePath !== null) {
  error('', config, `[Nucleus] Cannot use both --template and --functional`);
  process.exit(1);
}


if(config.templatePath !== null && config.plain) {
    error('', config, `[Nucleus] Cannot use both --template and --plain`);
    process.exit(1)
}

if(config.style && config.functional) {
    error('', config, `[Nucleus] Cannot use both --style and --functional`);
    process.exit(1)
}


if(config.templatePath !== null) {
  if(config.templateFileName === '') {
    error('', config, `[Nucleus] The template file must be a valid Javascript (.js) file.`);
    process.exit(0);
  }

  if(!fs.existsSync(config.templatePath)) {
      error('', config, `[Nucleus] Could not locate the template file: ${config.templatePath}`);
      process.exit(0);
  }
}

// Try creating plain first because it does not require a dir
if(config.plain) {
    if(config.style) {
        execSync(`echo "${templates.style}" > ${config.out}/${config.name}.js`);
        execSync(`touch ${config.out}/${config.name}.css`);
        console.log(chalk.green(`[Nucleus] Successfully created plain React Component with styles!`))
    } else {

      if(config.functional) {
          execSync(`echo "${templates.functional}" > ${config.out}/${config.name}.js`);
          console.log(chalk.green(`[Nucleus] Successfully created plain Functional React Component!`))
      } else {
          execSync(`echo "${templates.default}" > ${config.out}/${config.name}.js`);
          console.log(chalk.green(`[Nucleus] Successfully created plain React Component!`))
      }
    }
    process.exit(0)
}


/**
* Executes cli commands to create the components
*/
exec(`cd ${config.out} && mkdir ${config.name} && cd ./${config.name}`, (err) => {
  if (err) {
    console.log(chalk.red(`[Nucleus] Failed to create directory please specify a component name and ensure the folder does not exist!`));
    console.log(chalk.red(`[Nucleus] Ensure ${config.out} directory exists or use the --out=/path/to/component flag to define an output location for the ${config.name} component.`));
    console.log(chalk.red(`[Nucleus] For Example: nucleus Auth --out=./`));

    if(config.dev) {
      console.log(chalk.blueBright(`[Nucleus Dev] ${err}`));
    }
    return;
  }

  config.writePath = `${config.out}/${config.name}`;

  console.log(chalk.green(`[Nucleus] Successfully Created Directory: ${config.name} \u2713`));
  console.log(chalk.green('[Nucleus] Creating Component... \u2713'));

  //Create a custom stylesheet component
  if(config.style) {
    console.log(chalk.green(`[Nucleus] Creating additional stylesheet! \u2713`));
    try {
      execSync(`touch ${config.writePath}/${config.name}.css && echo "${templates.style}" > ${config.writePath}/${config.name}.js`);
    } catch(err) {
      error(err, config, `[Nucleus] Could not create file! Use --dev to view error information`);
      return;
    }
  } else {
    //Create a component with a custom template
    if(config.templatePath !== null) {
      try {
        //This command reads the template and writes a copy to the output directory
        //then searches and replaces the copy component name with the specified component name
        execSync(`cat ${config.templatePath} > ${config.writePath}/${config.name}.js | sed -i '' -e 's/${config.templateFileName.substring(0, config.templateFileName.indexOf('.'))}/${config.name}/g' ${config.writePath}/${config.name}.js`);
      } catch(err) {
        console.log(chalk.red(`[Nucleus] Error run with the --dev flag to view error output.`));
        if(config.dev) {
          console.log(chalk.blueBright(`[Nucleus Dev] ${err}`));
        }
        process.exit(0);
      }
    } else {

      // Create a functional components
      if(config.functional) {
        try {
          console.log(chalk.green(`[Nucleus] Creating functional React Component! \u2713`));
          execSync(`echo "${templates.functional}" > ${config.writePath}/${config.name}.js`)
        } catch(err) {
          error(err, config, '[Nucleus] Could not create functional component! Use --dev to view error information');
          process.exit(0);
        }
      } else {
        try {
          //Create the default template
          execSync(`echo "${templates.default}" > ${config.writePath}/${config.name}.js`);
        } catch (err) {
          error(err, config, '[Nucleus] Could not create default component! Use --dev to view error information');
          process.exit(0);
        }
      }
    }
  }
  console.log(chalk.green('[Nucleus] Done!'));
});
