const chalk = require('chalk');
const firstToCaps = require('./capitalize');

/**
 *  Handles parsing command line arguments
 */
module.exports = (config, args) => {
  //Parse Arguments and update our config object
  args.forEach(val => {
      if(!val.includes("--") && !val.includes("-")) {
        //Parses the name of the component
        config.name = firstToCaps(val);
      }

      if(val === "--quiet" || val == "-q") {
        config.quiet = true;
      }

      if(val === "--plain" || val === "-p") {
          config.plain = true;
          !config.quiet && console.log(chalk.green('[Nucleus] Using plain React Template'))
      }

      if(val === "--functional" || val === "-f") {
        config.functional = true;
        !config.quiet && console.log(chalk.green(`[Nucleus] Using functional component template \u2713`));
      }

      if(val === "--version" || val === "-v") {
          console.log(chalk.green(`Version ${config.version}`));
      }

      if(val === "--dev" || val === "-d") {
        config.dev = true;
      }

      if(val.includes("--out")) {
        !config.quiet && console.log(chalk.green("[Nucleus] Using Custom Output Location \u2713"));
        config.out = val.substring(val.indexOf('=') + 1);
      }

      if(val.includes("--template")) {
        !config.quiet && console.log(chalk.green("[Nucleus] Using Custom Template \u2713"));
        config.templatePath = val.substring(val.indexOf("=") + 1).trim();
        config.templateFileName = val.substring(val.lastIndexOf('/') + 1).trim();
      }

      if(val === "--style" || val === "-s") {
          !config.quiet && console.log(chalk.green("[Nucleus] Creating Stylesheet \u2713"));
          config.style = true;
      }
  });

  return config;
}
