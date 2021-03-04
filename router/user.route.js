var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

var controller = require('../controllers/users.controller');

var router = express.Router();

router.get('/', controller.get);

router.get('/create', controller.create);

router.post('/create',upload.single('avatar'), controller.postCreate);

router.get('/search', controller.search);

router.get('/:id', controller.getView);

module.exports = router;