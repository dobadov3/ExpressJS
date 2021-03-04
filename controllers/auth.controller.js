var db = require('../db');
var md5 = require('md5');

module.exports.login = function(req, res){
    res.render('./auth/login');
};

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email: email}).value();

    if (!req.body.email){
        res.render('./auth/login', {
            errors: ["Emai is required!"],
            values: req.body
        });
        return;
    }

    if (!req.body.password){
        res.render('./auth/login', {
            errors: ["Password is required!"],
            values: req.body
        });
        return;
    }

    if (!user){
        res.render('./auth/login', {
            errors: ["Account doesn't exits!"],
            values: req.body
        });
        return;
    }

    if (md5(password) !== user.password){
        res.render('./auth/login', {
            errors: ["Wrong password!"],
            values: req.body
        });
        return;
    }

    res.cookie('userID', user.id);
    res.render('./auth/success');
};

module.exports.logout = function(req, res){
    req.cookies.userID = '';

    res.redirect('/');
}