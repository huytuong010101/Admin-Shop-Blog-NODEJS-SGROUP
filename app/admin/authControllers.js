const bcrypt = require('bcrypt');
require('dotenv').config()

// database setting
const { knex } = require('../../config/database')

// main
const getLogin = (req, res, next) => {
    return res.render('login', { 'note': '' });
}
const getLogout = (req, res, next) => {
    req.session.destroy()
    return res.redirect('/admin/user/login')
}
const postLogin = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    rows = await knex.from('users').select('*')
        .where('username', '=', username)
        .where('role', '!=', 3)
        .leftJoin('role', 'users.role', 'role.id_role')
    if (rows.length == 0) return res.render('login', { 'note': 'Username or password is wrong' });
    if (!bcrypt.compareSync(password, rows[0].password)) return res.render('login', {
        'note': 'Username or password is wrong'
    });
    req.session['user'] = username
    req.session['role'] = rows[0].name_role
    req.session['email'] = rows[0].email
    req.session['idUser'] = rows[0].id
    return res.redirect('/admin');
}

module.exports = {
    getLogin,
    getLogout,
    postLogin,
}