'use strict';

angular.module('novaApp').controller('PostsCtrl', function ($scope, $http, $routeParams, apiEndPoint) {
    var uri = apiEndPoint + '/posts/' + $routeParams.feedId;
    $http.get(uri).success(function (response) {
        $scope.posts = response.data;
    });
    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});