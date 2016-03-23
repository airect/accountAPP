/**
 * Created by Administrator on 2016/3/10.
 */
var express = require('express');
var router = express.Router();
module.exports = router;

router.use(function(req, res, next) {
    //判断是否已经登录
    var isLogin = req.session.user;
    console.log(isLogin);
    //var isLogin = true;
    if(!isLogin) {
        return res.json({
            error: 'notlogin',
            msg:   '未登录'
        });
    }
    next();
});

//用户主页
router.get('/', function(req, res) {
    res.render('user/index', {
        title: '用户中心'
    });
});

//

