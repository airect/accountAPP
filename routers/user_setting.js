/**
 * 用户设置 controller
 * @author sunxiaojiao
 */
var express  =  require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var CheckType = require('../models/checkType.js');
var User      = require('../models/user.js');
var multer    = require('multer');

var dest      = 'uploads/';
var upload    = multer({'dest': dest});

var fs        = require('fs');

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
 * 我的资料
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
 * 修改我的资料
 */
router.post('/update_profile', function (req, res) {
    var user = req.session.user;
    var UserModel = new User(user);
    UserModel.updateOneUser(req.body, function (err, result) {
        if (err) return res.json({
            err: 1,
            msg: err
        });

        res.json({
            status: 200,
            data: result,
            msg: 'ok'
        });
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
router.post('/add_avatar', upload.single('avatar'), function (req, res) {
    var userModel = new User({"_id": req.session.user._id});
    console.log(req.file);

    // TODO 文件上传需要共用
    if (!req.file) return res.json({
        err: 0,
        msg: '参数错误'
    });

    /* 更该文件名称 这里也可以用lastIndexOf 取最后一个.的位置 */
    var matches = req.file.originalname.match(/(.+)\.((?!\.)+.+)$/);
    var suffix = matches[2];  // 后缀
    var newFileName = dest + req.file.filename + '.' + suffix;
    fs.renameSync(dest + req.file.filename, newFileName);

    userModel.avatar = '/' + newFileName;

    userModel.setAvatar(function (err, result) {
        if (err)
            return res.json({
                err: 0,
                msg: '上传失败'
            });

        req.session.isNeedUpdate = 1;
        return res.json({
            status: 200,
            msg: '上传成功',
            datas: userModel.avatar

        });
    });
});
