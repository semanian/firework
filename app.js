var express = require('express');
var os = require('os');

var port = 3000;
var app = express();
app.listen(port, function() {
  console.log("listening at " + os.hostname() + ":" + port + " ...");
});

app.use(express.static(__dirname + "/public"));
app.use(app.router);

app.get('/', function(req, res){
  res.end("Please access to /index.html");
  //res.sendfile(__dirname + "/index.html");
});

