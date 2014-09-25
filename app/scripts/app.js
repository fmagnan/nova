'use strict';

var modules = [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
];
angular.module('novaApp', modules).config(function ($routeProvider) {
    $routeProvider
        .when('/posts/:feedId', {
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .otherwise({
            redirectTo: '/posts/1'
        });
});