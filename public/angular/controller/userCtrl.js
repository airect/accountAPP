/**
 * @since 2016.5.22
 */

angular.module('account.userCtrl', [])
    .controller('addCheckType', ['$scope', '$http',
        function ($scope, $http) {
            $scope.optionName = [
                {'name': '收入', value: 1},
                {'name': '消费', value: -1},
            ];
            $scope.selected = $scope.optionName[0]['value'];
            $scope.addType = function () {
                var data = {
                    'type': $scope.selected,
                    'name': $scope.typename
                };
                console.log(data);
                $http({
                    method: 'POST',
                    url: '/setting/addtype',
                    data: data,
                }).then(function (resp) {
                    if (resp.status == 200) {

                    } else {

                    }
                }, function (resp) {
                    console.log('err' +  resp);
                });
            }
        }
    ]);