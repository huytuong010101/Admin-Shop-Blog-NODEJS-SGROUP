const moment = require('moment');
const { knex } = require('../../config/database');

const getAllPost = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    const posts = await knex.select('name_post', 'slug_post', 'fullname').from('posts')
        .leftJoin('users', 'posts.user_post', 'users.id');
    return res.render('client/show-posts', {
        note: 'Tất cả bài viết',
        type,
        category,
        posts,
        user: req.session['user'],
    });
};
const getPostByCategory = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    const posts = await knex('category').select('slug_post', 'name_post', 'fullname').where('slug_category', '=', req.params['slug'])
        .rightJoin('posts', 'category.id_category', 'posts.category')
        .leftJoin('users', 'posts.user_post', 'users.id');
    return res.render('client/show-posts', {
        note: 'Bài viết theo chủ đề',
        type,
        category,
        posts,
        user: req.session['user'],
    });
};
const detailPost = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    const post = await knex.first('id_post', 'name_post', 'content', 'fullname', 'created_at_post')
        .from('posts').where('slug_post', '=', req.params['slug'])
        .leftJoin('users', 'posts.user_post', 'users.id');
    const tags = await knex('tag_post').select('id_tag', 'name_tag')
        .where('post', '=', post.id_post)
        .leftJoin('tags', 'tag_post.tag', 'tags.id_tag');
    if (post) {
        post.created_at_post = moment(post.created_at_post).format('DD/MM/YYYY');
    }
    return res.render('client/detail-post', {
        type,
        category,
        post,
        tags,
        user: req.session['user'],
    });
};
const myPost = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    const posts = await knex.select('*').from('posts').where('user_post', '=', req.session.idUser);
    return res.render('client/my-post', {
        type,
        category,
        posts,
        user: req.session['user'],
    });
};
const getAddPost = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category', 'id_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    return res.render('client/add-post', {
        type,
        category,
        user: req.session['user'],
    });
};
const getUpdatePost = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category', 'id_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    const post = await knex('posts').first('*').where('slug_post', '=', req.params['slug'])
        .leftJoin('category', 'posts.category', 'category.id_category');
    if (!post) return res.redirect('/404');
    const _tags = await knex('tag_post').select('*').where('post', '=', post.id_post)
        .leftJoin('tags', 'tag_post.tag', 'tags.id_tag');
    let tags = [];
    await _tags.forEach((item) => {
        tags.push(item.name_tag);
    });
    tags = tags.join(',');
    return res.render('client/update-post', {
        type,
        category,
        user: req.session['user'],
        post,
        tags,
    });
};
const getPostByTag = async (req, res) => {
    const category = await knex.select('name_category', 'slug_category').from('category');
    const type = await knex.select('name_type', 'slug_type').from('type');
    const posts = await knex('tag_post').select('slug_post', 'name_post', 'fullname')
        // eslint-disable-next-line no-restricted-globals
        .where('tag', '=', isNaN(Number(req.params['tag'])) ? 0 : Number(req.params['tag']))
        .leftJoin('posts', 'tag_post.post', 'posts.id_post')
        .leftJoin('users', 'posts.user_post', 'users.id');
    return res.render('client/show-posts', {
        note: 'Bài viết theo thẻ',
        type,
        category,
        posts,
        user: req.session['user'],
    });
};
module.exports = {
    getAllPost,
    getPostByCategory,
    detailPost,
    myPost,
    getAddPost,
    getUpdatePost,
    getPostByTag,
};
