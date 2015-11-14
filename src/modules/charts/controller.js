'use strict';
module.exports = ['apiService', '$scope', service];

function service (apiService, $scope) {
  apiService.getAnnual()
    .success( (data) => {
      this.annual = data;
  });
};



