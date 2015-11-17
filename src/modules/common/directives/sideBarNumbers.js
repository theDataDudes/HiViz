//directive for displaying expenditure numbers in the sidebar
'use strict';
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : {
      endValue : '=value'
    },
    templateUrl : 'views/sideBarNumbers.html',
    link : function (scope, element) {

      var odo = new Odometer({
        el : element[0],
        value : 1000
      });
      scope.$watch('endValue', function () {
        odo.update(scope.endValue);
      });
    }
  }
}];