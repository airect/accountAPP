/**
 * 用户模型
 *
 */
var mongo = require('./db');
var ObjectId = require('mongodb').ObjectID;
function User(user) {
    this._id = ObjectId(user._id);
    this.username = user.username;
    this.email      = user.email;
    this.passwd   = user.passwd;

}

/**
 * 获取一个用户的信息
 * @param {String} user 含用户信息的对象
 */
User.getOneUser = function(user, field, callback) {
    if (typeof user._id != 'undefined' && typeof user._id != 'object') {
        user._id = ObjectId(user._id);
    }
    if (field) {
        field.passwd = 0;
        field.check  = 0;
    } else {
        field = {"check": 0, "passwd": 0};
    }
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('user',  function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.findOne(user, field, function(err, item) {
                if(err) return callback(err);
                //mongo.close();
                return callback(null, item);
            });
        });
    });
};

/**
 * 添加一个用户
 * @callback
 */

User.prototype.addOneUser = function(callback) {
    var user = {
        username: this.username,
        email: this.email,
        passwd: this.passwd
    };
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('user', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.insert(user, {safe: true}, function(err, docs) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                return callback(null, (docs.ops)[0]);
            });
        })
    });
};

/**
 * 修改一个用户的信息
 */
User.prototype.updateOneUser = function(willUpdate, callback) {
    var $this = this;
    mongo.open(function (err, db) {
        if (err) return callback(err);
        db.collection('user', function (err, user) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            user.update({'_id': $this._id},{"$set": willUpdate}, {safe: true}, function (err, result) {
                if (err) {
                    mongo.close();
                    return callback(err);
                }
                return callback(null, result);
            });
        });
    });
};

/**
 * 删除一个用户
 *
 */
User.prototype.delUser = function(callback) {
    var $this = this;
    var user = {
        '_id': $this._id
    };
    mongo.open('user', function (err, db) {
        if(err) return callback(err);
        db.collection('user', function (err, collection) {
            if(err) {
                mongo.colse();
                return callback(err);
            }
            collection.remove(user,{safe: true}, function(err, result) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                return callback(null, result);
            });
        });
    });
};
User.prototype.setAvatar = function (callback) {
    var $this = this;

    mongo.open(function (err, db) {
        if (err) return callback(err);
        db.collection('user', function (err, user) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            user.update({"_id": $this._id}, {"$set": {"avatar": $this.avatar}}, {safe: true}, function (err, result) {
                if (err) {
                    mongo.close();
                    return callback(err);
                }
                return callback(null, result);
            });
        });
    });
}
module.exports = User;
