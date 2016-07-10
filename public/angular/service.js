/**
 * service
 */
var service = angular.module('account.service', [

]);

/**
 * 获取账单列表
 */
service.factory('checks', ['$http', function($http) {
    var path  =  '/setting/get_check_type';
    var checks = $http.get(path).then(function(resp) {
        return resp.datas;
    });
    var factory = {
        all: function() {
            return checks;
        },

    };
    return factory;
}]);

/**
 * 账单类型列表
 */
service.factory('checkTypesService', ['$http', function ($http) {

    var path = '/setting/get_check_type';
    var promise = $http.get(path).then(function (resp) {
        return resp.data.datas;
    });

    return {
        getAll: function () {
            return promise;
        }
    };
}]);

/**
 * 用户信息
 */
service.factory('profileService', ['$http', function ($http) {
    var path = '/setting/profile';
    var promise = $http.get(path).then(function (resp) {
        return resp.data;
    }, function () {
        return 'service error';
    });
    return {
      'getAll': function () {
          return promise;
      },
      'getAvatar': function () {
          return promise.then(function () {
              return promise.avatar;
          });
      }
    };
}]);
