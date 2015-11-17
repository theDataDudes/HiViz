//directive for displaying total expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      // console.log(scope);
      var totalOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count'
      });

      scope.$watch('selectedMonth', function () {
        totalOdo.update(scope.expenditureTotal.total / 10000 );
      });

      scope.$on('crossfilter/updated', function () {
        totalOdo.update(scope.expenditureTotal.total / 10000);
      });
    }
  }
}];