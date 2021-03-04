var express = require('express');

var controller = require('../controllers/products.controller');

var router = express.Router();

router.use('/', controller.get);

module.exports = router;