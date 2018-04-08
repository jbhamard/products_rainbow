'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productSchema = _mongoose2.default.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  title: { type: String },
  gender_id: { type: String },
  composition: { type: String },
  sleeve: { type: String },
  photo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  labColor: { type: [Number] },
  rgbColor: { type: [Number] }
});

var Product = _mongoose2.default.model('Product', productSchema);

exports.default = Product;