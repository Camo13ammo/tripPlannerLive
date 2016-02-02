'use strict';

var express = require('express');
var router = express.Router(); // { mergeParams: true }
module.exports = router;

// needed to use the todos in our routes
var todos = require('../models/todos');

// utility function to capitalize first letter
function cap(s) {
  return typeof s === 'string' ?
    s[0].toUpperCase() + s.slice(1) : '';
}

// get all tweets for this person (optionally filtering by status)
router.get('/', function(req, res, next){
  var type = 'list' + cap(req.query.status);
  var tasks = todos[type](req.person);
  if (!tasks) return next(); // will cause 404 (see app.js)
  res.json(tasks);
});

// make a new tweet, provided it is correctly formed
router.post('/', function(req, res, next){
  if (!todos.validate(req.body)) {
    var err = new Error();
    err.status = 400;
    return next(err); // triggers error middleware (see app.js)
  }
  var addedTask = todos.add(req.person, req.body);
  res.status(201).json(addedTask);
});

// router.param catches all reqs with the given req.params.ARG1
router.param('index', function(req, res, next, index){
  req.index = index; // just an example
  next();
});

// mark tweet as completed
router.put('/:index', function(req, res){
  todos.complete(req.person, req.index);
  res.status(200).end();
});

// remove a specific tweet
router.delete('/:index', function(req, res){
  var removedTask = todos.remove(req.person, req.index);
  // some debate as to what a DELETE request should respond. Just 204? Also the deleted task? The array of remaining tasks?
  res.status(204).json(removedTask);
});
