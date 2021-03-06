// ** load dependencies
var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
// if given { dest: 'upload/' } file contents would be saved directly to the upload folder...
var multer = require('multer')({ dest: 'upload/tmp' });
var routerApp = require('./core/router/RouterApp');
var favicon = require('serve-favicon');

// ** setup router and routes
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hjs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
routerApp.setRoutes(router, app, multer);


// ** set the public resource folder
// ** test by issuing http://localhost:10010/image/es.png
app.use(express.static('public'));

// ** set favicon
app.use(favicon(__dirname+'/favicon.ico'));

// ** startup of server listening to 10010 port (modify when necessary)
var server = app.listen(10010, function() {
  var _host=server.address().address;
  var _port=server.address().port;

  console.log('*** server running at '+_host+':'+_port);
});
