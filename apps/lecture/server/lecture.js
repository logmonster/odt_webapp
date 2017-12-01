var _express = require('express');
var _app = _express();

var _es = require('elasticsearch');
var _client = null;
// es query builder (not query runner)
var _eBuilder = require('elastic-builder');

// router setup
var _fs = require('fs');
var _path = require('path');
var _pageFwd = require('./routing/pageForward');
var _chp02 = require('./routing/chp02logics');
var _chp03 = require('./routing/chp03lecture');

_app.use(_express.static('public'));

// load es config and create the client object
let _cfg = JSON.parse(
  _fs.readFileSync(_path.join(
    __dirname,
    "../public/clientView/samples/es_config.json")).toString());

_client = new _es.Client(_cfg);

_app.use('/', _pageFwd.setup(_express.Router(), _path));
_chp02 = _chp02(_client, _express.Router(), _eBuilder);
_app.use('/chp02', _chp02.setup());
_chp03 = _chp03(_client, _express.Router(), _eBuilder);
_app.use('/chp03', _chp03.setup());

/*
 *  start the express app at port 8888
 */
var _server = _app.listen(8888, function () {
   var _host = _server.address().address
   var _port = _server.address().port

   console.log("lecture app listening at http://%s:%s", _host, _port)
})
