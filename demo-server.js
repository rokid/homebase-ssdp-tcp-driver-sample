let bridgeServer = require('./bridge-server');
let ssdpServer = require('./ssdp-server');
const ip = require('ip');

const PORT = 9999;

bridgeServer.start(PORT, ip.address(), (err, port) => {
  ssdpServer.start('tcp://127.0.0.1:' + port);
  setTimeout(() => {}, 100000);
});
