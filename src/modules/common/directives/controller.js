'use strict';
module.exports = ['apiService', '$scope', service];

function service (apiService, $scope) {
  // $scope.annual = [2, 3, 5];
  apiService.getHawaiiVisitors()
    .success( (data) => {
      $scope.annual = data.filter(function (current) {
        return current.year == '2007' &&
               current.region == 'canada';
      });
  });
};
