var db = require('../db');
var Product = require('../models/product.model');

module.exports.get = async function(req, res){
    var page = req.query.page || 1;
    var limit = 4;
    var begin = (page - 1) * limit;
    var end = page * limit;
    var products = await Product.find();
    
    res.render('./products/index', {
        products: products.slice(begin, end),
        page: parseInt(page),
        limit: parseInt(limit),
        items: (products.length)/limit,
        countItems: 100
    });
}

module.exports.addToCart = function(req, res){
    var productId = req.params.productId;
    var sessionID = req.signedCookies.sessionID;
    console.log(sessionID);
    if (!sessionID){
        res.redirect('/products');
        return;
    }

    var count = db.get('session').find({id:sessionID}).get('cart.'+productId, 0).value();

    db.get('session').find({id: sessionID}).set('cart.' + productId, count+1).write();

    res.redirect('/products');
}