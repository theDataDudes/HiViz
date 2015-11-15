'use strict';
module.exports = ['$scope',($scope) => {
  $scope.oahuChart = null;

  $scope.showGraph = function() {
    $scope.oahuChart = c3.generate({
      bindto: '#oahu',
      data: {
        columns: [
        ['data1',200,160,250,100,300,400,200,160,250,100,300,400],
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
        ['data1',90,60,90,50,55,85,90,60,90,50,55,85],
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