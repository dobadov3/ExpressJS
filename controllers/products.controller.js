var db = require('../db');

module.exports.get = function(req, res){
    var page = req.query.page || 1;
    var pageItems = 4;
    var begin = (page - 1) * pageItems;
    var end = page * pageItems;
    var products = db.get('products').slice(begin, end).value();
    
    res.render('./products/index', {
        products: products,
        page: parseInt(page),
        pageItems: parseInt(pageItems),
        items: (db.get('products').value().length)/pageItems,
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