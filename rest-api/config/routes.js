var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    //auth
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // users
    app.get('/api/users/:id', auth.isAuthenticated, controllers.users.getById);
    app.get('/api/users', auth.isAuthenticated, controllers.users.getAll);
    app.post('/api/users', controllers.users.create);
    app.put('/api/users', auth.isAuthenticated, controllers.users.update);

    //notes
    app.get('/api/notes/:id', auth.isAuthenticated, controllers.notes.getById);
    app.get('/api/notes', auth.isAuthenticated, controllers.notes.getAll);
    app.post('/api/notes', auth.isAuthenticated, controllers.notes.create);
    app.put('/api/notes', auth.isAuthenticated, controllers.notes.update);
    // app.delete('api/notes', auth.isAuthenticated, controllers.notes.delete);

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