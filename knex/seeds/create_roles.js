
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('role').del()
    .then(() => knex('role').insert([
      { id_role: 1, name_role: 'superuser' },
      { id_role: 2, name_role: 'admin' },
      { id_role: 3, name_role: 'client', is_Default: true },
    ]));
};
