'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http, apiEndPoint) {
    var uri = apiEndPoint + '/posts';
    $http.get(uri).success(function (response) {
        $scope.posts = response.data;
    });
    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});