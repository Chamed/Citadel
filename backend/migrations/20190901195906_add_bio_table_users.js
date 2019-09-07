
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table){
        table.string('bio', 100000)
        table.string('coverImg', 100000)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table){
        table.dropColumn('bio')
        table.dropColumn('coverImg')
    })
  
};
