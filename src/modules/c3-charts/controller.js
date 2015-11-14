'use strict';
module.exports = [
  'apiService',
  '$scope',
  (apiService, $scope) => {
    apiService.getAnnual()
      .success( (data) => {
        $scope.dataset = data;
        data.forEach( function(d) {

        });
      });
  }
];