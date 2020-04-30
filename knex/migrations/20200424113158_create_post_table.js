
exports.up = (knex) => knex.schema.createTable('posts', (table) => {
    // info
    table.increments('id_post').primary();
    table.string('slug_post', 500).unique();
    table.string('name_post', 500).notNullable();
    table.string('content');
    table.integer('category').unsigned();
    table.integer('who_create_post').unsigned();
    table.string('image_post', 500);
    // time
    table.timestamp('created_at_post').defaultTo(knex.fn.now());
    table.dateTime('updated_at_post').defaultTo(
        knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    );
    // relate
    table.foreign('category').references('id_category').inTable('category').onDelete('CASCADE');
    table.foreign('who_create_post').references('id').inTable('users').onDelete('CASCADE');
});

exports.down = (knex) => knex.schema.dropTable('posts');
