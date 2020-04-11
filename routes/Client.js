const express = require('express');
const router = express.Router();
const handleClient = require("../app/client/showProductControllers")

/* GET users listing. */
//home page
router.route('')
    .get(handleClient.getAllProduct)
router.route('/category/:type')
    .get(handleClient.getProductByCategory)
router.route('/detail/:slug')
    .get(handleClient.detailProduct)



// view not use


module.exports = router;
