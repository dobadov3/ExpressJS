
var express = require('express');
var controller = require('../controllers/auth.controller');
var router = express.Router();

router.get('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/login', controller.postLogin);

module.exports = router;