
exports.up = function(knex) {
    return knex.schema.createTable('type', function (table) {
        table.increments("id_type").primary();
        table.string("slug_type",500).unique();
        table.string('name_type').notNullable().unique() ;
        table.integer('who_create_type').unsigned();
        table.foreign('who_create_type').references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at_type').defaultTo(knex.fn.now());
        table.dateTime('updated_at_type').defaultTo(
            knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        )
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('type');
};
