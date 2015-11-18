//directive for displaying lodging expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var lodgingOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count',
        format: '(,ddd).ddd'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        lodgingOdo.update(scope.expenditureTotal.lodging);
      });

      scope.$on('crossfilter/updated', function () {
        lodgingOdo.update(scope.expenditureTotal.lodging);
      });
    }
  }
}];