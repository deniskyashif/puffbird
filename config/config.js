var DEV_PORT = 3030,
  path = require('path'),
  rootPath = path.normalize(__dirname + '/../');

var config = {
  rootPath: rootPath,
  port: process.env.PORT || DEV_PORT,
  db: 'mongodb://admin:puffbird@ds031681.mongolab.com:31681/puffbird'
};

module.exports = function(env) {
  if (env === 'development') {
    config.db = 'mongodb://localhost/puffbird';
  }

  return config;
};