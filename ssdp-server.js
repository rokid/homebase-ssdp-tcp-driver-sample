// @flow
const Server = require('./lib/server');

const server = new Server({
  udn: 'uuid:f40c2981-7329-40b7-8b04-27f187aecfb8',
  // location: 'jsonrpc_on_tcp',
  headers: {
    hello: 1234
  }
});

server.addUSN('upnp:rootdevice');
server.addUSN('homebase:bridge');

server.start();

process.on('exit', function(){
  server.stop();
});


setTimeout(function(){
  server.stop();
  setTimeout(function(){}, 1000);
}, 60000);