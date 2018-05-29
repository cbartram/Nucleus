const chalk = require('chalk');

module.exports = (err, config, message) => {
  console.log(chalk.red(message));
  if (config.dev) {
    console.log(chalk.blueBright(`[Nucleus Dev] ${err}`));
  }
  return true;
};
