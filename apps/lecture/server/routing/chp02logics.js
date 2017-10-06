
/**
 *  sort of an object encapsulating the "features" of chp02
 */
var Chp02Logics = function(_client, _router, _eBuilder) {
  // non public methods, states
  let searchWithNoBuilderExample = (_req, _resp) => {
    // run a query with no builder
    _client.search({
      index: 'javascript_client_data',
      type: 'config',
      body: {
        "query": {
          "match_all": {}
        }
      }
    }).then(function(_res) {
      _resp.send(_res);
    }, function(_err) {
      _resp.send({
        err: _err
      });
    }); // end -- search
  };

  let searchWithBuilderExample = (_req, _resp) => {
    // run a query with builder
    /*  create a query like this ...
     *  {
     *    "query": {
     *      "match": {
     *        "key": "requestTimeout"
     *      }
     *    }
     *  }
     */
    let _q = new _eBuilder.RequestBodySearch().
      query(new _eBuilder.MatchQuery('key', 'requestTimeout')).
      toJSON();

    // use the query created by the builder
    _client.search({
      index: 'javascript_client_data',
      type: 'config',
      body: _q
    }).then(function(_res) {
      _resp.send(_res);
    }, function(_err) {
      _resp.send({
        err: _err
      });
    }); // end -- search
  };

  return {
    // setup routes related to chp02
    setup: () => {
      _router.route('/searchChp2NoBuilder').
        get(function(_req, _resp) {
          // functions / handlers are hidden away from the caller
          searchWithNoBuilderExample(_req, _resp);
        }
      );
      _router.get('/searchChp2Builder', function(_req, _resp) {
        searchWithBuilderExample(_req, _resp);
      });
      // end -- route('/searchChp2NoBuilder')
      return _router;
    }

  };
};


module.exports=Chp02Logics;
