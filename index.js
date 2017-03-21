var express = require('express');
var fs = require("fs");
var app = express();
var async = require('async');

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder
app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'))
})
