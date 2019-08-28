
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', table =>{
        table.increments('id').primary()
        table.string('comment', 100000).notNull()
        table.string('createdAt')
        table.integer('userId').references('id').inTable('users').notNull()
        table.integer('postId').references('id').inTable('posts').notNull()
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments')
};
