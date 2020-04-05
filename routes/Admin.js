const express = require('express');
const router = express.Router();
const { isAuth, isNotAuth } = require("../app/admin/authMiddlewares")
const userHandle = require("../app/admin/userControllers")
const authHandle = require("../app/admin/authControllers")
const productHandle = require("../app/admin/productControllers")
const { updateUserValidate, registerValidate, } = require("../validate/userValidate")
const { TypeValidate, updateTypeValidate, } = require("../validate/productValidate")

/* GET users listing. */
//home page
router.get('', isAuth, userHandle.homePage);
//auth
router.get('/user/login', isNotAuth, authHandle.getLogin);
router.get('/user/logout', authHandle.getLogout);
router.post('/user/login', authHandle.postLogin);
router.get('/user/register', userHandle.getRegister);
router.post('/user/register', registerValidate, userHandle.postRegister);
//view
router.get('/view/listuser', isAuth, userHandle.renderListUser);
router.put('/view/edit',updateUserValidate , isAuth, userHandle.updateProfile);
router.delete('/view/delete', isAuth, userHandle.deleteUser);
router.get('/view/detail/:id', isAuth, userHandle.detailUser);
router.get('/view/products', isAuth, productHandle.getProducts);
router.post('/addnewtype', isAuth, TypeValidate, productHandle.addNewType);
router.delete('/deletetype', isAuth, productHandle.deleteType);
router.post('/addnewproduct', isAuth, productHandle.addNewProduct);
router.delete('/deleteproduct', isAuth, productHandle.deleteProduct);
router.post('/detailtype', isAuth, productHandle.detailType);
router.put('/updatetype', isAuth,updateTypeValidate, productHandle.updateType);
router.post('/detailproduct', isAuth, productHandle.detailProduct);
router.put('/updateproduct', isAuth,updateTypeValidate, productHandle.updateProduct);



// view not use


module.exports = router;
