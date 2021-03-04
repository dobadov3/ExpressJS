var db = require('../db');
var md5 = require('md5');
db.defaults({users: [] }).write();
var ids = require('short-id');

module.exports.get = function(req, res){
    res.render('./users/index', {
        users: db.get('users').value()
    });
};

module.exports.create = function(req, res){
    res.render('./users/create');
};

module.exports.postCreate = function(req, res){
    req.body.id = ids.generate();
    var errors = [];

    if (!req.body.name){
        errors.push('Name is required!')
    }

    if (!req.body.phone){
        errors.push('Phone is required!')
    }

    if (errors.length){
        res.render('./users/create', {
            errors: errors,
            values: req.body
        });

        return;
    }
    req.body.password = md5(req.body.password);
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.search = function(req, res){
    var q = req.query.q.toLowerCase();

    var resultList = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q) !== -1;
    });

    res.render('./users/index', {
        users: resultList,
        value: q
    })
};

module.exports.getView = function(req, res){
    var id = req.params.id;

    var user = db.get('users').find({id: id}).value();

    res.render('./users/view', {
        user: user
    })
};