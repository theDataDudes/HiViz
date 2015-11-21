'use strict';
module.exports = angular.module('app.c3-charts',[])
  .directive('c3Charts', function () {
    return {
      scope : true,
      templateUrl : 'views/c3.html',
      link : function(scope, element, attrs) {
        scope.main.IsVisible = false;
        scope.$watch('$ngc', function(filter) {
          if(!filter) return;
          filter.unfilterBy('island');
          filter.sortBy('island');
        });
      }
    };
  })
  .controller('GraphCtrl', require('./controller'));