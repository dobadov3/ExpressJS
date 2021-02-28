var express = require('express');

var controller = require('../controllers/users.controller');

var router = express.Router();

router.get('/', controller.get);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/search', controller.search);

router.get('/:id', controller.getView);

module.exports = router;