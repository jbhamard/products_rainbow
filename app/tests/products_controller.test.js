'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../server.js');

var _server2 = _interopRequireDefault(_server);

var _product = require('../models/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('products related route', function () {
  test('It should should response with 404 when product cannot be found', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //mock Product.findOne() to return null, not_found
            _product2.default.findOne = jest.fn().mockImplementation(function () {
              return _promise2.default.resolve(null);
            });
            expect.assertions(1);
            _context.next = 4;
            return (0, _supertest2.default)(_server2.default).get('/products/not_found_id/related');

          case 4:
            response = _context.sent;

            expect(response.statusCode).toBe(404);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});