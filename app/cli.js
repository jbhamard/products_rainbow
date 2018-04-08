#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _commands = require('./commands');

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

db.connect();

_commander2.default.command('products').description('Import products CSV').option('-c, --catalog', 'Catalog URI').action(function (options) {
  return _commands.products.load(options).then(function () {
    console.log('Products Import Success');
    process.exit(0);
  }).catch(function (err) {
    console.log('Products Import Error');
    console.log(err);
    process.exit(0);
  });
});

_commander2.default.command('colors').description('Get products color from Google Vision API').action(function (_) {
  _commands.colors.set().then(function () {
    console.log('Products Colors set Success');
    process.exit(0);
  }).catch(function (err) {
    console.log('Products Colors set Error');
    console.log(err);
    process.exit(0);
  });
});

_commander2.default.version('0.1.0', '-v, --version').parse(process.argv);