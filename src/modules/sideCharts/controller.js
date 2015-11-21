'use strict';
module.exports = ['$scope', '$timeout', ($scope, $timeout) => {
  $scope.donut = null;

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
          'SEP', 'OCT', 'NOV', 'DEC'];

  $scope.selectedMonth = 'JAN';

  $scope.showDonut = function() {
    $scope.donut = c3.generate({
      bindto : '#donut',
      data : {
        columns : [
            ['Total Monthly Arrivals', 0],
        ],
        type : 'bar',
        onclick : function (d, element) {
          $scope.selectedMonth = months[d.index];
          $scope.safeApply();
        },
        color: function (color, d) {
            return d.index === months.indexOf($scope.selectedMonth) ? "#86BB6A" : "#225A6D";
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

  $scope.$on('crossfilter-updated', function() {
    $timeout(function(){
      $scope.donutLoad();
      $scope.expenditureTotal = $scope.collection[0].month[$scope.selectedMonth];
      }, 800);
  });

  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.donutLoad();
    $scope.expenditureTotal = $scope.collection[0].month[$scope.selectedMonth];
    $scope.safeApply();
  });


  $scope.$watch('$ngc', function () {
    $scope.donutLoad = function () {
      var monthArray = [0,0,0,0,0,0,0,0,0,0,0,0];
      for (var q in $scope.collection[0].month) {
        if (q !== 'TOTAL') {
              switch (q) {
                case 'JAN': monthArray.splice(0, 1,$scope.collection[0].month[q]); break;
                case 'FEB': monthArray.splice(1, 1,$scope.collection[0].month[q]); break;
                case 'MAR': monthArray.splice(2, 1,$scope.collection[0].month[q]); break;
                case 'APR': monthArray.splice(3, 1,$scope.collection[0].month[q]); break;
                case 'MAY': monthArray.splice(4, 1,$scope.collection[0].month[q]); break;
                case 'JUN': monthArray.splice(5, 1,$scope.collection[0].month[q]); break;
                case 'JUL': monthArray.splice(6, 1,$scope.collection[0].month[q]); break;
                case 'AUG': monthArray.splice(7, 1,$scope.collection[0].month[q]); break;
                case 'SEP': monthArray.splice(8, 1,$scope.collection[0].month[q]); break;
                case 'OCT': monthArray.splice(9, 1,$scope.collection[0].month[q]); break;
                case 'NOV': monthArray.splice(10, 1,$scope.collection[0].month[q]); break;
                case 'DEC': monthArray.splice(11, 1,$scope.collection[0].month[q]); break;
                }
              }
      }
      monthArray = monthArray.map( (c) => {
        return c.passengers;
      });

      monthArray.unshift('Total Monthly Arrivals');

      $scope.donut.load({
        columns : [ monthArray ]
      });
    };
    $scope.$watch('selectedMonth', function (selectedMonth) {
      if (!$scope.$ngc) return;
      $scope.expenditureTotal = $scope.collection[0].month[$scope.selectedMonth];
      $scope.donutLoad();
      $scope.safeApply();
    });
  });
}];