exports.up = (knex) => knex.schema.createTable('tag_post', (table) => {
    table.integer('post').unsigned();
    table.integer('tag').unsigned();
    table.foreign('post').references('id_post').inTable('posts').onDelete('CASCADE');
    table.foreign('tag').references('id_tag').inTable('tags').onDelete('CASCADE');
});
exports.down = (knex) => knex.schema.dropTable('tag_post');
