var db = require('../db');

module.exports.requiredAuth = function(req, res, next){
    if (!req.signedCookies.userID){
        res.redirect('/auth/login');
    }

    var user = db.get('users').find({id:req.signedCookies.userID}).value();
    var cartItems = db.get('session').find({id: req.signedCookies.sessionID}).get('.cart').value();

    if (!user){
        res.redirect('/auth/login');
    }

    res.locals.user = user;
    res.locals.cartItems = cartItems;

    next();
}

module.exports.logged = function(req, res, next){
    if (req.signedCookies.userID){
        res.redirect('/users');
    }

    next();
}