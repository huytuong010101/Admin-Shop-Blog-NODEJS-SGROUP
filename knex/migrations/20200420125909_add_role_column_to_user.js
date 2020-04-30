
exports.up = (knex) => knex.schema.table('users', (table) => {
    table.integer('role').unsigned();
    table.foreign('role').references('id_role').inTable('role').onDelete('CASCADE');
});

exports.down = () => {

};
