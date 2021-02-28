var express = require('express');
var app = express();
var usersRoute = require('./router/user.route');
var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res){
    res.render('index');
});

app.use(express.static('public'))

app.use('/users', usersRoute);

app.listen(port, function(){
    console.log(`Example app listening at http://localhost:${port}`);
});