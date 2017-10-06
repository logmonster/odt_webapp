var _express = require('express');
var _app = _express();

var _es = require('elasticsearch');
var _client = new _es.Client({
  host: 'localhost:9200',
  log: 'debug'
});
// es query builder (not query runner)
var _eBuilder = require('elastic-builder');

// router setup
var _path = require('path');
var _pageFwd = require('./routing/pageForward');
var _chp02 = require('./routing/chp02logics');

_app.use(_express.static('public'));

_app.use('/', _pageFwd.setup(_express.Router(), _path));
_chp02 = _chp02(_client, _express.Router(), _eBuilder);
_app.use('/chp02', _chp02.setup());


/*
 *  start the express app at port 8888
 */
var _server = _app.listen(8888, function () {
   var _host = _server.address().address
   var _port = _server.address().port

   console.log("lecture app listening at http://%s:%s", _host, _port)
})
