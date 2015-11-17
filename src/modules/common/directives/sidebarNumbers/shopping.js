//directive for displaying shopping expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      // console.log(scope);
      var shoppingOdo = new Odometer({
        el : element[0],
        value : 1000
      });

      scope.$watch('selectedMonth', function () {
        shoppingOdo.update(scope.expenditureTotal.shopping);
      });

      scope.$on('crossfilter/updated', function () {
        shoppingOdo.update(scope.expenditureTotal.shopping);
      });
    }
  }
}];