'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http, apiEndPoint) {
    $scope.generateColor = function (i) {
        return 220 - 10 * i;
    };

    $scope.filters = {};

    $http.get(apiEndPoint + '/posts').success(function (response) {
        $scope.posts = response.data;
    });

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        var feeds = response.data;
        $scope.feeds = {};
        for (var i= 0 ; i < feeds.length; i++) {
            $scope.feeds[feeds[i].id] = feeds[i];
            $scope.feeds[feeds[i].id]['color'] = $scope.generateColor(i);
        }
    });
});