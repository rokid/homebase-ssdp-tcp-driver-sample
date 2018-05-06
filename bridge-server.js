const exec = require('child_process').exec;

//mock devices
const devices = [];
for(let i = 0; i< 30; i++) {
  devices.push({
    name: 'Device' + i,
    deviceId: i.toString(),
    actions: {
      switch: ['on', 'off']
    },
    state: {
      switch: null
    },
    type: 'light'
  })
}

exports.start = function(PORT, ADDRESS, cb) {

  ADDRESS = ADDRESS || '0.0.0.0';
  // jayson is json-rpc server
  const jayson = require('jayson');

  const server = jayson.server({
    list: function(args, callback) {
      console.log(JSON.stringify(args, null, 4));
      callback(null, devices);
    },
    execute: function(args, callback) {
      const s = args.action.name;
      console.log('=== execute');
      console.log(JSON.stringify(args, null, 4));
      callback(null, {
        switch: s === 'on' ? 'off' : 'on'
      });
    }
  });

  server.tcp().listen(PORT, ADDRESS);
  console.log('server listen on port %s:%s', ADDRESS, PORT);
  cb(null, PORT);
};
