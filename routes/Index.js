const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { check, validationResult } = require('express-validator');
require('dotenv').config()


//database setting
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  }
});

/* GET users listing. */
router.get('', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("user/login")
  } else
    return res.render("dashboard", { "user": req.session.user });
});
router.get('/listuser', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    knex.from('users').select("*")
      .then((rows) => {
        return res.render("list-user", { "user": req.session.user, "listUser": rows });
      })

});

router.put('/edit', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
  ],
  function (req, res, next) {
    if (!req.session.user) {
      return res.redirect("/admin/user/login")
    } else
      _id = req.body.id
    __password = req.body.password
    _password = bcrypt.hashSync(__password, salt);
    _fullname = req.body.fullname
    _email = req.body.email
    knex('users')
      .where('id', '=', Number(_id))
      .update({
        fullname: _fullname,
        email: _email,
        password: _password,
      })
      .then(() => {
        return res.redirect("/admin/view/listuser")
      })
  });



router.delete('/delete', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    _id = req.body.iddelete
  knex('users')
    .where('id', Number(_id))
    .del()
    .then(() => {
      return res.redirect("/admin/view/listuser")
    })
});

router.get('/detail/:id', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  }
  id = Number(req.params.id)
  if (isNaN(id)) {
    return res.redirect("/admin/view/listuser")
  }
  knex.from('users').select("*").where('id', '=', id)
    .then((rows) => {
      if (rows.length == 0) {
        return res.redirect("/admin/view/listuser")
      } else {
        return res.render("profileuser", { "user": req.session.user, "detail": rows[0] });
      }
    })

});

router.get('/blank', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    return res.render("blank", { "user": req.session.user });
});

router.get('/dashboard', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    return res.render("dashboard", { "user": req.session.user });
});

router.get('/map-google', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    return res.render("map-google", { "user": req.session.user });
});

router.get('/profile', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    return res.render("profile", { "user": req.session.user });
});

router.get('/themifyicon', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin/user/login")
  } else
    return res.render("themifyicon", { "user": req.session.user });
});



module.exports = router;
