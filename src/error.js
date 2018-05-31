const chalk = require('chalk');

/**
 * Handles rendering an error message and exiting cleanly
 * @param err Error object from try catch
 * @param message String custom error message
 * @param exit Boolean true if the process should quit false otherwise
 */
module.exports = (err, message, exit = true) => {
  if (message) {
    console.log(chalk.red(message));
  }

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
