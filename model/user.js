/**
 * Created by Administrator on 2016/1/28.
 */
var mongo = require('./db');

function User() {

}

/**
 * 获取一个用户的信息
 * @param {String} user 含用户信息的对象
 */
User.getUser = function(user, callback) {
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('user',  function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.find(user).toArray(function (err, items) {
                mongo.close();
                if(err) return callback(err);
                if(items.length == 1) {
                    return callback(null, items[0]);
                } else {
                    return callback(null, items);
                }

            });
        });
    });
}

/**
 * 添加一个用户
 * @param {Object} user
 */

User.addUser = function(user, callback) {
    mongo.open(function(err, db) {
        if(err) {
            mongo.close();
            return callback(err);
        }
        db.collection('user', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.insert(user, {safe: true}, function(err, docs) {
                console.log(user);
                mongo.close();
                if(err) return callback(err);
                return callback(null, docs);
            });
        })
    });
}

/**
 * 删除一个用户
 * @param {Object} user：包含用户一个或多个特征信息的对象
 */
User.delUser = function(user, callback) {
    mongo,open('user', function(err, db) {
        if(err) return callback(err);
        db.collection('user', function(err, collection) {
            if(err) return callback(err);
            collection.remove(user,{safe: true}, function(err, count) {
                if(err) return callback(err);
                return callback(null, count);
            });
        });
    });
}
module.exports = User;
