// database setting
const { knex } = require('../../config/database')
const { validationResult } = require('express-validator');
const slugify = require('slugify')
moment = require("moment")
// main
const getProducts = async (req, res, next) => {
    type = await knex.select('*').from('type').leftJoin('users', 'type.who_create_type', 'users.id')
    products = await knex.select('*')
    .from('products')
    .leftJoin('users', 'products.who_create_product', 'users.id')
    .leftJoin('type', 'products.type', 'type.id_type')
    return res.render('list-product', { 
        "user": req.session.user,
        'note': req.flash("errors_type"),
        "type": type,
        "products": products,
    });
}
const addNewType = async (req, res, next) => {
    const errors = validationResult(req);
    //validate
    if (!errors.isEmpty()) {
        str = ""
        errors.errors.forEach((item) => {
            str += item.msg + "<br>"
        })
        req.flash("errors_type", str)
        return res.redirect("/admin/view/products")
    }
    const name = req.body.nameOfNewType
    const user = req.session.idUser
    // add
    await knex('type').insert({
        'name_type': name,
        'slug_type': slugify(name + String(Date.now())),
        'who_create_type': user,
    })
    return res.redirect('/admin/view/products')
}
const deleteType = async (req, res, next) => {
    await knex('type')
        .where('id_type', Number(req.body.iddelete))
        .del()
    return res.redirect("/admin/view/products")
}
const addNewProduct = async (req, res, next) => {
    const errors = validationResult(req);
    //validate
    if (!errors.isEmpty()) {
        str = ""
        errors.errors.forEach((item) => {
            str += item.msg + "<br>"
        })
        req.flash("errors_type", str)
        return res.redirect("/admin/view/products")
    }
    const name = req.body.product_name
    const user = req.session.idUser
    let path = "/images_of_products/no-img.png" 
    if (req.file){
        path = "/" + req.file.destination.split("/").slice(1).join("/") + "/" + req.file.filename
    }
    // add
    await knex('products').insert({
        'name_product': name,
        'price': req.body.product_price,
        'slug_product': slugify(name + String(Date.now()) + String(user)),
        'describe': req.body.decribe,
        'type': req.body.type_id,
        'who_create_product': user,
        'image_product': path,
    })
    return res.redirect('/admin/view/products')
}
const deleteProduct = async (req, res, next) => {
    await knex('products')
        .where('id_product', Number(req.body.iddelete))
        .del()
    return res.redirect("/admin/view/products")
}
const detailType = async (req, res, next) => {
    type = await knex.select('name_type', 'id_type', 'created_at_type', 'updated_at_type', 'fullname')
    .from('type')
    .where("id_type","=",req.body.id)
    .leftJoin('users', 'type.who_create_type', 'users.id')
    products = await knex.select('name_product')
    .from('products')
    .where("type","=",req.body.id)
    console.log(products)

    if (type.length == 0){
        result = "";
        data = {}
    } else{
        result = "OK";
        data = type[0]
        data["created_at_type"] = moment(data["created_at_type"]).format("DD/MM/YYYY")
        data["updated_at_type"] = moment(data["updated_at_type"]).format("DD/MM/YYYY")
        data["products"] = products; 
    } 
    return res.json({
        "result": result,
        "data": data
    })
}
const updateType = async (req, res, next) => {
    const errors = validationResult(req);
    //validate
    if (!errors.isEmpty()) {
        str = ""
        errors.errors.forEach((item) => {
            str += item.msg + ". "
        })
        response = {
            "result": "Not OK",
            "error": str,
        }
        return res.json(response)
    }
    name = req.body.name_update_type
    id = req.body.id_update_type
    await knex('type')
        .where('id_type', '=', Number(id))
        .update({
            name_type: name,
        })
    return res.json({"result": "OK"})    
}
const detailProduct = async (req, res, next) => {
    product = await knex.select('name_product', 'price', 'describe', 'created_at_product', 'updated_at_product', 'image_product', 'fullname', 'id_type', 'name_type')
    .from('products')
    .where("id_product","=",req.body.id)
    .leftJoin('users', 'products.who_create_product', 'users.id')
    .leftJoin('type', 'products.type', 'type.id_type')
    if (product.length == 0){
        return res.json({
            "result": "NOT OK",
        })
    }
    data = product[0]
    data["created_at_product"] = moment(data["created_at_product"]).format("DD/MM/YYYY")
    data["updated_at_product"] = moment(data["updated_at_product"]).format("DD/MM/YYYY")
    return res.json({
        "result": "OK",
        "data": data,
    }) 
}
const updateProduct = async (req, res, next) => {
    await knex('products')
        .where('id_product', '=', Number(req.body.id))
        .update({
            name_product: req.body.product_name,
            price: req.body.product_price,
            describe: req.body.decribe,
            type: req.body.type_id,
        })
    return res.redirect('/admin/view/products')
}
module.exports = {
    getProducts,
    addNewType,
    deleteType,
    addNewProduct,
    deleteProduct,
    detailType,
    updateType,
    detailProduct,
    updateProduct,
}