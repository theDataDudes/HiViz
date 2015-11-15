'use strict';
module.exports = ['$scope', 'c3', ($scope, c3) => {
  $scope.chart = null;

  $scope.showGraph = function() {
    $scope.chart = c3.generate({
      bindt0: '#oahu',
      data: {
        columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  };
}];