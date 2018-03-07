var _path=require('path');
var _fs=require('fs');

var MainRoutes= function(
  _client, _router, _eBuilder, _defaultQueriesMap, _esInterpretorUtil) {

  // sort of alias
  let _eb=_eBuilder;

  let _handleQuery=function(_req, _resp) {
    let _q = _req.body['query'];
    let _metaEndIdx = (_q)?_q.indexOf('\n'):-1;
    let _query = (_metaEndIdx>-1)?JSON.parse(_q.substring(_metaEndIdx)):'';
    let _meta = (_metaEndIdx>-1)?_q.substring(0, _metaEndIdx):'';
    let _metaObj = {};
    let _return = undefined;

    if (_meta != '' && _query != '') {
      let _index = undefined;
      let _docType = undefined;

      // parse the meta
      let _mparts = _meta.split(' ');
      if (_mparts.length > 1) {
        _mparts = _mparts[1].split('/');
        if (_mparts.length == 2) {
          _index = _mparts[0];

        } else if (_mparts.length==3) {
          _index = _mparts[0];
          _docType = _mparts[1];
        }
      } // end -- if (valid meta with ' ')

      if (_index) {
        _metaObj['index'] = _index;
        _metaObj['body'] = _query;

        if (_docType) {
          _metaObj['type'] = _docType;
        }
      } // end -- if (have valid index MAY or MAY-NOT have docType)

      _client.search(_metaObj).then(function(_data) {
        _resp.send({
          'failure': false,
          'data': _data
        });
      }, function(_err) {
        _resp.send({
          'failure': true,
          'msg': _err.toString(),
          'err': _err
        });
      });

    } else {
      _return = {
        'failure': true,
        'msg': ('the query posted is invalid => '+_q)
      };
      _resp.send(_return);
    }

  };

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

      _router.route('/api/query').
        post(function(_req, _resp) {
          _handleQuery(_req, _resp);
        }
      );
      // other routes
      return _router;
    }
  } // return interface back to caller
};

module.exports=MainRoutes;
