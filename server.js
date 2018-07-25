var http = require("http");
var fs = require('fs');

var server = http.createServer(function(request, response) {
  console.log(request.url);
  //var fileStream = null;
  switch (request.url) {
    /*case '/': 

      response.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile('./public/index.html', "utf8", function(error, text) {
        if (error)
          console.log(error);
        console.log('/:');
        console.log(text);
        response.end(text);
      });
      break;

      case '/less.min.js':

        response.writeHead(200, {"Content-Type": "text/css"});
        fs.readFile('./public//less.min.js', "utf8", function(error, text) {
          if (error)
            console.log(error);
          console.log('/less.min.js:');
          //console.log(text);
          response.end(text);
        });
        break;

      case '/app1.js':
        response.writeHead(200, {"Content-Type": "text/javascript"});
        fs.readFile('./public/app1.js', "utf8", function(error, text) {
          if (error)
            console.log(error);
          console.log('/app1.js:');
          //console.log(text);
          response.end(text);
        });
        break;*/

        case '/template.less':
        response.writeHead(200, {"Content-Type": "text/javascript"});
        fs.readFile('./public/less/template.less', "utf8", function(error, text) {
          if (error)
            console.log(error);
          console.log('/template.less:');
          //console.log(text);
          response.end(text);
        });
        break;
  }
});
server.listen(8000, 'localhost');