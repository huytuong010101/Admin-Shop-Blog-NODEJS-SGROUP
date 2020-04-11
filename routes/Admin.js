const express = require('express');
const router = express.Router();
const { isAuth, isNotAuth } = require("../app/admin/authMiddlewares")
const userHandle = require("../app/admin/userControllers")
const authHandle = require("../app/admin/authControllers")
const productHandle = require("../app/admin/productControllers")
const { updateUserValidate, registerValidate, } = require("../validate/userValidate")
const { TypeValidate, updateTypeValidate, } = require("../validate/productValidate")
const multer  = require('multer')
const upload = multer({ dest: 'public/images_of_products' })
/* GET users listing. */
//home page
router.route('')
    .get(isAuth, userHandle.homePage);
//auth
router.route('/user/login')
    .get(isNotAuth, authHandle.getLogin)
    .post(authHandle.postLogin);
router.route('/user/logout')
    .get(authHandle.getLogout);    
router.route('/user/register')
    .get(userHandle.getRegister)
    .post(registerValidate, userHandle.postRegister);
//view
router.route('/view/listuser')
    .get(isAuth, userHandle.renderListUser);
router.route('/view/edit')
    .put(updateUserValidate , isAuth, userHandle.updateProfile);
router.route('/view/delete')
    .delete(isAuth, userHandle.deleteUser);
router.route('/view/detail/:id')
    .get(isAuth, userHandle.detailUser);
router.route('/view/products')
    .get(isAuth, productHandle.getProducts);
router.route('/addnewtype')
    .post(isAuth, TypeValidate, productHandle.addNewType);
router.route('/deletetype')
    .delete(isAuth, productHandle.deleteType);
router.post('/addnewproduct', isAuth, upload.single('product_image'), productHandle.addNewProduct);
router.route('/deleteproduct')
    .delete(isAuth, productHandle.deleteProduct);
router.route('/detailtype')
    .post(isAuth, productHandle.detailType);
router.route('/updatetype')
    .put(isAuth,updateTypeValidate, productHandle.updateType);
router.route('/detailproduct')
    .post(isAuth, productHandle.detailProduct);
router.route('/updateproduct')
    .put(isAuth,updateTypeValidate, productHandle.updateProduct);



// view not use


module.exports = router;
