
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friendship', table => {
      table.integer('idRequester').references('id').inTable('users').notNull()
      table.integer('idRequested').references('id').inTable('users').notNull()
      table.integer('id').primary('idRequester', 'idRequested')
      table.date('dateRequest').notNull()
      table.string('status', 1).defaultTo('P')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friendship')
};
