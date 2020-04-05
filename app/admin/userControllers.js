const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { check, validationResult } = require('express-validator');
moment = require("moment")
require('dotenv').config()

// database setting
const { knex } = require('../../config/database')

// main content
const getRegister = (req, res, next) => {
    return res.render('register', { 'note': req.flash("errors") });
}
const homePage = (req, res, next) => {
    return res.render("dashboard", { "user": req.session.user });
}
const postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    //validate
    if (!errors.isEmpty()) {
        str = ""
        errors.errors.forEach((item) => {
            str += item.msg + "<br>"
        })
        req.flash("errors", str)
        return res.redirect("/admin/user/register")
    }
    const username = req.body.username
    const _password = req.body.password
    const password = bcrypt.hashSync(_password, salt);
    const email = req.body.email
    const fullname = req.body.fullname
    // add
    await knex('users').insert({
        'username': username,
        'password': password,
        'fullname': fullname,
        'email': email,
    })
    return res.redirect('login')
}
const updateProfile = async (req, res, next) => {
    const errors = validationResult(req);
    //validate
    if (!errors.isEmpty()) {
        str = ""
        errors.errors.forEach((item) => {
            str += item.msg + " | "
        })
        req.flash("errorsUpdate", str)
        return res.redirect("/admin/view/listuser")
    }
    const _id = req.body.id
    const __password = req.body.password
    const _password = bcrypt.hashSync(__password, salt);
    const _fullname = req.body.fullname
    const _email = req.body.email
    await knex('users')
        .where('id', '=', Number(_id))
        .update({
            fullname: _fullname,
            email: _email,
            password: _password,
        })
    return res.redirect("/admin/view/listuser")
}
const deleteUser = async (req, res, next) => {
    const _id = req.body.iddelete
    await knex('users')
        .where('id', Number(_id))
        .del()
    return res.redirect("/admin/view/listuser")
}
const renderListUser = async (req, res, next) => {
    result = await knex.from('users').select("*")
    return res.render("list-user", {
        "user": req.session.user,
        "listUser": result,
        'note': req.flash("errorsUpdate")
    });
}
const detailUser = async (req, res, next) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.redirect("/admin/view/listuser")
    rows = await knex.from('users').select("*").where('id', '=', id)
    if (rows.length == 0) return res.redirect("/admin/view/listuser")
    rows[0].created_at = moment(rows[0].created_at).format("DD/MM/YYYY")
    rows[0].updated_at = moment(rows[0].updated_at).format("DD/MM/YYYY")
    return res.render("profileuser", { "user": req.session.user, "detail": rows[0] });
}
// end
module.exports = {
    getRegister,
    postRegister,
    updateProfile,
    deleteUser,
    homePage,
    renderListUser,
    detailUser,
}