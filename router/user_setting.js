/**
 * 用户设置 controller
 * @author sunxiaojiao
 */
var express  =  require('express');
var router = express.Router();
module.exports = router;

var Check = require('../model/check.js');
var CheckType = require('../model/checkType.js');

/**
 * 头像设置view
 */
router.get('/avatar', function(req, res) {
    res.render('../view/user/setting/avatar.ejs', {
        title: "我的头像"
    });
});

/**
 * 登录判断
 */
router.use(function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }

    next();
});

/**
 * 列出用户的所有账单
 */
router.get('/get_check_type', function (req, res) {
    var checkType = new CheckType(req.session.user._id);console.log(checkType);
    checkType.getTypeInfo(function (err, data) {
        var body = data ? {
                            status: 200,
                            msg: 'ok',
                            datas: data
                            }
                        : {
                            status: 0,
                            msg: err
                            };
        res.json(body);
    });

});

/**
 * 添加账单类型
 */

router.post('/addtype', function (req, res) {

    var userId = req.session.user._id,
        checkType = {
            'name': req.body.name,
            'create_time': new Date().getTime()
        };
    var checkTypeModel = new CheckType(userId);
    checkTypeModel.addCheckType(checkType, function(err, result) {
        res.json(
            result ? {
                status: 200,
                msg: 'ok',
                datas: result
                    }
                : {
                    status: 0,
                    msg: error
                    }
        );
    })



});