'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = exports.products = undefined;

var _products = require('./products');

var products = _interopRequireWildcard(_products);

var _colors = require('./colors');

var colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.products = products;
exports.colors = colors;