'use strict';

var novaApp = angular.module('novaApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);

novaApp.config(function ($routeProvider) {
    $routeProvider
        .when('/posts/:feedId', {
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .otherwise({
            redirectTo: '/posts/1'
        });
});