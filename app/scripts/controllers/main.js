'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http, apiEndPoint) {
    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});