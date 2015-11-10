'use strict';
module.exports = ['apiService', '$scope', (apiService, $scope) => {
  $scope.dataset = '';
  apiService.getAnnual()
    .success( (data) => {
      $scope.dataset = data;
     });
}];