//directive for displaying expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element, attrs, ctrl) {
      // console.log(scope);
      var odo = new Odometer({
        el : element[0],
        value : 1000
      });

      scope.$watch('selectedMonth', function () {
        odo.update(scope.endValue);
      });

      scope.$on('crossfilter/updated', function () {
        odo.update(scope.endValue);
      });
    }
  }
}];