(function () {
  'use strict';
  const Controller = require('./controller');


  //defining routes
  exports.endpoints = [
    { method : 'GET', path : '/annual', config : Controller.getAnnual },
    { method : 'GET', path : '/expenditures', config : Controller.getExpenditures },
    { method : 'GET', path : '/daily', config : Controller.getDaily },
    // serves index for angular
    { method : 'GET', path : '/', config : Controller.getIndex },

    { method : 'GET', path : '/{param*}', config : Controller.getStatic }
  ];

})();