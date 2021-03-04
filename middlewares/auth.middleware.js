var db = require('../db');

module.exports.requiredAuth = function(req, res, next){
    if (!req.cookies.userID){
        res.redirect('/auth/login');
    }

    var user = db.get('users').find({id:req.cookies.userID}).value();

    if (!user){
        res.redirect('/auth/login');
    }

    next();
}

module.exports.logged = function(req, res, next){
    if (req.cookies.userID){
        res.redirect('/users');
    }

    next();
}