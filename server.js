
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {

	routeMe(req,res);

}).listen(port);

function readGoogle(request,response) {

	//var lang = require("./gen_lang.js");

}


function routeMe(request,response) {

	response.writeHead(200, { 'Content-Type': 'text/plain' });
  	response.write("This is before end\n");
  	response.end(request.url);

}
return;