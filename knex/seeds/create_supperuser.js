
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        id: 1,
        username: 'admin',
        password: '$2b$10$db7iJ73UM5ToqIaVvBiZ0u1tGWdLGOWqNT80qG35l5tWdSHTXAWGS',
        fullname: 'Thay Tu',
        email: 'thaytu@gmail.com',
        role: 1,
      },
    ]));
};
