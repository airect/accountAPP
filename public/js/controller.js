/**
 * Created by Administrator on 2016/3/9.
 * angular controller
 */
(function() {
    var app = angular.module('account', []);
    //账单列表
    app.controller('checkList', function($scope, $http) {
        $http.post('/checklist').success(function(response) {
            var i;
            for(i=0; i<response.length;) {
                if(response[i].money_amount == '') {
                    response.splice(i,1);
                } else {
                    i++;
                }
            }

            for(var j=0; j<response.length; j++) {
                if(response[j].inorout == '消费') {
                    response[j].inorout = '消费';
                } else {
                    response[j].inorout = '收入';
                }
            }
            $scope.checks = response;
        });
    });
    //
    app.controller();

})();