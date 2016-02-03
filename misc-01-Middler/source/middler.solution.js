'use strict';

/*----------- Helper function you can use -----------*/

// returns true if mount path matches beginning of url. Ignores query string and handles implicit trailing slash. See the `helper.js` file for more details & examples.

var mountMatchesUrl = mountMatchesUrl;

/*--------- Main App Constructor (Completed) --------*/

var App = function () {
  this._chain = [];
};

/*======== Follow the spec in middler.spec.js ========*/

// user interface (API) for registering middleware
App.prototype.use = function(path) {

  var chain = this._chain,
      start = typeof path === 'string' ? 1 : 0,
      handlers = [].slice.call(arguments, start),
      path = start ? path : '/';

  handlers.forEach(function(handler){
    chain.push({
      mount: path,
      middleware: handler
    });
  });

};

// internal method triggered by a hypothetical HTTP request
App.prototype._handleHTTP = function(request, response) {

  var chain = this._chain,
      link = 0,
      prefix = '';

  next();

  function next (err) {
    var current = chain[link++];
    request.url = prefix + request.url;
    prefix = '';
    if (!current) return final(response, err);
    if (mountMatchesUrl(current.mount, request.url)) {
      prefix = request.url.slice(0, current.mount.length);
      request.url = request.url.slice(current.mount.length);
      var arity = current.middleware.length;
      try {
        if (!err && arity === 3) {
          return current.middleware(request, response, next);
        } else if (err && arity === 4) {
          return current.middleware(err, request, response, next);
        }
      } catch (caught) {
        err = caught;
      }
    }
    next(err);
  }

  function final (res, err) {
    if (!err) return;
    res.statusCode = 500;
    res.end(err);
  }

};
