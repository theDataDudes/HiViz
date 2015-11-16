'use strict';
module.exports = ['$scope', ($scope) => {
  $scope.donut = null;

  $scope.showDonut = function() {
    $scope.donut = c3.generate({
      bindto : '#donut',
      data : {
        columns : [
            ['Arrivals', 0],
        ],
        type : 'bar'
      },
      axis : {
        x : {
          type : 'category',
          categories : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
          'SEP', 'OCT', 'NOV', 'DEC']
        }
      },
      bar : {

      }
    });
  };

  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.donutLoad();
  });

  $scope.donutLoad = function () {
    var monthArray = [];
    for (var q in $scope.collection[0].month) {
      if (q !== 'TOTAL')
        monthArray.push($scope.collection[0].month[q]);
    }
    monthArray = monthArray.map( (c) => {
      return c.passengers;
    });

    monthArray.unshift('Arrivals');

    $scope.donut.load({ columns : [
      monthArray
    ]});
  }
}];