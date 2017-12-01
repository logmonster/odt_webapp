
var Chp03 = function(_client, _router, _eBuilder) {

  let buildCRUD = function(_req, _resp) {
    _resp.send("hm... no server side CRUD operations");
  };

  /*
   *  method to demonstrate how the term and match query are built
   */
  let buildQuery = function(_req, _resp) {
    let eb = _eBuilder;
    // term query
    let _tq = new eb.TermQuery('stock_code', 'ele_ph_45999');
    // match query
    let _mq = new eb.MatchQuery('description', 'PhOne').operator("or");

    _runQuery([ _tq, _mq ], _req, _resp);
  };

  /*
   *  actual method to return the response to the client (good for ajax calls)
   */
  let _runQuery = function(_qList, _req, _resp) {
    let _lst=[];

    if (_qList) {
      _qList.forEach(function(_item, _idx) {
        // prepare for msearch instead of logging out
        _lst.push({ "index": "jeymart_product", "type": "doc" });
        _lst.push({ "query": _item.toJSON() });
      }, null);
    }
    // run a msearch
    _client.msearch({
      body: _lst
    }).then(function(_data) {
      _resp.send(_data);

    }, function(_err) {
      _resp.send(_err);
    });
  };

  /*
   *  method to demonstrate how aggs work
   */
  let buildAggs = function(_req, _resp) {
    let eb = _eBuilder;

    // terms aggs
    let _ta = new eb.RequestBodySearch().
      query(new eb.MatchAllQuery()).
      size(0).
      aggs([
        new eb.TermsAggregation("_categories", "category.keyword")
      ]
    );
    // multi aggs
    let _ma = new eb.RequestBodySearch().
      query(new eb.MatchAllQuery()).
      size(0).
      aggs([
        new eb.MinAggregation("_cheapestPhone", "price"),
        new eb.MaxAggregation("_luxuriousPhone", "price"),
        new eb.StatsAggregation("_basicStats", "price")
      ]
    );

    // run the aggs
    let _lst=[];

    _lst.push({ "index": "jeymart_product", "type": "doc" });
    _lst.push(_ta.toJSON());
    _lst.push({ "index": "jeymart_product", "type": "doc" });
    _lst.push(_ma.toJSON());

    _client.msearch({
      body: _lst
    }).then(function(_data) {
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    });
  };


  return {
    // setup routes related to chp02
    setup: () => {
      _router.route('/lectureQuery').
        get(function(_req, _resp) {
          buildQuery(_req, _resp);
        }
      );
      _router.route('/lectureCRUD').
        get(function(_req, _resp) {
          buildCRUD(_req, _resp);
        }
      );
      _router.route('/lectureAggs').
        get(function(_req, _resp) {
          buildAggs(_req, _resp);
        }
      );

      return _router;
    }
  };  // return minimal functions of Chp03 object
};

module.exports=Chp03;
