'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; // this line is only used to make testing easier.

// body-parsing so we get a nice req.body object from POST requests
app.use(bodyParser.json());
// no need to bother with url-encoded bodies for this app

// plugging in our sub-router as middleware
app.use('/users', require('./routes'));

// if we don't catch the request above, we default to a 404
app.use(function (req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err); // triggers error-handling middleware
});

// error-handling middleware (has 4 arguments)
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err);
});


if (!module.parent) app.listen(3000); // conditional prevents a very esotetiric EADDRINUSE issue with mocha watch + supertest + npm test.
