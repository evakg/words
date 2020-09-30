// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var routes = require('./routes');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/data", routes.json, routes.index);

app.get("/*", function (request, response) {
  // response.sendFile(__dirname + '/views/centered-list.html');
  console.log(request.url);
  response.sendFile(__dirname + '/views'+request.url, {}, function(err){
    console.log(err);
    response.end(JSON.stringify({error:"page not found"}));
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
