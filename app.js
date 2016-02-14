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
var MongoStore = require('connect-mongo')(session);
var cookieParse = require('cookie-parser');

app.use(cookieParse());

app.user(session({
    secret: setting.cookieSecret,
    store: new MongoStore({
        db: setting.db.dbname
    })
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