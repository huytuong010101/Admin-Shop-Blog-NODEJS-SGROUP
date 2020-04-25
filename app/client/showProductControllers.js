const slugify = require('slugify');
const { knex } = require('../../config/database');

const getAllProduct = async (req, res) => {
  const category = await knex.select('name_category', 'slug_category').from('category');
  const type = await knex.select('name_type', 'slug_type').from('type');
  const products = await knex.select('*').from('products');
  return res.render('client/show-products', {
    note: 'Tất cả sản phẩm',
    type,
    category,
    products,
    user: req.session['user'],
  });
};

const getMyProduct = async (req, res) => {
  const category = await knex.select('name_category', 'slug_category').from('category');
  const type = await knex.select('*').from('type');
  const products = await knex.select('*').from('products').where('who_create_product', '=', Number(req.session['idUser']));
  return res.render('client/my-product', {
    note: 'Tất cả sản phẩm cuả bạn',
    type,
    category,
    products,
    user: req.session['user'],
  });
};

const getProductByCategory = async (req, res) => {
  const category = await knex.select('name_category', 'slug_category').from('category');
  const type = await knex.select('name_type', 'slug_type').from('type');
  const products = await knex
    .select('*')
    .from('type')
    .where('slug_type', '=', req.params.type)
    .rightJoin('products', 'type.id_type', 'products.type');
  return res.render('client/show-products', {
    note: products[0] ? `Sản phẩm thuộc ${products[0].name_type}` : '---',
    type,
    category,
    products,
    user: req.session['user'],
  });
};

const detailProduct = async (req, res) => {
  const type = await knex.select('name_type', 'slug_type').from('type');
  const category = await knex.select('name_category', 'slug_category').from('category');
  const product = await knex
    .select('name_product', 'describe', 'price', 'fullname', 'image_product')
    .from('products')
    .where('slug_product', '=', req.params.slug)
    .leftJoin('users', 'products.who_create_product', 'users.id');
  if (product.length === 0) {
    return res.redirect('/404');
  }
  return res.render('client/detail-product', {
    type,
    category,
    product: product[0],
    user: req.session['user'],
  });
};

const addNewProduct = async (req, res) => {
  const name = req.body.product_name;
  const user = req.session.idUser;
  let path = '/images_of_products/no-img.png';
  if (req.file) {
    path = `/${req.file.destination.split('/').slice(1).join('/')}/${req.file.filename}`;
  }
  // add
  await knex('products').insert({
    name_product: name,
    price: req.body.product_price,
    slug_product: slugify(name + String(Date.now()) + String(user)),
    describe: req.body.decribe,
    type: req.body.type_id,
    who_create_product: user,
    image_product: path,
  });
  return res.redirect('/my-product');
};

module.exports = {
  getAllProduct,
  getProductByCategory,
  detailProduct,
  getMyProduct,
  addNewProduct,
};
