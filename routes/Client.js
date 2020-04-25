const express = require("express");
const router = express.Router();
const handleClient = require("../app/client/showProductControllers");
const handlePost = require("../app/client/postControllers");
const handleUser = require("../app/client/userControllers");
const { isAuth, isNotAuth } = require("../app/client/authMiddleware");
const {
  updateUserValidate,
  registerValidate,
} = require("../validate/userValidate");
const multer = require('multer')
const upload = multer({ dest: 'public/images_of_products' })
/* GET users listing. */
//home page
router.route("").get(handleClient.getAllProduct);
router.route("/category/:type").get(handleClient.getProductByCategory);
router.route("/detail/:slug").get(handleClient.detailProduct);
router.route("/register")
  .get(handleUser.getRegister)
  .post(registerValidate, handleUser.postRegister);
router
  .route("/login")
  .get(isNotAuth, handleUser.getLogin)
  .post(handleUser.postLogin);
router.route("/logout")
  .get(handleUser.getLogout)
router.route("/my-product").get(isAuth, handleClient.getMyProduct)
router.post('/add-new', isAuth, upload.single('product_image'), handleClient.addNewProduct);
router.route('/posts')
  .get(handlePost.getAllPost)
router.route('/post/category/:slug')
  .get(handlePost.getPostByCategory)
router.route('/detail-post/:slug')
  .get(handlePost.detailPost)
router.route('/my-post')
  .get(isAuth, handlePost.myPost)
router.route('/new-post')
  .get(isAuth, handlePost.getAddPost)
router.route('/update-post/:slug')
  .get(isAuth, handlePost.getUpdatePost)
// view not use

module.exports = router;
