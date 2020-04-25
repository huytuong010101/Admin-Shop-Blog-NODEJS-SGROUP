const express = require('express');
const router = express.Router();
const { isAuth, isNotAuth } = require("../app/admin/authMiddlewares")
const userHandle = require("../app/admin/userControllers")
const authHandle = require("../app/admin/authControllers")
const productHandle = require("../app/admin/productControllers")
const { updateUserValidate, registerValidate, } = require("../validate/userValidate")
const { TypeValidate, updateTypeValidate, CategoryValidate, updateCategoryValidate } = require("../validate/productValidate")
const multer = require('multer')
const upload = multer({ dest: 'public/images_of_products' })
const checkRole = require("../app/role/checkRoleMiddleware")
const handlePost = require("../app/admin/postControlles")
/* GET users listing. */
//home page
router.route('')
    .get(isAuth, checkRole.isAdminOrSuperuser, userHandle.homePage);
//auth
router.route('/user/login')
    .get(isNotAuth, authHandle.getLogin)
    .post(authHandle.postLogin);
router.route('/user/logout')
    .get(authHandle.getLogout);
//view
router.route('/view/listuser')
    .get(isAuth, checkRole.isAdminOrSuperuser, userHandle.renderListUser);
router.route('/view/edit')
    .put(updateUserValidate, isAuth, checkRole.isAdminOrSuperuser, userHandle.updateProfile);
router.route('/view/delete')
    .delete(isAuth, checkRole.isAdminOrSuperuser, userHandle.deleteUser);
router.route('/view/detail/:id')
    .get(isAuth, checkRole.isAdminOrSuperuser, userHandle.detailUser);
router.route('/view/products')
    .get(isAuth, checkRole.isAdminOrSuperuser, productHandle.getProducts);
router.route('/addnewtype')
    .post(isAuth, checkRole.isAdminOrSuperuser, TypeValidate, productHandle.addNewType);
router.route('/deletetype')
    .delete(isAuth, checkRole.isAdminOrSuperuser, productHandle.deleteType);
router.post('/addnewproduct', isAuth, checkRole.isAdminOrSuperuser, upload.single('product_image'), productHandle.addNewProduct);
router.route('/deleteproduct')
    .delete(isAuth, checkRole.isAdminOrSuperuser, productHandle.deleteProduct);
router.route('/detailtype')
    .post(isAuth, checkRole.isAdminOrSuperuser, productHandle.detailType);
router.route('/updatetype')
    .put(isAuth, checkRole.isAdminOrSuperuser, updateTypeValidate, productHandle.updateType);
router.route('/detailproduct')
    .post(isAuth, checkRole.isAdminOrSuperuser, productHandle.detailProduct);
router.route('/updateproduct')
    .put(isAuth, checkRole.isAdminOrSuperuser, updateTypeValidate, productHandle.updateProduct);
//posts
router.route('/list-posts')
    .get(isAuth, checkRole.isAdminOrSuperuser, handlePost.getPosts)
router.route('/add-new-category')
    .post(isAuth, checkRole.isAdminOrSuperuser, CategoryValidate, handlePost.addNewCategory);
//change route
router.route("/change-role/:userid/:roleid")
    .get(isAuth, checkRole.isSuperUser, userHandle.changeRole)
router.route('/update-category')
    .put(isAuth, checkRole.isAdminOrSuperuser, updateCategoryValidate, handlePost.updateCategory);
router.route('/delete-category')
    .delete(isAuth, checkRole.isAdminOrSuperuser, handlePost.deleteCategoty);
router.route('/add-post')
    .get(isAuth, checkRole.isAdminOrSuperuser, handlePost.getAddPost)
router.route('/update-post/:slug')
    .get(isAuth, checkRole.isAdminOrSuperuser, handlePost.getUpdatePost)

// view not use


module.exports = router;
