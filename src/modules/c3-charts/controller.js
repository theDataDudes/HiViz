'use strict';
module.exports = ['$scope', 'Crossfilter', ($scope, Crossfilter) => {
  // set 'this' to global scope variable self
  var self = this;

  // onload of page, selectedIcon has default value of "total"
  this.selectedIcon = 'total';

  // declare changIcon function to take in icon when clicked value
  // sets selectedIcon variable to current icon
  // $emis is used so that everything that is on scope listens to the change inconChanged
  $scope.changeIcon = function(icon) {
    self.selectedIcon = icon;
    $scope.$emit('iconChanged');
  };


  // watching ngc since collection is stored on the global variable
  $scope.$watch('$ngc', function(filter) {
    // var oahuFilter = new Crossfilter(filter.collection());
    // $scope.oahuFilter = oahuFilter;
    // oahuFilter.filterBy('region', 'oahu');
    $scope.changeChartType = function (chart) {
      ['oahuChart', 'bigIslandChart', 'kauaiChart',
      'mauiChart', 'lanaiChart', 'molokaiChart',
      'totalChart'].forEach( function(c) {
        $scope[c].transform(chart);
      });

    }
    // chartLoad method is declared on $scope to filter two object regions that are brought in from common controller API call
    $scope.chartLoad = function (icon) {

      // reduce is used to create two seperate arrays with values to be set in each islands graph column values.
      $scope.collection.reduce( function(previous, current, index, array) {
        current.monthArray = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (var q in current.month) {
            if (q !== 'TOTAL') {
              switch (q) {
                case 'JAN': current.monthArray.splice(0, 1, current.month[q]); break;
                case 'FEB': current.monthArray.splice(1, 1, current.month[q]); break;
                case 'MAR': current.monthArray.splice(2, 1, current.month[q]); break;
                case 'APR': current.monthArray.splice(3, 1, current.month[q]); break;
                case 'MAY': current.monthArray.splice(4, 1, current.month[q]); break;
                case 'JUN': current.monthArray.splice(5, 1, current.month[q]); break;
                case 'JUL': current.monthArray.splice(6, 1, current.month[q]); break;
                case 'AUG': current.monthArray.splice(7, 1, current.month[q]); break;
                case 'SEP': current.monthArray.splice(8, 1, current.month[q]); break;
                case 'OCT': current.monthArray.splice(9, 1, current.month[q]); break;
                case 'NOV': current.monthArray.splice(10, 1, current.month[q]); break;
                case 'DEC': current.monthArray.splice(11, 1, current.month[q]); break;
              }
            }
          }
        current.monthArray = current.monthArray.map( (c) => {
          if(c[icon] === undefined) {
            return (c.total * .001);
          }
          return (c[icon] * .001);
        });
        current.monthArray.unshift(current.region);

        // The two region objects 'island' key value must match
        // Set the x-axis value so that all graphs on page equal
        // return current object with new property and assign it to columns value for each island chart
        if (current.island === previous.island) {
          var columns;
          var colors = {};

          if(current.monthArray[0] > previous.monthArray[0]) {
            columns = [previous.monthArray, current.monthArray];
            colors[previous.monthArray[0]] = '#38A988';
            colors[current.monthArray[0]] = '#225A6D';
          } else {
            columns = [current.monthArray, previous.monthArray];
            colors[previous.monthArray[0]] = '#225A6D';
            colors[current.monthArray[0]] = '#38A988';
          }
          $scope[current.island + 'Chart'].load({columns: columns,
            unload : $scope[current.island + 'Chart'].columns,
            colors : colors
        });
        } else if (array.length < 8) {
          var colors = {};

           colors[current.monthArray[0]] = '#38A988';
            $scope[current.island + 'Chart'].load({columns: [current.monthArray],
              unload : $scope[current.island + 'Chart'].columns,
              colors : colors
            });
        }

        return current;
       }, {});
      };
  });

  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.chartLoad(self.selectedIcon);
    $scope.safeApply();
  });

  $scope.$on('iconChanged', function (event, collection, identifier) {
    $scope.chartLoad(self.selectedIcon);
    $scope.safeApply();
  });

// pull island data from objects and assign it to each showGraph
// formats the data to what we want
// loop through scope.collection and reference each object (all islands)

  $scope.showGraph = function() {
    var monthTicks = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
          'SEP', 'OCT', 'NOV', 'DEC'];
    // $scope.$ngc.unfilterBy('island');
    $scope.oahuChart = c3.generate({
      bindto: '#oahu',
      data: { columns: [], type: 'area',},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 400, height: 150 },
    });
    $scope.bigIslandChart = c3.generate({
      bindto: '#big',
      data: { columns: [], type: 'area',},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 400, height: 150 },
    });
    $scope.kauaiChart = c3.generate({
      bindto: '#kauai',
      data: { columns: [], type: 'area',},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 400, height: 150 },
    });
    $scope.mauiChart = c3.generate({
      bindto: '#maui',
      data: { columns: [], type: 'area',},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 400, height: 150 },
    });
    $scope.lanaiChart = c3.generate({
      bindto: '#lanai',
      data: { columns: [], type: 'area',},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 400, height: 150 },
    });
    $scope.molokaiChart = c3.generate({
      bindto: '#molokai',
      data: { columns: [], type: 'area',},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 400, height: 150 },
    });
    $scope.totalChart = c3.generate({
      bindto: '#total',
      data: { columns: [], type: 'area'},
     axis : {
        x : { type : 'category', categories : monthTicks }
      },
      size: { width: 800, height: 150 }
    });
  };
}];