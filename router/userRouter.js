/**
 * Created by Administrator on 2016/3/10.
 */
var express = require('express');
var router = express.Router();
module.exports = router;

router.use(function(req, res, next) {
    //判断是否已经登录
    //var isLogin = res.session;
    var isLogin = false;
    if(!isLogin) {
        return res.json({
            error: 'notlogin',
            msg:   '未登录'
        });
    } else {
        next();
    }
});
//用户主页
router.get('/', function(req, res) {
    res.send('Yonghu zhongxin');
});
//
