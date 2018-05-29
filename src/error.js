const chalk = require('chalk');

module.exports = (err, config, message, exit = true) => {
  console.log(chalk.red(message));
  if (config.dev) {
    console.log(chalk.red(`[Nucleus Dev] ${err}`));
  }
  // Makes for easy unit testing
  if (exit) {
    process.exit(1);
    return false;
  }
  return true;
};
