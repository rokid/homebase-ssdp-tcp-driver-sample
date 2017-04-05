// const methods = require('./bridge-methods');
//
// exports.start = function (cb) {
//   const net = require('net');
//   const PORT = 9999;
//
//   const server = net.createServer((c) => {
//     new Connection(c);
//   });
//
//   server.on('error', (err) => {
//     throw err;
//   });
//
//   server.listen(PORT, () => {
//     console.log(`server bound to ${PORT}`);
//     cb(PORT);
//   });
// };
//
//
// class Connection {
//
//   constructor(socket) {
//     this._authed = false;
//     socket.setEncoding('utf8');
//     socket.on('end', () => {
//       console.log('client disconnected');
//     });
//     socket.on('data', (data) => {
//       this.parseMessage(data);
//     });
//     this.socket = socket;
//   }
//
//   close() {
//     this.socket.close();
//   }
//
//   sendError(error, id) {
//     this.socket.write(JSON.stringify({"jsonrpc": "2.0", "error": {
//       code: error.code || 1,
//       message: error.message
//     }, id: id}));
//   }
//
//   sendResult(result, id) {
//     this.socket.write(JSON.stringify({"jsonrpc": "2.0", "result": result, id: id}));
//   }
//
//   auth() {
//     return true
//   }
//
//   makeCall(method, params) {
//     return new Promise((resolve, reject) => {
//       let result;
//       if (params instanceof Array) {
//         result = method.apply(null, params);
//       } else {
//         result = method(params);
//       }
//       if (method.then) {
//         method.then(resolve, reject);
//       } else {
//         resolve(result);
//       }
//     });
//
//   }
//
//   onMessage(method, params, id) {
//
//     if (!this._authed) {
//       if (method !== 'connect') {
//         this.close('forbidden');
//         return;
//       }
//
//       this.makeCall(this.auth, params)
//         .then(() => {
//           this._authed = true;
//           this.sendResult({
//             status: 0
//           }, id);
//         }, () => {
//           this.sendError(new Error('forbidden'), id);
//         });
//       return;
//     }
//
//     this.makeCall(methods[method], params)
//       .then(result => {
//         this.sendResult(result, id);
//       })
//       .catch(err => {
//         this.sendError(err, id);
//       });
//   }
//
//   parseMessage(data) {
//     data = JSON.parse(data);
//     this.onMessage(data.method, data.params, data.id);
//   }
//
// }

exports.start = function(PORT, ADDRESS, cb) {
  const jayson = require('jayson');

  const server = jayson.server({
    list: function(args, callback) {
      console.log('list', args);
      callback(null, [
        {
          name: 'Device1',
          deviceId: '1',
          actions: {
            switch: ['on', 'off']
          },
          state: {
            switch: null
          },
          type: 'light'
        }
      ]);
    }
  });

  server.tcp().listen(PORT, ADDRESS);
  console.log('server listen on port %s:%s', ADDRESS, PORT);
  cb(null, PORT);
};