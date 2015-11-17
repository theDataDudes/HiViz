//directive for displaying entertainment expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      // console.log(scope);
      var entertainmentOdo = new Odometer({
        el : element[0],
        value : 0
      });

      scope.$watch('selectedMonth', function () {
        entertainmentOdo.update(scope.expenditureTotal.entertainment);
      });

      scope.$on('crossfilter/updated', function () {
        entertainmentOdo.update(scope.expenditureTotal.entertainment);
      });
    }
  }
}];