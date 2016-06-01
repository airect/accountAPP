/**
 * 账单类型
 * @since 2016.5.22
 */
var mongo = require('./db.js');
var ObjectId = require('mongodb').ObjectID;
var CheckType = function (_id) {
    this.userId = ObjectId(_id);
    console.log(typeof this.userId, this.userId);
};

CheckType.prototype = {
    /**
     * 增加一个账单类型
     */
    addCheckType: function (checkType, callback) {
        var $this = this;
        mongo.open(function(err, db) {
            if (err) {
                return callback(err);
            }
            db.collection('user', function (err, user) {
                if (err) return callback(err);
                user.update(
                    {_id: $this.userId},
                    {$addToSet: {check_types: {name: checkType.name, create_time: checkType.create_time}}},
                    function (err, results) {
                        if (err) return callback(err);
                        return callback(null, results);
                    }
                );
            });
        });
    },

    /**
    * 获取所有账单类型
    */
    getTypeInfo: function (callback) {
        var $this = this;
        mongo.open(function (err, db) {
            if (err) return callback(err);
            db.collection('user', function(err, user) {
                if (err) return callback(err);
                user.find({_id: $this.userId}, {'check_types': 1}).toArray(function (err, items) {
                    if (err) return callback(err);
                    return callback(null, items);
                });
            });
        });
    }


};

/**
 * 删除一个账单类型
 */

/**
 * 修改一个账单类型
 */


module.exports = CheckType;