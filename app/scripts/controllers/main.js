'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});
