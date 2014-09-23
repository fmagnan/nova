'use strict';

/**
 * @ngdoc function
 * @name novaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the novaApp
 */
angular.module('novaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
