'use strict';

module.exports = ['$http', function apiService ($http) {
  this.getAnnual = () => {
    return $http.get('http://localhost:8000/annual');
  };

  this.getDaily = () => {
    return $http.get('http://localhost:8000/daily');
  };

  this.getExpenditures = () => {
    return $http.get('http://localhost:8000/expenditures');
  };
}];