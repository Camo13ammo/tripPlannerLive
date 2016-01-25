'use strict';
var chalk = require('chalk');

/*------------ Functions that NEED stdin AND arg ----------*/

function grep (stdin, matchString, done) {
  var matcher = new RegExp(matchString, 'g');
  var matches = stdin
    .split('\n')
    .filter(function(line){
      return matcher.test(line);
    })
    .map(function(line){ // optional: colorize matches using `chalk`
      return line.replace(matcher, function(match){
        return chalk.green(match);
      });
    })
    .join('\n');
  done(matches);
}


// "revealing module" pattern: can see API at a glance, but have to maintain
module.exports = {
  grep: grep
};
