(function () {
  'use strict';
  const PORT = process.env.PORT || Config.server.port;
  const Hapi = require('hapi');
  const Path = require('path');
  const Inert = require('inert');
  const Config = require('./config');
  const Route = require('./routes');


  const server = new Hapi.Server({
    connections : {
      routes : {
        files : {
          relativeTo : Path.join(__dirname, '../public')
        }
      }
    }
  });

  server.connection({ port : PORT });

  server.register(Inert, () => {});

  //test route that pings the API and retrieves database data
  server.route(Route.endpoints);
  server.start( (err) => {
    if (err) throw err;
    console.log('Serving running on port: ' + PORT);
  });
})();
