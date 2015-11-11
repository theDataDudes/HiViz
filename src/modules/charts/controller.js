'use strict';
module.exports = ['apiService', '$scope', (apiService, $scope) => {
  apiService.getAnnual()
    .success( (data) => {
      $scope.dataset = data;
    });
}];