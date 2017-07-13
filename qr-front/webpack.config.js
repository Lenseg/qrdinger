'use strict';

var _configs = {
  global: require(__dirname + '/config/global'),
  production: require(__dirname + '/config/env/production'),
  development: require(__dirname + '/config/env/development')
};

var _load = function() {
  var ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'production';

  return Object.assign(
    _configs[ENV](__dirname),
    _configs.global(__dirname)
  );x
};

module.exports = _load();
