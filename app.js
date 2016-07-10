/**
 * 记账APP 入口
 * @author airect
 */

var express = require('express');
var app     = express();
var path    = require('path');
var setting = require('./setting.js');
var router  = require('./routers/router.js');
var checkRouter = require('./routers/check.js');
var userRouter  = require('./routers/user_router.js');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var MongoStore  = require('connect-mongo')(session);
var cookieParse = require('cookie-parser');
var connect     = require('connect');
var _lang       =  require('./language/zh_cn.js');

app.locals._lang = _lang;
app.use(cookieParse());

app.use(session({
    secret: setting.cookieSecret,
    key: 'account',
    cookie: {maxAge: 3600 * 24 * 1000},
    store: new MongoStore({
        db: setting.db.dbname,
        host: setting.db.host
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
    "layout": false
});

// set static resource
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// 让前端模板能获取到session变量
app.use('/', function(req, res, next) {
        if (req.session.isNeedUpdate) {
            updateSession(req);
        }

        res.locals.session = req.session;
    next();
});

// set router
app.use('/', router);
app.use('/user', userRouter);
app.use('/check', checkRouter);
app.use('/setting', require('./routers/user_setting.js'));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('accountApp has launched http://%s:%s', host, port);
});
//catch 404 error,all page which no router catch will be catch for this router
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
//error handler
//app.use(function(err, req, res, next) {
//    //err.status(err.status || 500);
//    //
//    if(err) {
//        console.log('error');
//    }
//
//});

function updateSession (req) {
    var session = req.session;
    var User = require('./models/user.js');
    User.getOneUser(session.user, '', function (err, user) {
        if (err) return false;
        console.log(user);
        req.session.user = user;
        req.session.isNeedUpdate = 0;
        return true;
    });
}