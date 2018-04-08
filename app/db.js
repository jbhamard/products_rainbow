'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = function connect() {
  _mongoose2.default.Promise = global.Promise;
  _mongoose2.default.connect(config.mongoConnexion).catch(function (err) {
    return console.log(err);
  });
  _mongoose2.default.connection.on('error', function (err) {
    console.log('mongodb_connection_error');
    console.log(err);
  });
};

exports.connect = connect;