'use strict';

var express = require('express');
var router = express.Router();
module.exports = router;

// getting our "model" (data interface) so we can use it in routes
var todos = require('../models/todos');

// "get all people" route
router.get('/', function(req, res){
  res.json(todos.listPeople());
});

// example of using middleware to pass params into a sub-router. Another possibility is to define the sub-router using the { mergeParams: true } option.
router.use('/:person', function(req, res, next){
  req.person = req.params.person;
  next();
}, require('./person'));
