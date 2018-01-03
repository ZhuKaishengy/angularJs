angular.module('includeTemplateApp',[])
    .controller('myTemplateCtrl',function ($scope) {
        $scope.flag = false
        $scope.toggle = function () {
            if($scope.flag === false){
                $scope.flag = true
                return
            }
            $scope.flag = false
        }
    })