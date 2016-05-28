/**
 * service
 */
angular.module('account.servicer', [

])
    //获取账单列表
    .factory('checks', ['$http', function($http) {
        var path  =  '';
        var checks = $http.get(path).then(function(resp) {
            return resp.data;
        });
        var factory = {
            all: function() {
                return checks;
            },

        };
        return factory;


    }]);
