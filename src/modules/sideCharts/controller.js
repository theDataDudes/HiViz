'use strict';
module.exports = ['$scope', ($scope) => {
  $scope.donut = null;

  $scope.showDonut = function() {
    $scope.donut = c3.generate({
      bindto: '#donut',
      data: {
        columns: [
            ['Food', 0],
            ['Entertainment', 0],
            ['Transportation', 0],
            ['Shopping', 0],
            ['Loding', 0],
            ['Other', 0]
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

  $scope.donutLoad = function (month) {
    $scope.donut.load({columns: [
            ['Food', $scope.collection[0].month[month].food],
            ['Entertainment', $scope.collection[0].month[month].entertainment],
            ['Transportation', $scope.collection[0].month[month].transportation],
            ['Shopping', $scope.collection[0].month[month].shopping],
            ['Lodging', $scope.collection[0].month[month].lodging],
            ['Other', $scope.collection[0].month[month].other]
    ]});
  }
}];