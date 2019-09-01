
exports.up = function(knex, Promise) {
    return knex.schema.createTable('friendship', table => {
        table.integer('idFollower').references('id').inTable('users').notNull()
        table.integer('idFollowing').references('id').inTable('users').notNull()
        table.integer('id').primary('idFollower', 'idFollowing')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('friendship')
  };
