'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodePort = exports.googleVisionApiKey = exports.googleVisionApiUrl = exports.mongoConnexion = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var mongoConnexion = process.env.MONGO_CONNECTION;
var googleVisionApiUrl = process.env.GOOLGE_API_VISION_URL;
var googleVisionApiKey = process.env.GOOGLE_API_KEY;
var nodePort = process.env.NODE_PORT;

exports.mongoConnexion = mongoConnexion;
exports.googleVisionApiUrl = googleVisionApiUrl;
exports.googleVisionApiKey = googleVisionApiKey;
exports.nodePort = nodePort;