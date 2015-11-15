'use strict';

module.exports = ['$scope', 'apiService', 'Crossfilter', controller];
function controller($scope, apiService, Crossfilter) {

  //side-bar visibility function
  this.IsVisible = false;
  this.filteredData = '';

  this.showHide = function () {
    this.IsVisible = this.IsVisible ? false : true;
  }

  //return data from API
  apiService.getHawaiiVisitors()
    .success( (data) => {
      var filter = new Crossfilter(data);
      $scope.$ngc = filter;
      filter.filterBy('region', 'total');
      filter.filterBy('island', 'total');
    });

  //updates the filters applied across all of the charts/graphs
  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.collection = collection;
    // $scope.$digest();

    // console.log(collection);
  });

  //injects math functions for use in html
  $scope.Math = window.Math;

  //adding slider scope to include callbacks
  $scope.slider_callbacks = {
    value : 2014,
    options : {
      floor : 2007,
      onEnd : function () {
        //filter by user-selected year
        $scope.selectedYear = $scope.slider_callbacks.value;
      }
    }
  }
}

