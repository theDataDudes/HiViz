//directive for displaying other expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      // console.log(scope);
      var otherOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count'
      });

      scope.$watch('selectedMonth', function () {
        otherOdo.update(scope.expenditureTotal.other / 10000);
      });

      scope.$on('crossfilter/updated', function () {
        otherOdo.update(scope.expenditureTotal.other / 10000);
      });
    }
  }
}];