'use strict';

module.exports = ['$http', function apiService ($http) {
  this.getAnnual = () => {
    return $http.get('/annual');
  };

  this.getDaily = () => {
    return $http.get('/daily');
  };

  this.getExpenditures = () => {
    return $http.get('/expenditures');
  };

  this.getAvgStay = () => {
    return $http.get('/avgstay');
  };

  this.getHawaiiVisitors = () => {
    return $http.get('/hawaiivisitors');
  };
}];