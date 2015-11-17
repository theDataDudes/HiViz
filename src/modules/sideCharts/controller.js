'use strict';
module.exports = ['$scope', ($scope) => {
  $scope.donut = null;

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
          'SEP', 'OCT', 'NOV', 'DEC'];

  $scope.selectedMonth = 'TOTAL';

  $scope.showDonut = function() {
    $scope.donut = c3.generate({
      bindto : '#donut',
      data : {
        columns : [
            ['Arrivals', 0],
        ],
        type : 'bar',

        onmouseover : function (d) {
          $scope.selectedMonth = months[d.index];
          $scope.safeApply();
          // console.log($scope.collection[0].month[$scope.selectedMonth]);
        }
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
    $scope.endValue = $scope.collection[0].month[$scope.selectedMonth].total;
    $scope.safeApply();
    // console.log($scope.selectedMonth);
  });

  $scope.$watch('selectedMonth', function (selectedMonth) {
    // console.log(selectedMonth);
    $scope.endValue = $scope.collection[0].month[$scope.selectedMonth].total;
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