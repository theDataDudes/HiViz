'use strict';
module.exports = ['apiService', service];

function service (apiService) {
  apiService.getAnnual()
    .success( (data) => {
     this.dataset = data;
  });
};

