
exports.up = function (knex) {
    return knex.schema.createTable('category', async function (table) {
        table.increments("id_category");
        table.string("slug_category", 500).unique();
        table.string('name_category').notNullable().unique();
        table.integer('who_create_category').unsigned();
        table.foreign('who_create_category').references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at_category').defaultTo(knex.fn.now());
        table.dateTime('updated_at_category').defaultTo(
            knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        )
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('category');
};
