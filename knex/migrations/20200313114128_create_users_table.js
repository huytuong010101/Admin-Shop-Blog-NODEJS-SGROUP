exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('fullname').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
}