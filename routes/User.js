const express = require('express');
const router = express.Router();
require('dotenv').config()

//section setting
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'admin',
        port: process.env.DB_PORT
    }
});
// database setting

/* GET users listing. */
router.get('/login', function (req, res, next) {
    if (req.session.user){
        res.redirect("/")
    }
    res.render("login",{"note": ""});
});
router.get('/logout', function (req, res, next) {
    req.session.destroy()
    res.redirect("/user/login")
});

router.post('/login', function (req, res, next) {
    username = req.body.username
    password = req.body.password
    knex.from('users').select("username").where('username', '=', username).where('password', '=', password)
    .then((rows) => {
        if (rows.length == 0){
            res.render("login",{"note": "Username or password is wrong"});
        } else {
            req.session["user"] = username
            res.redirect("/");
        }
    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
        //knex.destroy();
    });
    
});

router.get('/register', function (req, res, next) {
    res.render("register", {"note": ""});
});

router.post('/register', function (req, res, next) {
    username = req.body.username
    password = req.body.password
    email = req.body.email
    fullname = req.body.fullname
    //check if user exist
    knex.from('users').select("username").where('username', '=', username)
    .then((rows) => {
        if (rows.length != 0){
            res.render("register",{"note": "Username is exist"});
        }
        knex('users').insert({
            "username": username,
            "password": password,
            "fullname": fullname,
            "email": email
        })
        .then(() => {
            res.redirect("/user/login")
        })
        .catch((err) => { console.log( err); throw err })

    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
        //knex.destroy();
    });
});




module.exports = router;
