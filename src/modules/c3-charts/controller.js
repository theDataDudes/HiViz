'use strict';
module.exports = ['$scope', '$timeout', 'Crossfilter', ($scope, $timeout, Crossfilter) => {
  // set 'this' to global scope variable self
  var self = this;

  // onload of page, selectedIcon has default value of "total"
  $scope.selectedIcon = 'total';

  // declare changIcon function to take in icon when clicked value
  // sets selectedIcon variable to current icon
  // $emis is used so that everything that is on scope listens to the change inconChanged
  $scope.changeIcon = function(icon) {
    $scope.selectedIcon = icon;
    $scope.$emit('iconChanged');
  };

  $scope.$on('crossfilter-updated', function (event, collection, identifier) {
    $scope.chartLoad($scope.selectedIcon);
    $scope.safeApply();
  });

  $scope.$on('iconChanged', function (event, collection, identifier) {
    $scope.chartLoad($scope.selectedIcon);
    $scope.safeApply();
  });

  $timeout(function() {
    $scope.$emit('crossfilter-updated');
  }, 800);

  // watching ngc since collection is stored on the global variable
  $scope.$watch('$ngc', function(filter) {

    $scope.changeChartType = function (chart) {
      ['oahuChart', 'bigIslandChart', 'kauaiChart',
      'mauiChart', 'lanaiChart', 'molokaiChart',
      'totalChart'].forEach( function(c) {
        $scope[c].transform(chart);
      });

    };
    // chartLoad method is declared on $scope to filter two object regions that are brought in from common controller API call
    $scope.chartLoad = function (icon) {
      if (!$scope.$ngc) return;
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
            return (c.total);
          }
          return (c[icon]);
        });
        current.monthArray.unshift(current.region);

        // The two region objects 'island' key value must match
        // Set the x-axis value so that all graphs on page equal
        // return current object with new property and assign it to columns value for each island chart
        var columns;
        var colors = {};
        if (current.island === previous.island) {

          if(current.monthArray[0] > previous.monthArray[0]) {
            columns = [previous.monthArray, current.monthArray];
            colors[previous.monthArray[0]] = '#38A988';
            colors[current.monthArray[0]] = '#225A6D';
          } else {
            columns = [current.monthArray, previous.monthArray];
            colors[previous.monthArray[0]] = '#225A6D';
            colors[current.monthArray[0]] = '#38A988';
          }
            $scope[current.island + 'Chart'].load({
              columns : columns,
              unload : $scope[current.island + 'Chart'].columns,
              colors : colors
            });
        // Conditional used if only one region is selected
        } else if (array.length < 8) {
          columns = [current.monthArray];
          colors[current.monthArray[0]] = '#38A988';
          $scope[current.island + 'Chart'].load({
              columns : columns,
              unload : $scope[current.island + 'Chart'].columns,
              colors : colors
            });
        }
        return current;
       }, {});
      };

  });

// pull island data from objects and assign it to each showGraph
// formats the data to what we want
// loop through scope.collection and reference each object (all islands)


  $scope.showGraph = function() {
    var monthTicks = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
          'SEP', 'OCT', 'NOV', 'DEC'];
    var format;
    var yAxis;
    var exp;
    var newExp;

        // ================= Oahu Chart =================== //
    $scope.oahuChart = c3.generate({
      bindto: '#oahu',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
              if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 },
    });
    // ================= Big Island Chart =================== //
    $scope.bigIslandChart = c3.generate({
      bindto: '#big',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  // var newY = Math.round(y);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 },
    });
    // ================= Kauai Chart =================== //
    $scope.kauaiChart = c3.generate({
      bindto: '#kauai',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  // var newY = Math.round(y);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 },
    });

    // ================= Maui Chart =================== //
    $scope.mauiChart = c3.generate({
      bindto: '#maui',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  // var newY = Math.round(y);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 },
    });

    // ================= Lanai Chart =================== //
    $scope.lanaiChart = c3.generate({
      bindto: '#lanai',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  // var newY = Math.round(y);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 },
    });

    // ================= Molokai Chart =================== //
    $scope.molokaiChart = c3.generate({
      bindto: '#molokai',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  // var newY = Math.round(y);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 },
    });

    // ================= Total Chart =================== //
    $scope.totalChart = c3.generate({
      bindto: '#total',
      data: { columns: [], type: 'area-spline',},
      axis : {
         y : {
              tick: {
                count: 7,
                format: function(d) {
                    if($scope.selectedIcon === 'passengers') {
                    yAxis = Math.ceil(d);
                    format = d3.format(',');
                    return format(yAxis);
                  }
                  yAxis = Math.ceil(d);
                  // var newY = Math.round(y);
                  format = d3.format('$,');
                  return format(yAxis);
                }
              },
              min: 0,
              padding: {
                bottom: 0
              }
          },
        x : { type : 'category', categories : monthTicks }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if($scope.selectedIcon === 'passengers') {
              exp = value;
              newExp = exp.toFixed(2);
              format = d3.format(',');
              return format(newExp);
            }
            exp = value;
            newExp = exp.toFixed(2);
            format = d3.format('$,');
            return format(newExp);
          }
        }
      },
      size: { width: 400, height: 150 }
    });
  };

}];

