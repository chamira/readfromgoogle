
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("This is before end\n");
  res.end('Hello World\n');
  res.write("After end");
}).listen(port);
return;