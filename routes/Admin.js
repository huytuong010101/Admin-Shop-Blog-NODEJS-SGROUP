const express = require('express');
const router = express.Router();
const { isAuth, isNotAuth } = require("../app/admin/authMiddlewares")
const handle = require("../app/admin/controllers")
const { check, validationResult } = require('express-validator');
const { UserIsNotExist, EmailIsNotExist, EmailIsNotExistUpdate} = require("../validate/userValidate")

/* GET users listing. */
//home page
router.get('', isAuth, handle.homePage);
//auth
router.get('/user/login', isNotAuth, handle.getLogin);
router.get('/user/logout', handle.getLogout);
router.post('/user/login', handle.postLogin);
router.get('/user/register', handle.getRegister);
router.post('/user/register', [
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('username').not().isEmpty().isLength({min: 5}).withMessage('username must have more than 5 characters'),
    check('fullname').not().isEmpty().withMessage('Full name not empty'),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
    check('username').custom(
        (value) => {
            return UserIsNotExist(value).then((value) => {
                if (value == false) return Promise.reject("Username is exist")
            })   
        }
    ),
    check('email').custom(
        (value) => {
            return EmailIsNotExist(value).then((value) => {
                if (value == false) return Promise.reject("Email is exist")
            })
        }
    ),
], handle.postRegister);
//view
router.get('/view/listuser', isAuth, handle.renderListUser);
router.put('/view/edit',[
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
    check('email').custom(
        (value, {req}) => {
            return EmailIsNotExistUpdate(value, req.body.username).then((value) => {
                if (value == false) return Promise.reject("Email is exist")
            })
        }
    ),
], isAuth, handle.updateProfile);
router.delete('/view/delete', isAuth, handle.deleteUser);

router.get('/view/detail/:id', isAuth, handle.detailUser);
// view not use
router.get('/view/blank', isAuth, function (req, res, next) {
    return res.render("blank", { "user": req.session.user });
});
router.get('/view/dashboard', isAuth, function (req, res, next) {
    return res.render("dashboard", { "user": req.session.user });
});
router.get('/view/map-google', isAuth, function (req, res, next) {
    return res.render("map-google", { "user": req.session.user });
});
router.get('/view/profile', isAuth, function (req, res, next) {
    return res.render("profile", { "user": req.session.user });
});
router.get('/view/themifyicon', isAuth, function (req, res, next) {
    return res.render("themifyicon", { "user": req.session.user });
});

module.exports = router;
