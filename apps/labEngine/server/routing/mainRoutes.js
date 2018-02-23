var _path=require('path');
var _fs=require('fs');

var MainRoutes= function(
  _client, _router, _eBuilder, _defaultQueriesMap, _esInterpretorUtil) {

  // sort of alias
  let _eb=_eBuilder;

  let _handleLookupGET=function(_req, _resp) {
    let _q=new _eb.RequestBodySearch();
    let _matchAllQuery=new _eb.MatchAllQuery();

    _q.query(_matchAllQuery);
    _q.size(55);  // hsi only got 50 stocks, but give it a 10% buffer
    _q.sort(new _eb.Sort('k_stock_code', "asc"));

    // create msearch
    let _dsl=_q.toJSON();
    let _body=[];
    _body.push({
      "index": "hsi_lookup",
      "type": "doc"
    });
    _body.push(_dsl);

    _client.msearch({
      body: _body
    }).then(function(_data) {
      _resp.send({
        'data': _data,
        'dsl': _dsl
      });
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  return {
    /*
     *  main method to configure the routes
     */
    setup: () => {
      _router.route('/').
        get(function(_req, _resp) {
          _resp.sendFile( _path.join(
            __dirname,
            "../../public/clientView/view/redirectToApp.html") );
        });

      _router.route('/api/lookup').
        get(function(_req, _resp) {
          _handleLookupGET(_req, _resp);
        }
      );
      _router.route('/api/saveStockEvent').
        post(function(_req, _resp) {
          _handleSaveStockEventPOST(_req, _resp);
        }
      );
      // other routes
      return _router;
    }
  } // return interface back to caller
};

module.exports=MainRoutes;
