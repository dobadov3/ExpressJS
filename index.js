var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var usersRoute = require('./router/user.route');
var authRoute = require('./router/auth.route');
var productsRoute = require('./router/products.route');
var authMiddlewares = require('./middlewares/auth.middleware');
var sessionMiddlewares = require('./middlewares/session.middleware');
var shortID = require('short-id');
var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(shortID.generate()));
app.use(sessionMiddlewares);

app.get('/',authMiddlewares.requiredAuth, function(req, res){
    if (req.cookies.userID){
        res.render('index', {
            logged: true
        });
    }
    else{
        res.render('index', {
            logged: false
        });
    }
});

app.use(express.static('public'))

app.use('/users', authMiddlewares.requiredAuth, usersRoute);
app.use('/auth', authMiddlewares.logged, authRoute);
app.use('/products', authMiddlewares.requiredAuth, productsRoute);

app.listen(port, function(){
    console.log(`Example app listening at http://localhost:${port}`);
});
