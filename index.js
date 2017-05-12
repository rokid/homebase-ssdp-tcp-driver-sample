const bridgeServer = require('./bridge-server');
const ssdpServer = require('./ssdp-server');
const ip = require('ip');
const PORT = 9999;

// Start Bridge first
bridgeServer.start(PORT, null, (err, port) => {
  // then start the ssdp server to broad cast your servcie
  ssdpServer.start(`tcp://${ip.address()}:${port}`);
});
