'use strict';
const PORT = process.env.PORT || 3000;
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port : PORT });

// serves index for angular
server.route({
  method : 'GET',
  path : '/',
  handler : (request, reply) => {
    reply.file('./public/views/index.html');
  }
});

server.start( () => {
  console.log('Serving running on port: ' + PORT);
});