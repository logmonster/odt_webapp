

/**
 *  provide basic page routing for the lecture app
 */
function _setup(_r, _p) {
  _r.get('/', function (_req, _resp) {
     _resp.sendFile( _p.join( __dirname, "../view/index.html") );
  });
  _r.get('/fwdToChp2', function(_req, _resp) {
    _resp.sendFile( _p.join(__dirname, "../view/chp2.html") );
  });

   return _r;
}

/**
 *  export setup method
 */
module.exports = {
  setup: function(_router, _path) {
    return _setup(_router, _path);
  }
}
