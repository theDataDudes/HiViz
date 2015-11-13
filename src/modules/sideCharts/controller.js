'use strict';
module.exports = ['apiService', '$scope', (apiService, $scope) => {
  apiService.getHawaiiVisitors()
    .success( (data) => {
      $scope.visitorData = data;
    });
}];