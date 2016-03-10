/**
* router
*/
var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var Check   = require('../model/check.js');
var User    = require('../model/user.js');
var crypto = require('crypto');
var md5     = crypto.createHash('md5');
//var flash   = require('connect-flash');


//
//router.get(function(req, res) {

//});
//首页
router.get('/', function(req, res) {
	res.render('home/index' ,{
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

//登陆
router.get('/login', function(req, res) {
    res.render('home/login', {
        title: '登录'
    });
});

router.post('/login', function(req, res) {
	User.getUser({email:req.body.email, passwd: req.body.passwd}, function(err, data) {
		if(err) {
			res.json({login: '0'});
			console.log(err);
			return ;
		}
		if(data.length > 1) {
			res.json({login: '0'});
			console.log(data.length);
			return ;
		}

		data.login = '1';
		res.json(data);
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
		res.json({error: "信息不完整"});
		return ;
	}
	User.addUser({email: req.body.email,
				  username: req.body.username,
				  passwd: req.body.passwd},
		function(err, result) {
			if(err) {
				err.error = '添加用户失败';
				res.json({error: err});
				return ;
			}
			res.json(result);
	})
});
//找回密码

module.exports = router;