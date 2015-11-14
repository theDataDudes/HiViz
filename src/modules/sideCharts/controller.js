'use strict';
module.exports = ['apiService', '$scope', (apiService, $scope) => {
  $scope.clicked = {};

  $scope.showClick = function (data) {
    $scope.clicked = data;
    console.log(data);
  };

  // apiService.getHawaiiVisitors()
  //   .success( (data) => {
  //     $scope.visitorData = data;
  //   });
}];