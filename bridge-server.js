const net = require('net');

const methods = {};

methods.echo = function (message) {
  return message;
};

const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.setEncoding('utf8');

  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {
    data = JSON.parse(data);
    console.log(data);

    let method = methods[data.method];

    function onResult(result) {
      c.write(JSON.stringify({"jsonrpc": "2.0", "result": result, id: data.id}));
    }

    function sendError(error) {
      c.write(JSON.stringify({"jsonrpc": "2.0", "error": error.message, id: data.id}));
    }

    if (!method) {
      sendError(new Error('no method match'));
      return;
    }

    const params = data.params;

    let result;

    try {
      if (params instanceof Array) {
        result = method.apply(null, params)
      } else if (params) {
        result = method(params);
      } else {
        result = method();
      }
      if (method.then) {
        method.then(onResult, sendError);
      } else {
        onResult(result);
      }
    } catch (err) {
      onResult(err);
    }
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(8124, () => {
  console.log('server bound');
});


