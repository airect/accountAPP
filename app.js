/**
 * 记账APP 入口
 * @author airect
 */
var express = require('express');
var app = express();
var path = require('path');
var setting = require('./setting.js');
var router = require('./router/router.js');
var bodyParser = require('body-parser');
var session  = require('express-session');
//var MongoStore = require('connect-mongo')(session);
var cookieParse = require('cookie-parser');

app.use(cookieParse());

app.use(session({
    secret: setting.cookieSecret,
    key: 'account',
    cookie: {maxAge: 3600*24*30*1000},
    //store: new MongoStore({
    //    db: setting.db.dbname,
    //    host: setting.db.host
    //}),
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));

//set view engine
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.set('view options', {
    "layout": false
});

//set static resource
app.use('/public', express.static(__dirname + '/public'));

//set router
app.use('/', router);
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
//catch 404 error,all page which no router catch will be catch for this router
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
//error handler
app.use(function(err, req, res, next) {
    //err.status(err.status || 500);
    //
    if(err) {
        console.log('error');
    }

});