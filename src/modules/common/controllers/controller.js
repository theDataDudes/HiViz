'use strict';

module.exports = ['$scope', 'apiService', 'Crossfilter',controller];
function controller($scope, apiService, Crossfilter) {

  this.IsVisible = false;
  this.filteredData = '';

  this.showHide = function () {
    this.IsVisible = this.IsVisible ? false : true;
  }

  apiService.getHawaiiVisitors()
    .success( (data) => {
      var filter = new Crossfilter(data);
      $scope.$ngc = filter;
      filter.filterBy('year', '2007');
      filter.filterBy('region', 'total');
      filter.filterBy('island', 'total');
    });

  $scope.$on('crossfilter/updated', function (event, collection, identifier) {
    $scope.collection = collection;
    console.log(collection);
  });
}

