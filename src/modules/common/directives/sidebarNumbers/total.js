//directive for displaying total expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var totalOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count',
        format: '(,ddd).ddd'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        totalOdo.update(scope.expenditureTotal.total);
      });

      scope.$on('crossfilter/updated', function () {
        totalOdo.update(scope.expenditureTotal.total);
      });
    }
  }
}];