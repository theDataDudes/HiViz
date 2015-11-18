//directive for displaying entertainment expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var entertainmentOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count',
        format: '(,ddd).ddd'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        entertainmentOdo.update(scope.expenditureTotal.entertainment);
      });

      scope.$on('crossfilter/updated', function () {
        entertainmentOdo.update(scope.expenditureTotal.entertainment);
      });
    }
  }
}];