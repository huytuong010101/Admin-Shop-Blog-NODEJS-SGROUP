// database setting
const { validationResult } = require('express-validator');
const slugify = require('slugify');
const { knex } = require('../../config/database');
// main
const getPosts = async (req, res) => {
    const category = await knex.select('*').from('category').leftJoin('users', 'category.who_create_category', 'users.id');
    const posts = await knex.select('*')
        .from('posts')
        .leftJoin('users', 'posts.who_create_post', 'users.id')
        .leftJoin('category', 'posts.category', 'category.id_category');
    return res.render('admin/list-post', {
        user: req.session.user,
        note: req.flash('errors_category'),
        category,
        posts,
    });
};
const addNewCategory = async (req, res) => {
    const errors = validationResult(req);
    // validate
    if (!errors.isEmpty()) {
        let str = '';
        errors.errors.forEach((item) => {
            str += `${item.msg}<br>`;
        });
        req.flash('errors_category', str);
        return res.redirect('/admin/list-posts');
    }
    const name = req.body.nameOfNewCategory;
    const user = req.session.idUser;
    // add
    await knex('category').insert({
        name_category: name,
        slug_category: slugify(name + String(Date.now())),
        who_create_category: user,
    });
    return res.redirect('/admin/list-posts');
};
const updateCategory = async (req, res) => {
    const errors = validationResult(req);
    // validate
    if (!errors.isEmpty()) {
        let str = '';
        errors.errors.forEach((item) => {
            str += `${item.msg}. `;
        });
        const response = {
            result: 'Not OK',
            error: str,
        };
        return res.json(response);
    }
    await knex('category')
        .where('id_category', '=', Number(req.body.id_update_category))
        .update({
            name_category: req.body.name_update_category,
            slug_category: slugify(req.body.name_update_category + String(Date.now())),
        });
    return res.json({ result: 'OK' });
};
const deleteCategoty = async (req, res) => {
    await knex('category').where('id_category', '=', Number(req.body.idDelete)).del();
    return res.redirect('/admin/list-posts');
};
const getAddPost = async (req, res) => {
    const category = await knex('category').select('*');
    return res.render('admin/add-post', {
        user: req.session.user,
        note: undefined,
        category,
    });
};
const getUpdatePost = async (req, res) => {
    const category = await knex('category').select('*');
    const post = await knex('posts').first('*').where('slug_post', '=', req.params['slug'])
        .leftJoin('category', 'posts.category', 'category.id_category');
    if (!post) return res.redirect('404');
    return res.render('admin/update-post', {
        user: req.session.user,
        note: undefined,
        category,
        post,
    });
};
module.exports = {
    getPosts,
    addNewCategory,
    updateCategory,
    deleteCategoty,
    getAddPost,
    getUpdatePost,
};
