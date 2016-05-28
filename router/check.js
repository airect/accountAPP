/**
 * 账单Controller
 */
var express = require('express');
var router = express.Router();
var User = require('../model/user.js'),
    Check = require('../model/check.js');
var userInfo;
/*
 * filter
 */
router.use(function(req, res, next) {
    if( !req.session.user ) {
        res.redirect('/');
    }
    userInfo =  req.session.user;
    next();
});

/**
 * 获取一个用户的账单
 */
router.get('/check', function(req, res) {
    var UserCheck = new Check(userInfo._id);
    var condition = {};
    UserCheck.getCheck(condition, function(err, items) {
        if(err) return res.json({error: '获取数据失败'});
        res.json({
            status: 200,
            datas: items
        });
    })
});

module.exports = router;