//directive for displaying food expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      // console.log(scope);
      var foodOdo = new Odometer({
        el : element[0],
        value : 0
      });

      scope.$watch('selectedMonth', function () {
        foodOdo.update(scope.expenditureTotal.food);
      });

      scope.$on('crossfilter/updated', function () {
        foodOdo.update(scope.expenditureTotal.food);
      });
    }
  }
}];