'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http, apiEndPoint) {
    $scope.generateRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
            $scope.feeds[feeds[i].id]['color'] = $scope.generateRandomColor();
        }
    });
});