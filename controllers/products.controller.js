var db = require('../db');

module.exports.get = function(req, res){
    var page = req.query.page || 1;
    var pageItems = 8;

    var begin = (page - 1) * pageItems;
    var end = page * pageItems;
    var next = parseInt(page) + 1;
    var prev = parseInt(page) - 1;
    var products = db.get('products').value().slice(begin, end);

    res.render('./products/index', {
        products: products,
        currentPage: page,
        nextPage: next,
        prevPage: prev
    });
}