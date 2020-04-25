const { check } = require('express-validator');
const { knex } = require('../config/database');

const UserIsNotExist = async (username) => {
    const rows = await knex.from('users').select('username').where('username', '=', username);
    return rows.length === 0;
};
const EmailIsNotExist = async (email) => {
    const rows = await knex.from('users').select('email').where('email', '=', email);
    return rows.length === 0;
};

const EmailIsNotExistUpdate = async (email, username) => {
    const rows = await knex.from('users').select('email').where('email', '=', email).where('username', '!=', username);
    return rows.length === 0;
};

const registerValidate = [
    check('email', 'Your email is not valid').not().isEmpty().isEmail()
        .normalizeEmail(),
    check('username').not().isEmpty().isLength({ min: 5 })
        .withMessage('username must have more than 5 characters'),
    check('fullname').not().isEmpty().withMessage('Full name not empty'),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
    check('username').custom(
        (value) => UserIsNotExist(value).then((value) => {
            if (value === false) return Promise.reject('Username is exist');
        }),
    ),
    check('email').custom(
        (value) => EmailIsNotExist(value).then((value) => {
            if (value === false) return Promise.reject('Email is exist');
        }),
    ),
];
const updateUserValidate = [
    check('email', 'Your email is not valid').not().isEmpty().isEmail()
        .normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
    check('email').custom(
        (value, { req }) => EmailIsNotExistUpdate(value, req.body.username).then((value) => {
            if (value === false) return Promise.reject('Email is exist');
        }),
    ),
];

module.exports = {
    updateUserValidate,
    registerValidate,
};
