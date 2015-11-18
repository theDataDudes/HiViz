'use strict';
module.exports = angular.module('app.sideCharts',[])
  .directive('donutCharts', function() {
    return {
      scope : true,
      controller : 'DonutController',
      controllerAs : 'donutCtrl',
      templateUrl : 'views/donutChart.html',
      link : function (scope) {
        scope.$watch('$ngc', function(filter) {
          if(!filter) return;
          filter.filterBy('region', 'total');
          filter.filterBy('island', 'total');
        });
      }
    };
  })
  .controller('DonutController', require('./controller'));
