'use strict';
module.exports = ['apiService', '$scope', 'Crossfilter', service];

function service (apiService, $scope, Crossfilter) {
  // $scope.annual = [2, 3, 5];
  apiService.getHawaiiVisitors()
    .success( (data) => {
      $scope.$ngc = new Crossfilter(data);
      console.log($scope.$ngc.filterBy('year', '2007'));
  });
};
