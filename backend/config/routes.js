const admin = require ('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUserById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(admin(app.api.category.save))

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getCategoryById)
        .put(app.api.category.save)
        .delete(admin(app.api.category.remove))

    app.route('/posts')
        .all(app.config.passport.authenticate())
        .get(app.api.post.get)
        .post(app.api.post.save)

    app.route('/comments')
        // .all(app.config.passport.authenticate())
        .post(app.api.comment.save)
        .get(app.api.comment.get)

    app.route('/posts/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPostById)
        .put(app.api.post.save)
        .delete(app.api.post.remove)

    app.route('/categories/:id/posts')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}