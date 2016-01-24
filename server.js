var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.status(200).sendFile(__dirname + '/ketoRecipes.txt');
});

app.listen(1754);
console.log('listening on 1754');