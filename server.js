'use strict';
const PORT = process.env.PORT || 8000;
const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
var request = require('request');

const server = new Hapi.Server({
  connections : {
    routes : {
      files : {
        relativeTo : Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({ port : PORT });

server.register(Inert, () => {});

//test route that pings the API and retrieves database data
server.route({
  method : 'GET',
  path : '/annual',
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
});

//test route that pings the API and retrieves database data
server.route({
  method : 'GET',
  path : '/daily',
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
});

//test route that pings the API and retrieves database data
server.route({
  method : 'GET',
  path : '/expenditures',
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
});

// serves index for angular
server.route({
  method : 'GET',
  path : '/',
  handler : {
    file : 'views/index.html'
  }
});
server.route({
  method : 'GET',
  path : '/{param*}',
  handler : {
    directory : {
      path : '.',
      redirectToSlash : true,
      index : true
    }
  }
});

server.start( (err) => {
  if (err) throw err;
  console.log('Serving running on port: ' + PORT);
});
