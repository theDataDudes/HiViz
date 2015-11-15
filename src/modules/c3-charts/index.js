'use strict';
module.exports = angular.module('app.c3-charts',[])
  .directive('c3Charts', function () {
    return {
      scope : true,
      controller : 'GraphCtrl',
      controllerAs : 'graphtCtrl',
      templateUrl : 'views/c3.html'
    };
  })
  .controller('GraphCtrl', require('./controller'));