'use strict';

/**
 * @ngdoc function
 * @name novaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the novaApp
 */
angular.module('novaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
