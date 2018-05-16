const chalk = require('chalk');
const { exec, execSync } = require('child_process');

const firstToCaps = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//Configuration object used throughout the application
let config = {
    version: '1.0.0',
    style: false,
    dev: false,
    name: null,
    out: './src/components',
    templatePath: null,
    writePath: null,
};

console.log(' _   _            _');
console.log('| \\\ | |_   _  ___| | ___ _   _ ___');
console.log('|  \\| | | | |/ __| |/ _ \\\ | | / __|');
console.log('| |\\\  | |_| | (__| |  __/ |_| \\\__ \\\/');
console.log('|_| \\\_|\\\__,_|\\\___|_|\\\___|\\\__,_|___/');
console.log(chalk.blueBright('------------------------------------'));
console.log(chalk.green('[Nucleus] Initializing \u2713'));

//Parse Arguments and update our config object
process.argv.forEach(val => {
    if(!val.includes("--")) {
      //Parses the name of the component
      config.name = firstToCaps(val);
    }

    if(val === "--version" || val === "-v") {
        console.log(chalk.green(`Version ${config.version}`));
    }

    if(val === "--dev" || val === "-d") {
      config.dev = true;
    }

    if(val.includes("--out")) {
      console.log(chalk.green("[Nucleus] Using Custom Output Location \u2713"));
      config.out = val.substring(val.indexOf('=') + 1);
    }

    if(val.includes("--template")) {
      console.log(chalk.green("[Nucleus] Using Custom Template \u2713"));
      config.templatePath = val.substring(val.indexOf("=") + 1);
    }

    if(val === "--style" || val === "-s") {
        console.log(chalk.green("[Nucleus] Creating Stylesheet \u2713"));
        config.style = true;
    }
});

//Check for dev
if(config.dev) {
  console.log(chalk.blueBright(`[Nucleus Dev] Config -> ${JSON.stringify(config)}`));
}

//If template is set and style is set then throw error;
if(config.style && config.templatePath !== null) {
  console.log(chalk.red(`[Nucleus] Cannot use both --template and --style`));
  process.exit(1);
}

// The react template which uses custom styles
const templateStyle = `import React, { Component } from 'react';
import './${config.name}.css';

export default class ${config.name} extends Component {
  render() {
      return <h1>${config.name}</h1>
  }
}`;
// React template that does NOT include styles
const templateOriginal = `import React, { Component } from 'react';

export default class ${config.name} extends Component {
  render() {
      return <h1>${config.name}</h1>
  }
}`;

exec(`cd ${config.out} && mkdir ${config.name} && cd ./${config.name}`, (err) => {
    if (err) {
        console.log(chalk.red(`[Nucleus] Failed to create directory please specify a component name and ensure the folder does not exist!`));
        console.log(chalk.red(`[Nucleus] Ensure ${config.out} directory exists or use the --out=/path/to/component flag to define an output location for the ${config.name} component.`));
        console.log(chalk.red(`[Nucleus] For Example: ./nucleus Auth --style`));

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
      try {
        execSync(`touch ${config.writePath}/${config.name}.css && echo "${templateStyle}" > ${config.writePath}/${config.name}.js`);
      } catch(err) {
        console.log(chalk.red(`[Nucleus] Could not create file! Use --dev to view error information`));
        if(config.dev) {
          console.log(chalk.blueBright(`[Nucleus Dev] ${err}`));
        }
        return;
      }
    } else {
      //Create a component with a custom template
      if(config.templatePath !== null) {
          try {
          execSync(`cat ${config.templatePath} > ${config.writePath}/${config.name}.js`);
        } catch(err) {
          console.log(chalk.red(`[Nucleus] Could not find the file: ${config.templatePath}`));
          if(config.dev) {
            console.log(chalk.blueBright(`[Nucleus Dev] ${err}`));
          }
          return;
        }
      } else {
        try {
          //Create the default template
          execSync(`echo "${templateOriginal}" > ${config.writePath}/${config.name}.js`);
        } catch (err) {
          console.log(chalk.red(`[Nucleus] Could not create file! Use --dev to view error information`));
          if(config.dev) {
            console.log(chalk.blueBright(`[Nucleus Dev] ${err}`));
          }
          return;
        }
      }
    }

    console.log(chalk.green('[Nucleus] Done!'));
});
