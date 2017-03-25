// @flow

const Client = require('./lib/client');
const client = new Client();
const debug = require('debug')('client');

const devices = [];

client.on('response', function (headers, statusCode, rinfo) {
  if (headers.ST !== 'homebase:bridge') return;
  let device = getDevice(headers.USN);
  if (!device) {
    addDevice(headers);
  }
});

function getDevice(USN) {
  return devices.find(device => device.usn === USN);
}

function addDevice(headers) {

  const device = {
    usn: headers.USN,
    online: true,
    headers: headers,
    lastUpdate: Date.now()
  };
  console.log('device added');
  console.log(JSON.stringify(device, null, 4));
  devices.push(device);
}

client.on('advertise-alive', function (headers) {
  // console.log('alive', headers.NT);
  if (headers.NT !== 'homebase:bridge') return;
  let device = getDevice(headers.USN);

  if (device) {
    if (device.offline) {
      console.log('device online again', device.usn);
    }
    Object.assign(device, {
      headers: headers,
      lastUpdate: Date.now(),
      offline: false
    });
    console.log('device update', device.usn);
  } else {
    addDevice(headers);
  }

});

client.on('advertise-bye', function (headers) {
  if (headers.NT !== 'homebase:bridge') return;
  let device = getDevice(headers.USN);

  if (device) {
    console.log('device offline', device.usn);
    Object.assign(device, {
      headers: headers,
      lastUpdate: Date.now(),
      offline: true
    });
  }
});


// // search for a service type
// client.search('urn:schemas-upnp-org:service:ContentDirectory:1');
//
// // Or get a list of all services on the network
//
// client.search('ssdp:all');
//

client.search('homebase:bridge');


// // And after 10 seconds, you want to stop
// setTimeout(function () {
//   client.stop()
// }, 10000);


setTimeout(()=>{}, 1000000);


