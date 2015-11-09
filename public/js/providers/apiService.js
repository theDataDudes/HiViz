(function () {
  'use strict';
  angular.module('hivisApp').service('apiService', apiService);

  function apiService ($http) {
    this.getAnnual = () => {
      return $http.get('http://localhost:3000/annual');
    };

    this.getDaily = () => {
      return $http.get('http://localhost:3000/daily');
    };

    this.getExpenditures = () => {
      return $http.get('http://localhost:3000/expenditures');
    };
  }

})();