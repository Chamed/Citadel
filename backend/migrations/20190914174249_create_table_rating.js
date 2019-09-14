
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rating', table =>{
    table.increments('id').primary()
    table.integer('userId').references('id').inTable('users').notNull()
    table.integer('ownerId').references('id').inTable('posts').onUpdate('CASCADE').onDelete('CASCADE').notNull()
    table.integer('grade').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rating')
};
