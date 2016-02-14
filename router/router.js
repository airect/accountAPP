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

//首页
router.get('/', function(req, res) {
	res.render('index' ,{
		title: '记账app'
	});
});

//账单列表api
router.get('/checklist', function(req, res) {

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

//登陆
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
router.post('/logup', function(req, res) {
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

//用户中心
router.get('/user', function(req, res) {
	res.json({s:'s'});
});
module.exports = router;