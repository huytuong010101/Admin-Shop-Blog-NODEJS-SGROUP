const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const salt = bcrypt.genSaltSync(saltRounds);
require('dotenv').config()

// database setting
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
});

/* GET users listing. */
router.get('/login', function (req, res, next) {
    if (req.session.user){
        return res.redirect('/admin/view');
    }
    return res.render('login',{'note': ''});
});
router.get('/logout', function (req, res, next) {
    req.session.destroy()
    return res.redirect('login')
});

router.post('/login', function (req, res, next) {
    username = req.body.username
    password = req.body.password

    knex.from('users').select('*').where('username', '=', username)
    .then((rows) => {
        if (rows.length == 0){
            return res.render('login',{'note': 'Username or password is wrong'});
        }
        if (!bcrypt.compareSync(password, rows[0].password)){
            return res.render('login',{'note': 'Username or password is wrong'});
        }
        req.session['user'] = username
        return res.redirect('/admin/view');
        
    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
        //knex.destroy();
    });
    
});

router.get('/register', function (req, res, next) {
    return res.render('register', {'note': ''});
});

router.post('/register', function (req, res, next) {
    username = req.body.username
    _password = req.body.password
    password = bcrypt.hashSync(_password, salt);
    email = req.body.email
    fullname = req.body.fullname
    //check if user exist
    knex.from('users').select('username').where('username', '=', username)
    .then((rows) => {
        if (rows.length != 0){
            return res.render('register',{'note': 'Username is exist'});
        }
        knex('users').insert({
            'username': username,
            'password': password,
            'fullname': fullname,
            'email': email
        })
        .then(() => {
            return res.redirect('login')
        })
        .catch((err) => { console.log( err); throw err })

    })
    .catch((err) => { console.log( err); throw err;})
    .finally(() => {
        //knex.destroy();
    });
});


module.exports = router;
