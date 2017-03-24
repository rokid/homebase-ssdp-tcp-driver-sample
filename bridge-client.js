const net = require('net');

const client = net.connect({port: 8124}, () => {
  console.log('connected to server!');
  client.write(JSON.stringify({"jsonrpc": "2.0", "method": "echo", "params": ["hello world"], "id": 0}) + '\r\n');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});
