var fs = require('fs');
var http = require('http');
var app = module.exports = require('appjs');

var httpServer = http.createServer(function(req, res) {
  console.log('request', req.url);
  if (req.url == '/') {
    return fs.readFile(__dirname + '/content/index.html', 'utf8', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  }

  if (req.url == '/test') {
    return fs.readFile(__dirname + '/content/test.json', 'utf8', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/json'
      });
      res.end(data);
    });
  }

  return console.log(req);
});
httpServer.listen(8887, function(err) {
  if (err) {
    return console.error('listen error:', err);
  }

  var window = app.createWindow({
    width: 640,
    height: 460,
    url: 'http://localhost:8887/'
  });

  window.on('create', function() {
    console.log("Window Created");
    window.frame.show();
    window.frame.center();
    window.frame.openDevTools();
  });

  window.on('ready', function() {
    console.log("Window Ready");
  });

  window.on('close', function() {
    httpServer.close();
    console.log("Window Closed");
  });
});
