'use strict';
module.exports = angular.module('app.c3-charts',[])
  .directive('c3Charts', function () {
    return {
      scope : true,
      controller : 'GraphCtrl',
      controllerAs : 'graphtCtrl',
      templateUrl : 'views/c3.html',
      link : function(scope) {
        scope.$watch('$ngc', function(filter) {
          if(!filter) return;
          filter.unfilterBy('island');
          filter.unfilterBy('region');
          console.log(filter.collection());
        });
      }
    };
  })
  .controller('GraphCtrl', require('./controller'));