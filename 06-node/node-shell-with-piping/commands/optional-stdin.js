'use strict';
var fs = require('fs'),
    request = require('request');

// utility function to remove last newline

function chop (str) {
  return str.slice(0, -1);
}

/*----------- Functions that may take STDIN --------------*/

function echo (stdin, args, done) {
  args = stdin || args;
  args = args.split(' ');
  var output = '';
  args.forEach(function(arg){
    if (arg[0] === '$') output += process.env[arg.slice(1)] + '\n';
    else output += arg + '\n';
  });
  done(chop(output));
}

function cat (stdin, filenames, done) {
  if (stdin) return done(stdin); // `return` stops fn; could use else instead.
  filenames = filenames.split(' ');
  var texts = [];
  var count = 0;
  filenames.forEach(function(filename, i){
    fs.readFile(filename, { encoding: 'utf8' }, function(err, text){
      if (err) throw err;
      texts[i] = text;
      count++;
      if (count === filenames.length) done(texts.join('\n'));
    });
  });
}

function head (stdin, filename, done) {
  if (stdin) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput);
  // head delivers top 5 lines of input
  function produceOutput (err, text) {
    if (err) throw err;
    done(text.split('\n').slice(0, 5).join('\n'));
  }
}

function tail (stdin, filename, done) {
  if (stdin) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput);
  // tail delivers last 5 lines of input
  function produceOutput (err, text) {
    if (err) throw err;
    done(text.split('\n').slice(-5).join('\n'));
  }
}

function sort (stdin, filename, done) {
  if (stdin) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput);
  // sort delivers lines sorted alphabetically
  function produceOutput (err, text) {
    if (err) throw err;
    done(text.split('\n').sort().join('\n'));
  }
}

function wc (stdin, filename, done) {
  if (stdin) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput);
  // wc returns line count of input
  function produceOutput (err, text){
    if (err) throw err;
    done(text.split('\n').length);
  }
}

function uniq (stdin, filename, done) {
  if (stdin) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput);
  // uniq collapses any duplicate lines
  function produceOutput (err, text){
    if (err) throw err;
    var lines = text.split('\n');
    for (var i = 0; i < lines.length - 1; i++) {
      if (lines[i] === lines[i + 1]) {
        lines = lines.slice(0, i + 1).concat(lines.slice(i + 2));
        i--;
      }
    }
    done(lines.join('\n'));
  }
}

function curl (stdin, url, done) {
  if (stdin) produceOutput(null, {statusCode: 200}, stdin);
  else request(url, produceOutput);
  // curl does an HTTP GET request and outputs the response body
  function produceOutput (err, response, body){
    if (err || response.statusCode !== 200) {
      throw err || new Error(response.statusCode);
    }
    done(body);
  }
}

// "revealing module" pattern: can see API at a glance, but have to maintain
module.exports = {
  echo: echo,
  cat: cat,
  head: head,
  tail: tail,
  sort: sort,
  wc: wc,
  uniq: uniq,
  curl: curl
};
