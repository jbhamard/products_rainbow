'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.related = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _product = require('../models/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aggregate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(productId) {
    var p, color;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _product2.default.findOne({ id: productId });

          case 2:
            p = _context.sent;
            color = p.labColor;

            //distance expression from https://docs.mongodb.com/manual/reference/operator/aggregation/sqrt/#exp._S_sqrt

            return _context.abrupt('return', _product2.default.aggregate().match({ id: { $ne: productId } }).addFields({
              colorProximity: {
                $sqrt: {
                  $add: [{ $pow: [{ $subtract: [color[0], '$color[0]'] }, 2] }, { $pow: [{ $subtract: [color[1], '$color[1]'] }, 2] }, { $pow: [{ $subtract: [color[2], '$color[1]'] }, 2] }]
                }
              }
            }).sort({ colorProximity: 'desc' }).limit(5).project('id title gender_id composition sleeve photo url -_id'));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function aggregate(_x) {
    return _ref.apply(this, arguments);
  };
}();

var related = function related(req, res, next) {
  aggregate(req.params.id).then(function (products) {
    res.status(200);
    res.json(products);
  }).catch(next);
};

exports.related = related;