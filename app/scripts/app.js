'use strict';

var setUpApiServerPath = function() {
    return { apiRootPath: 'http://galactus.local.guest.net/api' }; //@grep dev
    return { apiRootPath: '/api' }; //@grep production
};

var modules = [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
];
var novaApp = angular.module('novaApp', modules);
novaApp.factory('EnvironmentService', setUpApiServerPath);
novaApp.config(function ($routeProvider) {
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