/**
 * Created by Administrator on 2016/1/28.
 */
var mongo = require('./db');

function User(user) {
    this.username = user.username;
    this.email      = user.email;
    this.passwd   = user.passwd;

}

/**
 * 获取一个用户的信息
 * @param {String} user 含用户信息的对象
 */
User.getOneUser = function(user, callback) {
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('user',  function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.findOne(user, function(err, item) {
                mongo.close();
                if(err) return callback(err);
                return callback(null, item);
            });
        });
    });
}

/**
 * 添加一个用户
 * @param {Object} user
 * @callback
 */

User.prototype.addOneUser = function(callback) {
    var user = {
        username: this.username,
        email: this.email,
        passwd: this.passwd
    };
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
                console.log(err);
                if(err) return callback(err);
                return callback(null, (docs.ops)[0]);
            });
        })
    });
}

/**
 * 修改一个用户
 */
User.prototype.updateOneUser = function(callback) {

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
