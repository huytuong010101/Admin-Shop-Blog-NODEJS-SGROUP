const { knex } = require("../../config/database");
const slugify = require('slugify')

const addPost = async (req, res, next) => {
    await knex("posts").insert({
        name_post: req.body.title,
        slug_post: slugify(req.body.title + String(Date.now())),
        category: Number(req.body.category),
        content: req.body.content,
        who_create_post: req.session.idUser,
    })
    return res.json({
        "result": "OK",
    })
}

const updatePost = async (req, res, next) => {
    //check if edit own post
    if (req.session.role == "client") {
        query = await knex("posts").first("*")
            .where("id_post", "=", req.body["id"])
            .where("who_create_post", "=", req.session.userId)
        if (!query) {
            return res.json({
                result: "NOT OK",
            });
        }
    }
    await knex("posts").where("id_post", "=", req.body["id"])
        .update({
            name_post: req.body.title,
            slug_post: slugify(req.body.title + String(Date.now())),
            category: Number(req.body.category),
            content: req.body.content,
        })
    return res.json({
        "result": "OK",
    })
}

const deletePost = async (req, res, next) => {
    console.log(req.body)
    //check if edit own post
    if (req.session.role == "client") {
        query = await knex("posts").first("*")
            .where("id_post", "=", req.body["id"])
            .where("who_create_post", "=", req.session.userId)
        if (!query) {
            return res.json({
                result: "NOT OK",
            });
        }
    }
    await knex("posts").first("*")
        .where("id_post", "=", req.body["id"])
        .del()
    return res.json({ result: "OK" })
}
module.exports = {
    addPost,
    updatePost,
    deletePost,
}