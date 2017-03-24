var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'))
})
