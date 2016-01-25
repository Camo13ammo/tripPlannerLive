'use strict';
var commands = require('./commands'); // defaults to index.js in folder

var cmdList, // will be each group of command-arg separated by pipes
    lastStdout; // will be the output of each commnd run

// prompt the user for first input
process.stdout.write('prompt > ');

// the stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  cmdList = data.toString().trim().split(/\s*\|\s*/g); // separate command-arg sets by pipe character
  execute(cmdList.shift()); // run the first command-arg set
});

function execute(nextCmds) {
  var tokens = nextCmds.toString().trim().split(' '), // separate this cmd and its args
      cmd = tokens[0],
      args = tokens.slice(1).join(' ');
  if (commands[cmd]) commands[cmd](lastStdout, args, done);
  else done(cmd + 'is not valid');
  // try { output(commands[cmd]()); }
  // catch (err) { output(cmd + 'is not valid: ' + err.message); }
}

function done (stdout) {
  if (cmdList.length === 0) {
    lastStdout = null; // reset for the next prompt
    process.stdout.write(stdout + '\nprompt > ');
  } else {
    lastStdout = stdout; // save the last output to pass into the next stdin
    execute(cmdList.shift()); // execute the next command-arg set
  }
}
