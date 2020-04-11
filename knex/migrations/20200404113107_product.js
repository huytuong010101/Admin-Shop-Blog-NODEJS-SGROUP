
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        //info
        table.increments("id_product").primary();
        table.string("slug_product",500).unique();
        table.integer('price').unsigned();
        table.string('name_product',500).notNullable();
        table.string('describe');
        table.integer('type').unsigned();
        table.integer('who_create_product').unsigned();
        table.string("image_product",500);
        //time
        table.timestamp('created_at_product').defaultTo(knex.fn.now());
        table.dateTime('updated_at_product').defaultTo(
            knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        )
        // relate
        table.foreign('type').references('id_type').inTable('type').onDelete('CASCADE');
        table.foreign('who_create_product').references('id').inTable('users').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
