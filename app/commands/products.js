'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fastCsv = require('fast-csv');

var _fastCsv2 = _interopRequireDefault(_fastCsv);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _product = require('../models/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _saveProducts = function _saveProducts(products) {
  return products.reduce(function (promise, product) {
    return promise.then(function () {
      return product.save();
    }).catch(function (err) {
      console.log('product ' + product.id + ' save error : ' + err.message);
    });
  }, _promise2.default.resolve());
};

var _loadCsv = function _loadCsv(catalogUrl, resolve, reject) {
  var products = [];

  var csvStream = (0, _fastCsv2.default)({ headers: true, delimiter: ';' }).on('data', function (data) {
    return products.push(new _product2.default(data));
  }).on('end', function () {
    return resolve(products);
  }).on('error', function (err) {
    reject(err);
  });

  try {
    _request2.default.get(catalogUrl).on('response', function (resp) {
      if (resp.statusCode !== 200) {
        this.emit('error', Error('csv_download_failed_with_http_status ' + resp.statusCode));
      }
    }).on('error', function (err) {
      reject(err);
    }).pipe(csvStream);
  } catch (err) {
    reject(err);
  }
};

var load = function load(catalogUrl) {
  return new _promise2.default(function (resolve, reject) {
    return _loadCsv(catalogUrl, resolve, reject);
  }).then(_saveProducts);
};

exports.load = load;