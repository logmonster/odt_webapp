
var _path=require('path');

var MainRoutes = function(_client, _router, _eBuilder, _defaultQueriesMap, _esInterpretorUtil) {

  /*
   *  method to demonstrate how the term and match query are built
   *
  let buildQuery = function(_req, _resp) {
    let eb = _eBuilder;
    // term query
    let _tq = new eb.TermQuery('stock_code', 'ele_ph_45999');
    // match query
    let _mq = new eb.MatchQuery('description', 'PhOne').operator("or");

    _runQuery([ _tq, _mq ], _req, _resp);
  };

   *
   *  actual method to return the response to the client (good for ajax calls)
   *
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
  */

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

  /**
   *  method to get back all init related queries
   */
  let shopInitGet_queries = function(_req, _resp) {
    let _eb = _eBuilder;
    // get all the init query(s) for shopInitGet event
    //let _getAllAvailableCategories = _eb.requestBodySearch();
    let _lst = _esInterpretorUtil.buildQueryByQueryId(
      'shopInitGet',
      'getAllAvailableCategories',
      null
    );

    _client.msearch({
      body: _lst
    }).then(function(_data) {
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /**
   *  method to return the auto-completion suggestions
   *  based on the given prefix
   */
  let getSearchbarTextAutoCompletions = function(_req, _resp) {
    let _eb = _eBuilder;
    // get all the init query(s) for shopInitGet event
    let _lst = _esInterpretorUtil.buildQueryByQueryId(
      'searchbarTextAutoCompletionSuggestionsGet',
      'getSearchbarTextAutoCompletions',
      {
        'prefix': _req.query['prefix']
      }
    );

    _client.msearch({
      body: _lst
    }).then(function(_data) {
      /*
       *  need to filter out non related "categories" suggestion ...
       *  unless you are using context-bounded auto-completion (e.g. categories: HOME, FASHION)
       */
      let _chosenCat = _req.query['searchbarCategory'];
      if (_chosenCat!="all") {
        // TODO: assume only 1 msearch for suggestions
        let _parentArr = _data.responses[0]['suggest']['_suggestions'];

        _parentArr.forEach(function(_parentItem, _idx_1) {
          let _childArr = _parentItem['options'];
          let _arrSize = _childArr.length;
          let _idx_2 = 0;

          for (_idx_2=(_arrSize-1); _idx_2>=0; _idx_2--) {
            let _childItem = _childArr[_idx_2];
            let _categoryArr = _childItem['_source']['k_category'];
            let _catMatched = false;
            let _idx_3=0;

            for (_idx_3=0; _idx_3<_categoryArr.length; _idx_3++) {
              if (_chosenCat == _categoryArr[_idx_3].toLowerCase()) {
                _catMatched = true;
                break;
              }
            }
            if (!_catMatched) {
              _childArr.splice(_idx_2, 1);
            }
          } // end -- for (childItem loop in reverse)
        });
      } // end -- if (category is not "all")
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /**
   *  method to return the facets based on the request parameters
   *  { categories, brands, ratings }
   */
  let shopFacetsGet_queries = function(_req, _resp) {
    let _eb = _eBuilder;
    let _lst = [];

    // if "categories" are required
    if ('true' == _req.query['categories']) {
      _lst = _lst.concat(
        _esInterpretorUtil.buildQueryByQueryId(
          'shopFacetsGet',
          'getFacetsCategories',
          null
        )
      );
    }
    // if "brands" are required
    if ('true' == _req.query['brands']) {
      _lst = _lst.concat(
        _esInterpretorUtil.buildQueryByQueryId(
          'shopFacetsGet',
          'getFacetsBrands',
          null
        )
      );
    }
    // if "ratings" are required
    if ('true' == _req.query['ratings']) {
      _lst = _lst.concat(
        _esInterpretorUtil.buildQueryByQueryId(
          'shopFacetsGet',
          'getFacetsRatings',
          null
        )
      );
    }

    _client.msearch({
      body: _lst
    }).then(function(_data) {
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /**
   *  method to return the landing page information
   *  (top 5 categories, top 5 hits)
   */
  let getTop5CategoryTop6HitsForLandingInfo = function(_req, _resp) {
    let _eb = _eBuilder;
    let _lst = _esInterpretorUtil.buildQueryByQueryId(
      'shopLandingInfoGet',
      'getTop5CategoryTop6HitsForLandingInfo',
      null
    );
    _client.msearch({
      body: _lst
    }).then(function(_data) {
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /**
   *  method to return the listing data based on the given params (e.g. category, brand)
   */
  let getListingDataByRouteParams = function(_req, _resp) {
    let _eb = _eBuilder;
    let _qSection = _esInterpretorUtil.extractJsonByQueryNameAndId(
      'shopListingByParamsGet', 'getListingDataByRouteParams');
    let _meta = _qSection['meta'];
    let _critMap = {};
    let _body=[];

    // build the criteria map (this query only needs a MUST, SHOULD)
    _critMap['must']=[];
    _critMap['should']=[];

    // category
    let _lst=_req.query['categoryList'];
    if (_lst && _lst.length>0) {
      _critMap=_buildListingDataByRouteParamsCriteria(
        _critMap, _lst, 'MatchQuery', 'k_category');
    }
    // brand
    _lst=_req.query['brandList'];
    if (_lst && _lst.length>0) {
      _critMap=_buildListingDataByRouteParamsCriteria(
        _critMap, _lst, 'MatchQuery', 's_brand_name');
    }
    // t_description
    let _productDesc=[];
    let _pDesc=_req.query['searchbarText'];
    /*
     *  since Vue.js would ignore empty string values '' or "";
     *  therefore a delimiter such as "__empty__" or "all" is used
     */
    if ('__empty__'!=_pDesc) {
      _productDesc.push(_pDesc);
    }
    if (_productDesc && _productDesc.length>0) {
      _critMap=_buildListingDataByRouteParamsCriteria(
        _critMap, _productDesc, 'MatchQuery', 't_description');
    }
    //console.log(_critMap);
    // pagination
    _critMap['pagination']=_req.query['pagination'];

    _queryObj = _esInterpretorUtil.buildQueryByType(_qSection, _critMap);

    // build the meta and query for msearch
    _body.push(_meta);
    _body.push(_queryObj.toJSON());

    // add also another msearch query based on the facets
    // reuse the _queryObj above (create another one); then add back the "aggs" part
    let _queryFacets=_buildFacetsAggrAsideListingDataByRouteParams(_qSection, _critMap);
    _body.push(_meta);
    _body.push(_queryFacets['category'].toJSON());

    _body.push(_meta);
    _body.push(_queryFacets['brand'].toJSON());

    _client.msearch({
      body: _body
    }).then(function(_data) {
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  let _buildFacetsAggrAsideListingDataByRouteParams = function(_qSection, _critMap) {
    let _eb = _eBuilder;
    let _qFacetsCategory=_esInterpretorUtil.buildQueryByType(_qSection, _critMap);
    let _qFacetsBrand=_esInterpretorUtil.buildQueryByType(_qSection, _critMap);

    // category
    let _catAggr = new _eb.TermsAggregation('_cats', 'k_category');
    _catAggr.size(20);
    _catAggr.order('_count', "desc");
    // add to query object
    _qFacetsCategory.agg(_catAggr);

    // brand
    let _brandAggr = new _eb.TermsAggregation('_brands', 's_brand_name.keyword');
    _brandAggr.size(20);
    _brandAggr.order('_count', "desc");

    // add to query object
    _qFacetsBrand.agg(_brandAggr);

    return {
      'category': _qFacetsCategory,
      'brand': _qFacetsBrand
    };
  };

  /**
   *  handy method to build a criteria object for "query" operations
   */
  let _buildListingDataByRouteParamsCriteria = function(
    _critMap, _lst, _queryMethod, _field) {

    if (_lst.length==1) {
      // only 1, MUST
      _critMap['must'].push({ 'query': _queryMethod, "field": _field, "value": _lst[0] });
    } else if (_lst.length>0) {
      // more than 1, SHOULD
      _lst.forEach(function(_crit, _idx_1) {
        _critMap['should'].push({ 'query': _queryMethod, "field": _field, "value": _lst[_idx_1] });
      });
    }
    return _critMap;
  };

  /**
   *  return the suggestions by MoreLikeThisQuery and SignificantTermsAggregation
   *  for the shop item details page
   */
  let getShopItemDetailsSuggestions = function(_req, _resp) {
    let _eb = _eBuilder;
    let _qSection_mlt = _esInterpretorUtil.extractJsonByQueryNameAndId(
      'shopItemDetailsSuggestionsGet', 'getShopItemDetailsSuggestionsByMoreLikeThisQuery');
    let _qSection_st = _esInterpretorUtil.extractJsonByQueryNameAndId(
      'shopItemDetailsSuggestionsGet', 'getShopItemDetailsSuggestionsBySignificantTerms');
    //let _meta = _qSection['meta'];
    //let _critMap = {};
    let _body=[];

    let _qObj=_createQueryForShopItemDetailsSuggestionsMLT(_qSection_mlt, _req.query['item']);
    _body.push(_qObj['meta']);
    _body.push(_qObj['query'].toJSON());

    _qObj=_createQueryForShopItemDetailsSuggestionsST(_qSection_st, _req.query['item']);
    _body.push(_qObj['meta']);
    _body.push(_qObj['query'].toJSON());

    _client.msearch({
      body: _body
    }).then(function(_data) {
      _resp.send(_data);
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  let _createQueryForShopItemDetailsSuggestionsMLT = function(_qSection, _payLoad) {
    let _obj={};
    let _critMap={};

    // build the criteria map
    _critMap['like']={
      '_index': _payLoad['_index'],
      '_type': _payLoad['_type'],
      '_id': _payLoad['_id']
    };
    _critMap['fields']=[ 't_description' ];
    _critMap['minTermFreq']=1;

    _obj['meta']=_qSection['meta'];
    _obj['query']=_esInterpretorUtil.buildQueryByType(_qSection, _critMap);
    _obj['query'].size(10);

    return _obj;
  };
  let _createQueryForShopItemDetailsSuggestionsST = function(_qSection, _payLoad) {
    let _eb = _eBuilder;
    let _obj={};
    let _critMap={};
    let _queryObj=new _eb.requestBodySearch();
    // TODO: not to be hard-coded (but for now, it is easier to handle this way)
    let _stepAggs=_qSection['steps'][1];

    // handle aggs
    _queryObj=_esInterpretorUtil.buildAggByType(_stepAggs['agg'], _stepAggs, _queryObj);

    // handle query
    _critMap['must']=[];
    _critMap['must'].push({ 'query': 'MatchQuery', "field": 't_description', "value": _payLoad['_source']['t_description'] });
    _critMap['must'].push({ 'query': 'MatchQuery', "field": 'k_category', "value": _payLoad['_source']['k_category'][0] });

    // add this step so that a bool query would be created
    _qSection['steps'].push({ "id": 3, "query": "bool" });
    let _queryObj2 = _esInterpretorUtil.buildQueryByType(_qSection, _critMap);
    _queryObj2.aggs(_queryObj['_aggs']);
    _queryObj2.size(0);

    _obj['meta']=_qSection['meta'];
    _obj['query']=_queryObj2;

    return _obj;
  };

  // ------------------------------------ //
  // start of query(s) for advance search //
  // ------------------------------------ //

  let getAdvSearchMatchQueryResults = function(_req, _resp) {
    let _eb = _eBuilder;
    let _rQ = _req.query;
    let _body=[];
    let _dsl='';
    let _queryObj=new _eb.RequestBodySearch();

    // create the dsl by the request objects' params
    _queryObj.size(parseInt(_rQ['size'] ,10));
    if (_rQ['highlight']=='yes') {
      _queryObj.highlight(new _eb.Highlight([
        "t_description", "s_brand_name", "k_category" ]));
    }
    // create the MatchQuery object and set the attributes
    let _matchQ=new _eb.MatchQuery(_rQ['field'], _rQ['text']);
    _matchQ.operator(_rQ['operator']);
    _matchQ.minimumShouldMatch(parseInt(_rQ['minShouldMatch'], 10));

    // update the dsl member and attach the matchQuery object to the requestBodySearch object
    _queryObj.query(_matchQ);
    _dsl = _queryObj.toJSON();

    _body.push({
      "index": "jeymart_item",
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

  let getAdvSearchMatchPhraseQueryResults=function(_req, _resp) {
    let _eb = _eBuilder;
    let _rQ = _req.query;
    let _body=[];
    let _dsl='';
    let _queryObj=new _eb.RequestBodySearch();

    // create the dsl by the request objects' params
    _queryObj.size(parseInt(_rQ['size'] ,10));
    if (_rQ['highlight']=='yes') {
      _queryObj.highlight(new _eb.Highlight([
        "t_description", "s_brand_name", "k_category" ]));
    }
    // create the MatchQuery object and set the attributes
    let _matchQ=new _eb.MatchPhraseQuery(_rQ['field'], _rQ['text']);
    _matchQ.slop(parseInt(_rQ['slop'], 0));

    // update the dsl member and attach the matchQuery object to the requestBodySearch object
    _queryObj.query(_matchQ);
    _dsl = _queryObj.toJSON();

    _body.push({
      "index": "jeymart_item",
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

  let getAdvSearchMultiMatchQueryResults=function(_req, _resp) {
    let _eb = _eBuilder;
    let _rQ = _req.query;
    let _body=[];
    let _dsl='';
    let _queryObj=new _eb.RequestBodySearch();

    // create the dsl by the request objects' params
    _queryObj.size(parseInt(_rQ['size'] ,10));
    if (_rQ['highlight']=='yes') {
      _queryObj.highlight(new _eb.Highlight([
        "t_description", "s_brand_name", "k_category" ]));
    }
    // create the MatchQuery object and set the attributes
    let _matchQ=new _eb.MultiMatchQuery(_rQ['fields'], _rQ['text']);

    // update the dsl member and attach the matchQuery object to the requestBodySearch object
    _queryObj.query(_matchQ);
    _dsl = _queryObj.toJSON();

    _body.push({
      "index": "jeymart_item",
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

  let getAdvSearchMultiTermsQueryResults = function(_req, _resp) {
    let _eb = _eBuilder;
    let _rQ = _req.query;
    let _body=[];
    let _dsl='';
    let _queryObj=new _eb.RequestBodySearch();

    // create the dsl by the request objects' params
    _queryObj.size(parseInt(_rQ['size'] ,10));
    if (_rQ['highlight']=='yes') {
      _queryObj.highlight(new _eb.Highlight([
        "t_description", "s_brand_name", "k_category" ]));
    }
    // create the MatchQuery object and set the attributes
    let _matchQ=new _eb.TermsQuery(_rQ['field'], _rQ['termsArray']);

    // update the dsl member and attach the matchQuery object to the requestBodySearch object
    _queryObj.query(_matchQ);
    _dsl = _queryObj.toJSON();

    _body.push({
      "index": "jeymart_item",
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

  /**
   *  return the minimal methods and attributes to the caller
   */
  return {
    // setup routes related to Jeymart eCommerce app
    setup: () => {
      _router.route('/').
        get(function(_req, _resp) {
          _resp.sendFile( _path.join(__dirname, "../../public/clientView/view/redirectToShop.html") );
          //buildCRUD(_req, _resp);
        }
      );
      _router.route('/api/shopInitGet').
        get(function(_req, _resp) {
          // do a msearch on ... 1) get back the categories available
          shopInitGet_queries(_req, _resp);
        }
      );
      _router.route('/api/searchbarTextAutoCompletionSuggestionsGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getSearchbarTextAutoCompletions(_req, _resp);
        }
      );
      _router.route('/api/shopFacetsGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          shopFacetsGet_queries(_req, _resp);
        }
      );
      _router.route('/api/shopLandingInfoGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getTop5CategoryTop6HitsForLandingInfo(_req, _resp);
        }
      );
      _router.route('/api/shopListingByParamsGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getListingDataByRouteParams(_req, _resp);
        }
      );
      _router.route('/api/shopItemDetailsSuggestionsGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getShopItemDetailsSuggestions(_req, _resp);
        }
      );
      // advance search app / page
      _router.route('/api/shopAdvSearchMatchQueryGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getAdvSearchMatchQueryResults(_req, _resp);
        }
      );
      _router.route('/api/shopAdvSearchMatchPhraseQueryGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getAdvSearchMatchPhraseQueryResults(_req, _resp);
        }
      );
      _router.route('/api/shopAdvSearchMultiMatchQueryGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getAdvSearchMultiMatchQueryResults(_req, _resp);
        }
      );
      _router.route('/api/shopAdvSearchMultiTermsQueryGet').
        get(function(_req, _resp) {
          // do a msearch on ...
          getAdvSearchMultiTermsQueryResults(_req, _resp);
        }
      );






      return _router;
    }
  };  // return minimal functions of Chp03 object
};

module.exports=MainRoutes;
