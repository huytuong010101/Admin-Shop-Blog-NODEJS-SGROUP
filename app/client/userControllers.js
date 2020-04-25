const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { validationResult } = require('express-validator');
require('dotenv').config();
const { knex } = require('../../config/database');

const getRegister = (req, res) => res.render('client/register', { note: req.flash('errors') });

const getLogin = (req, res) => res.render('client/login', { note: req.flash('errors') });

const postRegister = async (req, res) => {
  const errors = validationResult(req);
  // validate
  if (!errors.isEmpty()) {
    let str = '';
    errors.errors.forEach((item) => {
      str += `${item.msg}<br>`;
    });
    req.flash('errors', str);
    return res.redirect('/register');
  }
  const { username } = req.body;
  const _password = req.body.password;
  const password = bcrypt.hashSync(_password, salt);
  const { email } = req.body;
  const { fullname } = req.body;
  let roleDefault = await knex('role').select('id_role', 'is_Default').where('is_Default', '=', 1);
  roleDefault = roleDefault[0]['id_role'];
  // add
  await knex('users').insert({
    username,
    password,
    fullname,
    email,
    role: roleDefault,
  });
  return res.redirect('/login');
};

const postLogin = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const rows = await knex.from('users').select('*').where('username', '=', username).leftJoin('role', 'users.role', 'role.id_role');
  if (rows.length === 0) { return res.render('admin/login', { note: 'Username or password is wrong' }); }
  if (!bcrypt.compareSync(password, rows[0].password)) {
    return res.render('admin/login', {
      note: 'Username or password is wrong',
    });
  }
  req.session['user'] = username;
  req.session['role'] = rows[0].name_role;
  req.session['email'] = rows[0].email;
  req.session['idUser'] = rows[0].id;
  return res.redirect('/');
};

const getLogout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout,
};
