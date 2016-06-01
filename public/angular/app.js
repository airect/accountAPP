/*
 * angular 首页入口文件
 */
angular.module('account', [
    'ui.router'
    ,'account.user'
    ,'account.userCtrl'
    ,'account.service'
]).run(function() {

})
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // 配置默认路由跳转
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'public/angular/tpl/index/index.html'
            });
    }
]);