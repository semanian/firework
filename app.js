var express = require('express');

var app = express();
app.listen(3000);

app.use(express.static(__dirname + "/public"));
app.use(app.router);

app.get('/', function(req, res){
  res.end("Please access to /index.html");
  //res.sendfile(__dirname + "/index.html");
});

