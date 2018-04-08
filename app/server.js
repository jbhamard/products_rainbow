'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _product = require('./models/product.js');

var _product2 = _interopRequireDefault(_product);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the app
var app = (0, _express2.default)();
// import bodyParser from 'body-parser'

db.connect();

// app.use((req, res, next) => {
//   req.on('end', () => {
//     logger.info(
//       {
//         req: req,
//         res: res
//       },
//       'request end logging'
//     )
//   })
//   next()
// })

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
            color = p.color;

            //distance expression from https://docs.mongodb.com/manual/reference/operator/aggregation/sqrt/#exp._S_sqrt

            return _context.abrupt('return', _product2.default.aggregate().match({ id: { $ne: productId } }).addFields({
              colorProximity: {
                $sqrt: {
                  $add: [{ $pow: [{ $subtract: [color[0], '$color[0]'] }, 2] }, { $pow: [{ $subtract: [color[1], '$color[1]'] }, 2] }, { $pow: [{ $subtract: [color[2], '$color[1]'] }, 2] }]
                }
              }
            }).sort({ colorProximity: 'desc' }).limit(2).project('id title gender_id composition sleeve photo url -_id'));

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

app.use('/', function (req, res, next) {
  aggregate('L1212-00-001').then(function (products) {
    console.log('aggregate res');
    console.log(products);
    res.status(200);
    res.json(products);
  }).catch(next);
});

app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    // handle jwt decode error
    // logger.error(`error on ${req.originalUrl} url, with error ${err.name}`)
    // logger.error(`body message is ${err.message}`)
    res.sendStatus(401);
  } else {
    // logger.error(err)
    // Raven.captureException(err)
    res.status(500);
    res.json({
      error: err
    });
  }
});

var server = app.listen(config.nodePort, function () {
  console.log('Go Go to http://localhost:' + config.nodePort);
});

process.on('SIGINT', function () {
  server.close(function () {
    console.log('SIGINT EXIT Closed out remaining connections.');
    process.exit(0);
  });
});