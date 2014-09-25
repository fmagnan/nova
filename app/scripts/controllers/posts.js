'use strict';

angular.module('novaApp').controller('PostsCtrl', function ($scope, $http, $routeParams, EnvironmentService) {
    var uri = EnvironmentService.apiRootPath + '/posts/' + $routeParams.feedId;
    $http.get(uri).success(function (response) {
        $scope.posts = response.data;
    });
});