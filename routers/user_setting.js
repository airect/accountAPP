/**
 * 用户设置 controller
 * @author sunxiaojiao
 */
var express  =  require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var CheckType = require('../models/checkType.js');
var User      = require('../models/user.js');

module.exports = router;

/**
 * 登录判断
 */
router.use(function (req, res, next) {
    if (!req.session.user) {
        return res.json({err: 0, msg: '未登录'});
    }

    next();
});

/**
 * 我的信息
 *
 */
router.get('/profile', function (req, res) {
    var userId = req.session.user._id;
    User.getOneUser({'_id': userId}, {}, function (err, result) {
        if (err) return res.json({err: 0, msg: '获取错误'});
        res.json(result);
    });
});

/**
 * 列出用户的所有账单
 */
router.get('/get_check_type', function (req, res) {
    var checkType = new CheckType(req.session.user._id);
    checkType.getTypeInfo(function (err, data) {
        var body = data ? {
                            status: 200,
                            msg: 'ok',
                            datas: data[0]['check_types']
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

/**
 * 我的头像
 */
router.get('/avatar', function (req, res) {
    var _id = req.session.user._id;
    User.getOneUser({"_id": _id}, {}, function (err, result) {
        if (err) {
            res.json({
                err: 0,
                msg: err
            });
        } else {
            res.json({
                datas: result,
                status: 200,
                msg: 'ok'
            });
        }
    });
});

/**
 * 上传头像handler
 */
router.get('/add_avatar', function (req, res) {
    var userModel = new User({"_id": req.session.user._id});

    if (!req.query.avatar) return res.json({
        err: 0,
        msg: '参数错误'
    });
    userModel.avatar = req.query.avatar;

    userModel.setAvatar(function (err, result) {
        if (err)
            return res.json({
                err: 0,
                msg: '上传失败'
            });

        return res.json({
            status: 200,
            msg: '上传成功',
            datas: result

        });
    });
});
