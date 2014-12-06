var PORT = 3030;

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/puffbird',
        port: process.env.PORT || PORT
    },
    production: {
        rootPath: rootPath,
        db: 'cloud-db',
        port: process.env.PORT || PORT
    }
};