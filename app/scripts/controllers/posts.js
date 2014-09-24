'use strict';

angular.module('novaApp').controller('PostsCtrl', function ($scope, $http, $routeParams) {
    var uri = 'http://galactus.local.guest.net/posts/' + $routeParams.feedId;
    $http.get(uri).success(function (response) {
        $scope.posts = response['data'];
    });
});