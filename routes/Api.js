const express = require('express');

const router = express.Router();
const handleApi = require('../app/api/apiControllers');
const { isAuth } = require('../app/client/authMiddleware');

router.route('/v1/add-post')
    .post(isAuth, handleApi.addPost);
router.route('/v1/update-post')
    .put(isAuth, handleApi.updatePost);
router.route('/v1/delete-post')
    .delete(isAuth, handleApi.deletePost);
module.exports = router;
