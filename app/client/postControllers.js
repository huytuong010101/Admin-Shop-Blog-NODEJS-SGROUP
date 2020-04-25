const { knex } = require("../../config/database");


const getAllPost = async (req, res, next) => {
    category = await knex.select("name_category", "slug_category").from("category");
    type = await knex.select("name_type", "slug_type").from("type");
    posts = await knex.select("name_post", "slug_post", "fullname").from("posts")
        .leftJoin("users", "posts.who_create_post", "users.id");
    return res.render("client/show-posts", {
        note: "Tất cả bài viết",
        type: type,
        category: category,
        posts: posts,
        user: req.session["user"],
    });
};
const getPostByCategory = async (req, res, next) => {
    category = await knex.select("name_category", "slug_category").from("category");
    type = await knex.select("name_type", "slug_type").from("type");
    posts = await knex("category").where("slug_category", "=", req.params["slug"])
        .leftJoin("posts", "category.id_category", "posts.category")
        .leftJoin("users", "posts.who_create_post", "users.id");
    return res.render("client/show-posts", {
        note: "Bài viết theo chủ đề",
        type: type,
        category: category,
        posts: posts,
        user: req.session["user"],
    });
};
const detailPost = async (req, res, next) => {
    category = await knex.select("name_category", "slug_category").from("category");
    type = await knex.select("name_type", "slug_type").from("type");
    post = await knex.first("name_post", "content", "fullname", "created_at_post")
        .from("posts").where("slug_post", "=", req.params["slug"])
        .leftJoin("users", "posts.who_create_post", "users.id");
    return res.render("client/detail-post", {
        type: type,
        category: category,
        post: post,
        user: req.session["user"],
    });
}
const myPost = async (req, res, next) => {
    category = await knex.select("name_category", "slug_category").from("category");
    type = await knex.select("name_type", "slug_type").from("type");
    posts = await knex.select("*").from("posts").where("who_create_post", "=", req.session.idUser)
    return res.render("client/my-post", {
        type: type,
        category: category,
        posts: posts,
        user: req.session["user"],
    });
}
const getAddPost = async (req, res, next) => {
    category = await knex.select("name_category", "slug_category", "id_category").from("category");
    type = await knex.select("name_type", "slug_type").from("type");
    return res.render("client/add-post", {
        type: type,
        category: category,
        user: req.session["user"],
    });
}
const getUpdatePost = async (req, res, next) => {
    category = await knex.select("name_category", "slug_category", "id_category").from("category");
    type = await knex.select("name_type", "slug_type").from("type");
    post = await knex('posts').first("*").where("slug_post", "=", req.params["slug"])
        .leftJoin('category', 'posts.category', 'category.id_category');
    if (!post) return res.redirect("404")
    return res.render("client/update-post", {
        type: type,
        category: category,
        user: req.session["user"],
        post: post,
    });
}
module.exports = {
    getAllPost,
    getPostByCategory,
    detailPost,
    myPost,
    getAddPost,
    getUpdatePost,
};
