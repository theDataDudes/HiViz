'use strict';
module.exports = angular.module('app.sideCharts',[])
  .directive('donutCharts', function() {
    return {
      scope : true,
      controller : 'DonutController',
      controllerAs : 'donutCtrl',
      templateUrl : 'views/donutChart.html'
    };
  })
  .controller('DonutController', require('./controller'));
