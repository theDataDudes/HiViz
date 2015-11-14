'use strict';
module.exports = ['apiService', '$scope', 'Crossfilter', service];

function service (apiService, $scope, Crossfilter) {
  // $scope.annual = [2, 3, 5];
  apiService.getHawaiiVisitors()
    .success( (data) => {
      var filter = new Crossfilter(data);
      $scope.$ngc = filter;

      // $scope.annual = data.filter(function (current) {
      //   return data.year;
      // });
  });
};
