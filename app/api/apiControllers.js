const slugify = require('slugify');
const { knex } = require('../../config/database');

const strim = (s) => (s || '').replace(/^\s+|\s+$/g, '');

const addPost = async (req, res) => {
    // add post
    const idPost = await knex('posts').insert({
        name_post: req.body.title,
        slug_post: slugify(req.body.title + String(Date.now())),
        category: Number(req.body.category),
        content: req.body.content,
        user_post: req.session.user.idUser,
    });
    // add tag
    const tags = req.body.tags.split(',');
    await tags.forEach(async (_tag) => {
        const tag = strim(_tag);
        let idTag = await knex('tags').first('id_tag').where('name_tag', '=', tag);
        if (!idTag) {
            const _idTag = await knex('tags').insert({ name_tag: tag });
            idTag = { id_tag: _idTag[0] };
        }
        await knex('tag_post').insert({ tag: idTag.id_tag, post: idPost[0] });
    });
    // response to client
    return res.json({
        result: 'OK',
    });
};

const updatePost = async (req, res) => {
    // check if edit own post
    if (req.session.user.role === 'client') {
        const query = await knex('posts').first('*')
            .where('id_post', '=', req.body.id)
            .where('user_post', '=', req.session.user.idUser);
        if (!query) {
            return res.json({
                result: 'NOT OK',
            });
        }
    }
    // update post
    await knex('posts').where('id_post', '=', req.body.id)
        .update({
            name_post: req.body.title,
            slug_post: slugify(req.body.title + String(Date.now())),
            category: Number(req.body.category),
            content: req.body.content,
        });
    // delete old tags
    await knex('tag_post').where('post', '=', req.body.id).del();
    // add new tag
    const tags = req.body.tags.split(',');
    await tags.forEach(async (_tag) => {
        const tag = strim(_tag);
        let idTag = await knex('tags').first('id_tag').where('name_tag', '=', tag);
        if (!idTag) {
            const _idTag = await knex('tags').insert({ name_tag: tag });
            idTag = { id_tag: _idTag[0] };
        }
        await knex('tag_post').insert({ tag: idTag.id_tag, post: req.body.id });
    });
    return res.json({
        result: 'OK',
    });
};

const deletePost = async (req, res) => {
    // check if edit own post
    if (req.session.user.role === 'client') {
        const query = await knex('posts').first('*')
            .where('id_post', '=', req.body['id'])
            .where('user_post', '=', req.session.user.idUser);
        if (!query) {
            return res.json({
                result: 'NOT OK',
            });
        }
    }
    await knex('posts').first('*')
        .where('id_post', '=', req.body['id'])
        .del();
    return res.json({ result: 'OK' });
};
module.exports = {
    addPost,
    updatePost,
    deletePost,
};
