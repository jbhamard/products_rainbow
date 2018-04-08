'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dominantColors = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _colourProximity = require('colour-proximity');

var _config = require('../config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _googleVisionUrl = config.googleVisionApiUrl + '?key=' + config.googleVisionApiKey;

var _imageRequest = function _imageRequest(product) {
  return {
    image: {
      source: {
        imageUri: 'http:' + product.photo
      }
    },
    features: [{
      type: 'IMAGE_PROPERTIES'
    }]
  };
};

var dominantColors = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(products) {
    var options, googleResponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              method: 'POST',
              uri: _googleVisionUrl,
              body: {
                requests: products.map(_imageRequest)
              },
              json: true
            };
            _context.next = 3;
            return (0, _requestPromiseNative2.default)(options);

          case 3:
            googleResponse = _context.sent;
            return _context.abrupt('return', googleResponse.responses.map(function (r, i) {
              var product = products[i];
              if (r.error) {
                //skip; some images are not accessible sometimes ...
                return product;
              } else {
                var googleRgb = r.imagePropertiesAnnotation.dominantColors.colors[0].color;
                var rgb = [googleRgb.red, googleRgb.green, googleRgb.blue];
                product.rgbColor = rgb;
                product.labColor = (0, _colourProximity.rgb2lab)(rgb);
                return product;
              }
            }));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function dominantColors(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.dominantColors = dominantColors;