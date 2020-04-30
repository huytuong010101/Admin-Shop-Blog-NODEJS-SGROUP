exports.up = (knex) => knex.schema.createTable('tags', (table) => {
    table.increments('id_tag').primary();
    table.string('name_tag', 500).unique();
});
exports.down = (knex) => knex.schema.dropTable('tags');
