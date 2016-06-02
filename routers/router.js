/**
* router
*/
var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var Check   = require('../models/check.js');
var User    = require('../models/user.js');
var crypto  = require('crypto');
var md5     = crypto.createHash('md5');
//var flash   = require('connect-flash');


//
//router.get(function(req, res) {

//});

/**
 * 首页
 */
router.get('/', function(req, res) {
	res.render('home/index' , {
		title: '记账app',
        app_url: req.baseUrl
	});
});

//账单列表api
router.post('/checklist', function(req, res) {
    Check.getCheck({}, function(err, checks) {
        if(err) return res.json({error: 1, msg: '查询错误或没有数据'});
        res.json(checks);
    });
});

//关于我们
router.get('/about', function(req, res) {

});

//数据展示页
router.get('/', function(req, res) {

});

//展示支出收入条目
router.get('/', function(req, res) {

});

//添加收入支出页面


//添加收入支出api
router.post('/addcheck', function(req, res) {
    //检测数据
    var acheck = req.body;
	console.log(acheck);
    var f = Check.isComplete(acheck, function(err, isComp) {
        if(err) return res.json({error: 1, msg: err.msg});

    });
    if(f) return ;
	Check.addCheck(acheck, function(err, result) {
		if(err) {
			return res.json({error:1, msg: '添加失败'});
		}
		result.success = 1;
		res.json(result);
	});

});

/**
 * 登录view
 */
router.get('/login', function(req, res) {
    res.render('home/login', {
        title: '登录'
    });
});
/**
 * 登录handler
 */
router.post('/login', function(req, res) {
	User.getOneUser({username: req.body.username, passwd: req.body.passwd}, {}, function(err, user) {
		if(err) {
			res.json({
                error: '0',
                msg: '登录失败'
            });
			console.log(err);
			return ;
		}
		if(user == null) {
            return res.json({
                error: 1,
                msg:  '没有此用户或密码错误'
            });
		} else {
            req.session.user = {
                _id: user._id,
                username: user.username,
                email   : user.email
            };
            return res.json({success: 1});
        }
        console.log(user);

	});
});
//注册
router.get('/reg', function(req, res) {
    res.render('home/reg', {
        title: '用户注册'
    });
});
router.post('/reg', function(req, res) {
	if(req.body.email == '' || req.body.username == '' || req.body.passwd == '') {
		res.json({error:2, msg: "信息不完整"});
		return ;
	}
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        passwd : req.body.passwd
    });
    console.log(user);
    //判断一个用户是否存在
    var isHad = User.getOneUser(user, function(err, item) {
        console.log(item);
        return item;
    });
    if(isHad) {
        return res.json({
            error: 1,
            msg: "用户已经存在"
        });
    }
	user.addOneUser(function(err, user) {
		if(err) {
			res.json({
				error: 1,
				msg  : '添加用户失败'
			});
			return ;
		}
        user.success = 1;
		res.json(user);
	});
});
/*
 * 用户注销
 */
router.get('/logout', function(req, res) {
    console.log(res.locals.session);
    if(req.session.user) {
        req.session.user = null;
        res.locals.session.user = null;
        res.send("<script>location.href='/'</script>");
        //res.redirect(200, '/');
    } else {
        res.locals.session.user = null;
        res.redirect('/');
    }

});
//找回密码

module.exports = router;