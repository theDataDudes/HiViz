(function () {
  'use strict';
var request = require('request');

  exports.getIndex = {
    handler : {
      file : 'views/index.html'
    }
  };

  exports.getStatic = {
    handler : {
        directory : {
            path : '.',
            redirectToSlash : true,
            index : true
        }
    }
  };

  exports.getAnnual = {
  handler : function (req, rep) {
      request.get({
        url : 'http://localhost:3000/annual',
        json : true
      }, (err, response, body) => {
        if (err) {
          return rep.status(500).json(err);
        }
        rep(body);
      });
    }
  };

  exports.getExpenditures = {
  handler : function (req, rep) {
      request.get({
        url : 'http://localhost:3000/expenditures',
        json : true
      }, (err, response, body) => {
        if (err) {
          return rep.status(500).json(err);
        }
        rep(body);
      });
    }
  };

  exports.getDaily = {
  handler : function (req, rep) {
      request.get({
        url : 'http://localhost:3000/daily',
        json : true
      }, (err, response, body) => {
        if (err) {
          return rep.status(500).json(err);
        }
        rep(body);
      });
    }
  };
  exports.getAvgStay = {
  handler : function (req, rep) {
      request.get({
        url : 'http://localhost:3000/avgstay',
        json : true
      }, (err, response, body) => {
        if (err) {
          return rep.status(500).json(err);
        }
        rep(body);
      });
    }
  };
  exports.getHawaiiVisitors = {
  handler : function (req, rep) {
      request.get({
        url : 'http://localhost:3000/hawaiivisitors',
        json : true
      }, (err, response, body) => {
        if (err) {
          return rep.status(500).json(err);
        }
        rep(body);
      });
    }
  };
})();