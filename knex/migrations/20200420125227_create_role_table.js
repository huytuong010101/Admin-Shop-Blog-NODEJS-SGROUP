
exports.up = (knex) => knex.schema.createTable('role', (table) => {
    table.increments('id_role').primary();
    table.string('name_role', 500).unique();
    table.boolean('is_Default').defaultTo(false);
    table.timestamp('created_at_type').defaultTo(knex.fn.now());
    table.dateTime('updated_at_type').defaultTo(
        knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    );
});

exports.down = (knex) => knex.schema.dropTable('role');
