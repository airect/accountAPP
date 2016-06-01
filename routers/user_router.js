/**
 * 用户Controller
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
module.exports = router;

router.use(function(req, res, next) {
    //判断是否已经登录
    var isLogin = req.session.user;
    console.log(isLogin);
    //var isLogin = true;
    if(!isLogin){
        res.redirect('/login');
        //return res.json({
        //    error: 'notlogin',
        //    msg:   '未登录'
        //});
    }
    next();
});

//用户主页
router.get('/', function(req, res) {
    res.render('user/index', {
        title: '用户中心'
    });
});

/*
 * 用户设置
 */
router.get('/setting', function(req, res) {
    res.render('user/setting', {
        title: '用户设置'
    });
});

// 个人信息修改页面
router.get('/', function() {
    //读取个人信息
    var info = new User({});
    res.render('', {

    });
});

