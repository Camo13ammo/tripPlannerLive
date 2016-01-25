'use strict';
var fs = require('fs');

// utility function to remove last newline

function chop (str) {
  return str.slice(0, -1);
}

/*----------- Functions that do not take STDIN -----------*/

function pwd (stdin, args, done) {
  done(process.cwd());
}

function date (stdin, args, done) {
  done(Date());
}

function ls (stdin, args, done) {
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    var output = '';
    files.forEach(function(file) {
      output += file.toString() + '\n';
    });
    done(chop(output));
  });
}

// "revealing module" pattern: can see API at a glance, but have to maintain
module.exports = {
  pwd: pwd,
  date: date,
  ls: ls
};
