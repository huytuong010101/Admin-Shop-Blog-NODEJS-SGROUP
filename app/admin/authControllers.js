const bcrypt = require('bcrypt');
require('dotenv').config();

// database setting
const { knex } = require('../../config/database');

// main
const getLogin = (req, res) => res.render('admin/login', { note: '' });
const getLogout = (req, res) => {
    req.session.destroy();
    return res.redirect('/admin/user/login');
};
const postLogin = async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const rows = await knex.from('users').first('*')
        .where('username', '=', username)
        .where('role', '!=', 3)
        .leftJoin('role', 'users.role', 'role.id_role');
    if (!rows) return res.render('admin/login', { note: 'Username or password is wrong' });
    if (!bcrypt.compareSync(password, rows.password)) {
        return res.render('admin/login', {
            note: 'Username or password is wrong',
        });
    }
    req.session.user = username;
    req.session.role = rows.name_role;
    req.session.email = rows.email;
    req.session.idUser = rows.id;
    return res.redirect('/admin');
};

module.exports = {
    getLogin,
    getLogout,
    postLogin,
};
