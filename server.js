'use strict';
const PORT = process.env.PORT || 3000;
const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
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

server.register(Inert, function () {

  // serves index for angular
  server.route({
    method : 'GET',
    path : '/{path*}',
    handler : {
      file : 'views/index.html'
    }
  })

  server.start( () => {
    console.log('Serving running on port: ' + PORT);
  });
});