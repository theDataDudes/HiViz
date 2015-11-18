//directive for displaying shopping expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var shoppingOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        shoppingOdo.update(scope.expenditureTotal.shopping / 10000);
      });

      scope.$on('crossfilter/updated', function () {
        shoppingOdo.update(scope.expenditureTotal.shopping / 10000);
      });
    }
  }
}];