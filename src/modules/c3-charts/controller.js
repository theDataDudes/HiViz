'use strict';
module.exports = ['$scope', 'Crossfilter', ($scope, Crossfilter) => {
  $scope.oahuChart = null;

  $scope.$watch('$ngc', function(filter) {
    var oahuFilter = new Crossfilter(filter.collection());
    $scope.oahuFilter = oahuFilter;
    oahuFilter.filterBy('region', 'oahu');
  });



// pull island data from objects and assign it to each showGraph
// formats the data to what we want
// loop through scope.collection and reference each object (all islands)
  // $scope.chartLoad = function () {
  //   var monthArray = [];
  //   for (var q in $scope.collection[0].month) {
  //     if (q !== 'TOTAL')
  //       monthArray.push($scope.collection[0].month[q]);
  //   }
  //   monthArray = monthArray.map( (c) => {
  //     return c.passengers;
  //   });

  //   monthArray.unshift('Arrivals');

  //   $scope.donut.load({columns: [
  //     monthArray
  //   ]});
  //   }
  // }];

  $scope.showGraph = function() {
    // $scope.$ngc.unfilterBy('island');
    $scope.oahuChart = c3.generate({
      bindto: '#oahu',
      data: {
        columns: [
        ['Total',200,160,250,100,300,400,200,160,250,100,300,400],
        ['US West',90,60,90,50,55,85,90,60,90,50,55,85],
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
        ['US West',90,60,90,50,55,85,90,60,90,50,55,85],
        ['US East',30,200,100,325,150,325,30,200,100,325,150,325],
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
        ['data1',30,200,100,325,150,325,30,200,100,325,150,325],
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
        ['data1',100,115,220,80,150,200,100,115,220,80,150,200],
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
        ['data1',20,20,15,40,15,55,20,20,15,40,15,55],
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
        ['data1',15,15,10,30,5,25,15,15,10,30,5,25],
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
        ['Total',300,600,700,325,650,825,300,600,700,325,650,825],
        ['Oahu',200,160,250,100,300,400,200,160,250,100,300,400],
        ['Maui',100,115,220,80,150,200,100,115,220,80,150,200],
        ['Big Island',90,60,90,50,55,85,90,60,90,50,55,85],
        ['Kauai',70,50,80,50,35,75,70,50,80,50,35,75],
        ['Lanai',20,20,15,40,15,55,20,20,15,40,15,55],
        ['Molokai',15,15,10,30,5,25,15,15,10,30,5,25],
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