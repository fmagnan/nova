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
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/posts/:feedId', {
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});