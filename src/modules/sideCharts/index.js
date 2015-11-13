'use strict';
module.exports = angular.module('app.sideCharts',['gridshore.c3js.chart'])
  .directive('pieCharts', function() {
    return {
      scope : true,
      controller : 'PieCtrl',
      templateUrl : 'views/pieChart.html'
    };
  })
  .controller('PieCtrl', require('./controller'));
