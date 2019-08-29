
exports.up = function(knex, Promise) {
    return knex.schema.createTable('likes', table =>{
        table.increments('id').primary()
        table.integer('userId').references('id').inTable('users').notNull()
        table.integer('postId').references('id').inTable('posts').notNull()
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments')
};
