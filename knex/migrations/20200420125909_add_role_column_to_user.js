
exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
        table.integer("role").unsigned();
        table.foreign('role').references('id_role').inTable('role').onDelete('CASCADE');
    })
};

exports.down = function (knex) {

};
