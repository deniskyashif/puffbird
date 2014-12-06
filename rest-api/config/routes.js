var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    // users
    app.get('/api/users/:id', controllers.users.getById);
    app.get('/api/users', controllers.users.getAll);
    app.post('/api/users', controllers.users.create);
    app.put('/api/users', controllers.users.update);

    //auth
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    
    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Puffbird'
        });
    });
};