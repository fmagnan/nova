'use strict';

angular.module('nova').controller('MainCtrl', function ($scope, $http, apiEndPoint, Pagination) {

    $scope.postsPagination = new Pagination();

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});