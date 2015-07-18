var DEV_PORT = 3030,
  fs = require('fs'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/../'),
  reportsDir = rootPath + '/temp/';

var config = {
  rootPath: rootPath,
  port: process.env.PORT || DEV_PORT,
  db: 'mongodb://admin:puffbird@ds031681.mongolab.com:31681/puffbird'
};

module.exports = function(env) {
  if (env === 'development') {
    config.db = 'mongodb://localhost/puffbird';
  }

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
    console.log('Created directory for storing the reports.');
  }

  return config;
};