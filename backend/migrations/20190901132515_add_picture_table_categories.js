
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('categories', function(table){
        table.string('imageUrl',1000)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('categories', function(table){
        table.dropColumn('imageUrl')
    })
  
};
