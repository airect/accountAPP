/**
 * 用户设置 controller
 * @author sunxiaojiao
 */
var express  =  require('express');
var router = express.Router();
module.exports = router;

/*
 * 头像设置veiw
 */
router.get('/avatar', function(req, res) {
    res.render('../view/user/setting/avatar.ejs', {
        title: "我的头像"
    });
});

/*
 * 添加账单类型view
 */
router.get('/addtype', function(res, req) {

});