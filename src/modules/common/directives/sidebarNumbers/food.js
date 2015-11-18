//directive for displaying food expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var foodOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        foodOdo.update(scope.expenditureTotal.food / 10000);
      });

      scope.$on('crossfilter/updated', function () {
        foodOdo.update(scope.expenditureTotal.food / 10000);
      });
    }
  }
}];