'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _product = require('../models/product');

var _product2 = _interopRequireDefault(_product);

var _google_vision_api = require('./google_vision_api');

var _operators = require('rxjs/operators');

var _rxjsStream = require('rxjs-stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveProduct = function saveProduct(product) {
  return product.save();
};

var _setColors = function _setColors(resolve, reject) {
  var readCursor = _product2.default.find({ labColor: null }).cursor();

  (0, _rxjsStream.streamToRx)(readCursor).pipe((0, _operators.bufferCount)(5), (0, _operators.mergeMap)(_google_vision_api.dominantColors, null, 5), (0, _operators.mergeAll)(), (0, _operators.mergeMap)(saveProduct), (0, _operators.catchError)(reject) //interrupt command if error
  ).finally(function () {
    resolve('done');
  }).subscribe();
};

var set = function set() {
  return new _promise2.default(function (resolve, reject) {
    return _setColors(resolve, reject);
  });
};

exports.set = set;