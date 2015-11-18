//directive for displaying transportation expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var transportationOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        transportationOdo.update(scope.expenditureTotal.transportation / 10000);
      });

      scope.$on('crossfilter/updated', function () {
        transportationOdo.update(scope.expenditureTotal.transportation / 10000);
      });
    }
  }
}];