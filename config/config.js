var DEV_PORT = 3030
  , path = require('path')
  , rootPath = path.normalize(__dirname + '/../')
  , config = {
    rootPath: rootPath,
    port: process.env.PORT || DEV_PORT,
    db: 'mongodb://admin:puffbird@ds031681.mongolab.com:31681/puffbird'
  };

module.exports = function(env) {
  console.log(env);
  if (env === 'dev') {  
    config.db = 'mongodb://localhost/puffbird';
  }

  console.log(config);

  return config;
};