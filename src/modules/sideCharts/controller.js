'use strict';
module.exports = ['$scope', ($scope) => {
  $scope.donut = null;

  $scope.showDonut = function() {
    $scope.donut = c3.generate({
      bindto: '#donut',
      data: {
        columns: [
            ['Food', 400],
            ['Entertainment', 600],
            ['Transportation', 150],
            ['Shopping', 1000],
            ['Loding', 800],
            ['Other', 80]
        ],
        type: 'donut'
      },
      donut: {
        title: 'Expenditures',
        width: 70,
        inner_radius: 0.5
      },
    });
  };
}];