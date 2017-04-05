exports.start = function(location) {

  const Server = require('./lib/server');

  const server = new Server({
    udn: 'uuid:f40c2981-7329-40b7-8b04-27f187aecfb8',
    location: location,
    headers: {
      DEVICE_TYPE: 'bridge'
    }
  });

  server.addUSN('homebase:device');
  server.start();

  process.on('exit', function(){
    server.stop();
  });


  setTimeout(function(){
    setTimeout(function(){}, 1000);
  }, 60000);
};