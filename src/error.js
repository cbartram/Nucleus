const chalk = require('chalk');

module.exports = (err, message, exit = true) => {
  console.log(chalk.red(message));

  if (err) {
    console.log(chalk.red(`[Nucleus] ${err}`));
  }

  // Makes for easy unit testing
  if (exit) {
    process.exit(1);
    return false;
  }
  return true;
};
