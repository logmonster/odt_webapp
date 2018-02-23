var _express = require('express');
var _app = _express();
var _favIcon = require('serve-favicon');

var _es = require('elasticsearch');
var _client = null;
var _eBuilder = require('elastic-builder');

// parser(s) setup
var _bodyParser = require('body-parser');

// router setup
var _fs = require('fs');
var _path = require('path');
var _mainRoutes = require('./routing/mainRoutes');

_app.use(_express.static('public'));

// parse application/x-www-form-urlencoded
// extended false => not extra translation to json (true = translate)
_app.use(_bodyParser.urlencoded({ extended: true }))
// parse application/json
_app.use(_bodyParser.json())

// load es config and create the client object
let _cfg = JSON.parse(
  _fs.readFileSync(_path.join(
    __dirname,
    "config/es_config.json")).toString());

_client = new _es.Client(_cfg);

_mainRoutes = _mainRoutes(_client, _express.Router(), _eBuilder, null, null);
_app.use('/', _mainRoutes.setup());

// set _favIcon
_app.use(_favIcon(_path.join(__dirname, '../public/image/favicon.ico')));

/*
 *  start the express app at port 8889
 */
var _server = _app.listen(11001, function () {
   var _host = _server.address().address
   var _port = _server.address().port

   console.log("lab engine for odt javascript course listening at http://%s:%s", _host, _port)
})
