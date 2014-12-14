var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(router) {
    //auth
    router.post('/login', auth.login);
    router.post('/logout', auth.logout);

    // users
    router.get('/api/users/:id', auth.isAuthenticated, controllers.users.getById);
    router.get('/api/users', auth.isAuthenticated, controllers.users.getAll);
    router.post('/api/users/:id', auth.isAuthenticated, controllers.users.create);
    router.put('/api/users/:id', auth.isAuthenticated, controllers.users.update);

    //notes
    router.get('/api/notes/:id', auth.isAuthenticated, controllers.notes.getById);
    router.get('/api/notes', auth.isAuthenticated, controllers.notes.getAll);
    router.post('/api/notes', auth.isAuthenticated, controllers.notes.create);
    router.put('/api/notes/:id', auth.isAuthenticated, controllers.notes.update);
    router.delete('/api/notes/:id', auth.isAuthenticated, controllers.notes.remove);

    router.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    //--application--
    router.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};