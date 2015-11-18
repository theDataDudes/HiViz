'use strict';

module.exports = ['$scope', 'apiService', 'Crossfilter', controller];
function controller($scope, apiService, Crossfilter) {

  //side-bar visibility function
  this.IsVisible = true;
  this.filteredData = '';

  this.showHide = function () {
    this.IsVisible = this.IsVisible ? false : true;
  };

  ///checks to see if digest has been called
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && (typeof (fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  //collection init
  $scope.collection = '';

  //API call to gather data for application use
  apiService.getHawaiiVisitors()
    .success( (data) => {
      var filter = new Crossfilter(data);
      $scope.$ngc = filter;
      filter.filterBy('year', '2014');
      filter.filterBy('region', 'total');
      filter.filterBy('island', 'total');
    });

  //updates the filters applied across all of the charts/graphs
  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.collection = collection;
    $scope.safeApply();
  });

  //injects math functions for use in html
  $scope.Math = window.Math;
  $scope.console = window.console;

  //adding slider scope to include callbacks
  $scope.slider_callbacks = {
    value : 2014,
    options : {
      floor : 2007,
      showTicks : true,
      onEnd : function () {

        //filter by user-selected year
        $scope.selectedYear = $scope.slider_callbacks.value;
        $scope.$ngc.filterBy('year', $scope.selectedYear);
      }
    }
  };

}