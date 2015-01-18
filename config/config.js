var DEV_PORT = 3030,
    path = require('path'),
    rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/puffbird',
        port: process.env.PORT || DEV_PORT
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:puffbird@ds031681.mongolab.com:31681/puffbird',
        port: process.env.PORT || DEV_PORT
    }
};