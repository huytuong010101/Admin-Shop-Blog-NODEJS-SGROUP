exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username').notNullable().unique() ;
        table.string('password').notNullable();
        table.string('email').notNullable().unique() ;
        table.string('fullname').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').notNullable().defaultTo(
            knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        )
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
}