const { knex } = require('../../config/database')

const getAllProduct = async (req, res, next) => {
    type = await knex.select('name_type', 'slug_type').from('type')
    products = await knex.select('*').from('products')
    return res.render('show-products', { 
        'note': "Tất cả sản phẩm",
        "type": type,
        "products": products,
    });
}

const getProductByCategory = async (req, res, next) => {
    type = await knex.select('name_type', 'slug_type').from('type')
    products = await knex.select('*').from('type')
    .where('slug_type','=',req.params.type)
    .rightJoin('products', 'type.id_type', 'products.type')
    console.log(products)
    console.log(req.params.type)
    return res.render('show-products', { 
        'note': "Sản phẩm thuộc " + products[0].name_type,
        "type": type,
        "products": products,
    });
}
const detailProduct = async (req, res, next) => {
    type = await knex.select('name_type', 'slug_type').from('type')
    product = await knex.select('name_product', 'describe', 'price', 'fullname', 'image_product')
    .from('products').where('slug_product', '=', req.params.slug)
    .leftJoin('users', 'products.who_create_product', 'users.id')
    if (product.length == 0){
        return res.redirect("/404")
    }
    console.log(product)
    return res.render('detail-product', { 
        "type": type,
        "product": product[0],
    });
}

module.exports = {
    getAllProduct,
    getProductByCategory,
    detailProduct,
}