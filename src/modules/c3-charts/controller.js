'use strict';
module.exports = ['$scope', 'Crossfilter', ($scope, Crossfilter) => {
  $scope.oahuChart = null;

  $scope.$watch('$ngc', function(filter) {
    // var oahuFilter = new Crossfilter(filter.collection());
    // $scope.oahuFilter = oahuFilter;
    // oahuFilter.filterBy('region', 'oahu');

    $scope.chartLoad = function () {
      $scope.collection.reduce( function(previous, current) {
        current.monthArray = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (var q in current.month) {
            if (q !== 'TOTAL') {
              switch (q) {
                case 'JAN':
                  current.monthArray.splice(0, 1,current.month[q]);
                  break;
                case 'FEB':
                  current.monthArray.splice(1, 1,current.month[q]);
                  break;
                case 'MAR':
                  current.monthArray.splice(2, 1,current.month[q]);
                  break;
                case 'APR':
                  current.monthArray.splice(3, 1,current.month[q]);
                  break;
                case 'MAY':
                  current.monthArray.splice(4, 1,current.month[q]);
                  break;
                case 'JUN':
                  current.monthArray.splice(5, 1,current.month[q]);
                  break;
                case 'JUL':
                  current.monthArray.splice(6, 1,current.month[q]);
                  break;
                case 'AUG':
                  current.monthArray.splice(7, 1,current.month[q]);
                  break;
                case 'SEP':
                  current.monthArray.splice(8, 1,current.month[q]);
                  break;
                case 'OCT':
                  current.monthArray.splice(9, 1,current.month[q]);
                  break;
                case 'NOV':
                  current.monthArray.splice(10, 1,current.month[q]);
                  break;
                case 'DEC':
                  current.monthArray.splice(11, 1,current.month[q]);
                  break;
              }
            }
          }
        current.monthArray = current.monthArray.map( (c) => {
          return c.other;
        });

        current.monthArray.unshift(current.region);

        if (current.island === previous.island) {

          $scope[current.island + 'Chart'].load({columns: [
            previous.monthArray,
            current.monthArray
          ],
          unload : $scope[current.island + 'Chart'].columns
        });
        }

        return current;
       }, {});
      };
  });

  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.chartLoad();
  });

// pull island data from objects and assign it to each showGraph
// formats the data to what we want
// loop through scope.collection and reference each object (all islands)

  $scope.showGraph = function() {
    // $scope.$ngc.unfilterBy('island');
    $scope.oahuChart = c3.generate({
      bindto: '#oahu',
      data: {
        columns: [

        ],
        type: 'spline',
      },
      size: {
        width: 300,
        height: 150
      }
    });
    $scope.bigIslandChart = c3.generate({
      bindto: '#big',
      data: {
        columns: [

        ],
        type: 'spline',
      },
      size: {
        width: 300,
        height: 150
      }
    });
    $scope.kauaiChart = c3.generate({
      bindto: '#kauai',
      data: {
        columns: [

        ],
        type: 'spline',
      },
      size: {
        width: 300,
        height: 150
      }
    });
    $scope.mauiChart = c3.generate({
      bindto: '#maui',
      data: {
        columns: [

        ],
        type: 'spline',
      },
      size: {
        width: 300,
        height: 150
      }
    });
    $scope.lanaiChart = c3.generate({
      bindto: '#lanai',
      data: {
        columns: [

        ],
        type: 'spline',
      },
      size: {
        width: 300,
        height: 150
      }
    });
    $scope.molokaiChart = c3.generate({
      bindto: '#molokai',
      data: {
        columns: [

        ],
        type: 'spline',
      },
      size: {
        width: 300,
        height: 150
      }
    });
    $scope.totalChart = c3.generate({
      bindto: '#total',
      data: {
        columns: [

        ],
        type: 'spline'
      },
      size: {
        width: 800,
        height: 200
      }
    });
  };
}];