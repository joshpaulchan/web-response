var app = angular.module('test', []);

app.controller('messages', function($scope, $http) {
    $http({
        method : "POST",
        data: {'group_num' : 1},
        url : "../calls/getall/GetAllUsers.php"
    }).then(function mySuccess(response) {
        $scope.users = response.data;
    }, function myError(response) {
        $scope.users = response.statusText;
    });
});
