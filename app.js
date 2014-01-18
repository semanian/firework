var express = require('express');
var os = require('os');

var port = 5000;
var app = express();
var server = app.listen(port, function() {
  console.log("listening at " + os.hostname() + ":" + port + " ...");
});
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(app.router);

// Handle 404
app.use(function(req, res, next) {
  res.json(404, {status: "error", message: "404: Page Not Found"});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.json(500, {status: "error", message: "500: Internal Server Error"});
});


app.get('/', function(req, res){
  res.sendfile("/index.html");
});


/*
app.post('/vplus', function(req, res) {
  var username = req.body.username;
  var company = req.body.company;
  var extra = req.body.extra;
  var extra1 = req.body.extra1;
  var content = JSON.parse(req.body.content);
  console.log(username);
  console.log(company);
  console.log(extra);
  console.log(extra1);
  console.log(JSON.stringify(content, null, 4));

  res.json(200, {status: "success", message: "The request was successfully received."});
  //res.json(500, {status: "error", message: "Error occured!"});
});
*/


/*
 * TouchLike 서버에서 호출하는 API
 */
app.post('/vplus/draw', function(req, res) {
  console.log(req.body);
  //var rmsg = { title: req.query.title, details: req.query.details };
  //console.log(JSON.stringify(rmsg));
  //clients[req.query.username].emit("message", JSON.stringify(message));
  clients[req.body.username].emit("message", req.body.title, req.body.details);
  res.end();
});


app.get('/vplus/draw', function(req, res) {
  console.log(req.query);
  //var rmsg = { title: req.query.title, details: req.query.details };
  //console.log(JSON.stringify(rmsg));
  //clients[req.query.username].emit("message", JSON.stringify(message));
  clients[req.query.username].emit("message", req.query.title, req.query.details);
  res.end();
});


var clients = [];

io.sockets.on('connection', function(socket){
  socket.on('join', function(name) {
    socket.set('nickname', name);
    clients[name] = socket;
  });
});

