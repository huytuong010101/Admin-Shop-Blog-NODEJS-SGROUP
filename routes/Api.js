const express = require("express");
const router = express.Router();
const handleClient = require("../app/client/showProductControllers");
const handleApi = require("../app/api/apiControllers");
const { isAuth, isNotAuth } = require("../app/client/authMiddleware");
const {
    updateUserValidate,
    registerValidate,
} = require("../validate/userValidate");

router.route("/v1/add-post")
    .post(isAuth, handleApi.addPost)
router.route("/v1/update-post")
    .put(isAuth, handleApi.updatePost)
router.route("/v1/delete-post")
    .delete(isAuth, handleApi.deletePost)
module.exports = router;
