'use strict';

angular.module('novaApp').controller('MainCtrl', function ($scope, $http) {
    $http.get('http://galactus.local.guest.net/feeds').success(function (response) {
        $scope.feeds = response['data'];
    });
});
