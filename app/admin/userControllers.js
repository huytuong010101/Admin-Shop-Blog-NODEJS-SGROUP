const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { check, validationResult } = require('express-validator');
moment = require("moment")
require('dotenv').config()

// database setting
const { knex } = require('../../config/database')

// main content
const homePage = (req, res, next) => {
    return res.render("admin/dashboard", { "user": req.session.user });
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
    result = await knex.select("*").from("users").leftJoin('role', 'users.role', 'role.id_role')
    console.log(result)
    return res.render("admin/list-user", {
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
    return res.render("admin/profileuser", { "user": req.session.user, "detail": rows[0] });
}
const changeRole = async (req, res, next) => {
    console.log("--------------------------------")
    userId = Number(req.params["userid"]);
    roleId = Number(req.params["roleid"]);
    if (isNaN(userId) || isNaN(roleId)) {
        return res.redirect("/404");
    }
    targetRole = roleId == 2 ? 3 : 2;
    await knex("users").where("id", "=", userId).update({ role: targetRole });
    return res.redirect("/admin/view/listuser")
}
// end
module.exports = {
    updateProfile,
    deleteUser,
    homePage,
    renderListUser,
    detailUser,
    changeRole,
}