'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http, EnvironmentService) {
    $http.get(EnvironmentService.apiRootPath + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});
