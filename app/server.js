'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _controllers = require('./controllers');

var controllers = _interopRequireWildcard(_controllers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the app
var app = (0, _express2.default)();
db.connect();

app.get('/products/:id/related', controllers.products.related);

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    error: err
  });
});

var server = app.listen(config.nodePort, function () {
  console.log('Server is UP and listening on ' + config.nodePort);
});

process.on('SIGINT', function () {
  server.close(function () {
    console.log('SIGINT EXIT Closed out remaining connections.');
    db.close();
    setTimeout(function () {
      process.exit(0);
    }, 100);
  });
});

exports.default = app;