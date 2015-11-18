//directive for displaying other expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      var otherOdo = new Odometer({
        el : element[0],
        value : 0,
        animation : 'count',
        format: '(,ddd).ddd'
      });

      scope.$watch('selectedMonth', function () {
        if (!scope.$ngc) return;
        otherOdo.update(scope.expenditureTotal.other);
      });

      scope.$on('crossfilter/updated', function () {
        otherOdo.update(scope.expenditureTotal.other);
      });
    }
  }
}];