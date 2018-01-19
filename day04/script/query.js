angular.module('App',['ngResource'])
    .controller('myctrl',function ($scope,beianStatisticsService) {
        $scope.test = 'haha'
        $scope.condition = {}
        $scope.query = function () {
            console.log('1.',$scope.condition.entrustcompanyname)
            console.log('2.',$scope.condition.genericname)
            $scope.condition.hospitalarea = '210000'
            return  beianStatisticsService.getBeianStatisticsList($scope.condition).$promise.then(function (data) {
                console.log('3.',data)
            });
        }
    })
    .factory('beianStatisticsService',function ($resource) {
        var factory = {}
        var baseUrl = 'http://localhost'
        var beianStatisticsResource = $resource(baseUrl + '/api/basicinfo/StatisticsAnalysis/querySuccessRecordByPage', {}, {
            queryByPage: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*'
                },
            }
        })
        factory.getBeianStatisticsList = function (condition) {
            return beianStatisticsResource.queryByPage(condition, function (data) {
                console.log('data',data)
                return data;
            })
        }
        return factory
    })
    // .config(function($httpProvider) {
    //     $httpProvider.defaults.headers.common = { 'Content-Type' : 'application/json' }
    // })