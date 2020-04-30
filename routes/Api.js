const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'public/images_of_posts' });
const handleApi = require('../app/api/apiControllers');
const { isAuth } = require('../app/client/authMiddleware');

router.route('/v1/add-post')
    .post(isAuth, handleApi.addPost);
router.route('/v1/update-post')
    .put(isAuth, handleApi.updatePost);
router.route('/v1/delete-post')
    .delete(isAuth, handleApi.deletePost);
router.route('/v1/upload-image')
    .post(upload.single('file'), (req, res) => res.json({ location: `/images_of_posts/${req.file.filename}` }));
module.exports = router;
