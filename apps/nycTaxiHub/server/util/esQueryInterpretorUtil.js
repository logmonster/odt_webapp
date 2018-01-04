
let Util = function(_defaultQueriesMap, _eb) {

  /*
   *  extract the list of query steps / sections based on the given _qName
   */
  let _extractJsonByQueryName = function(_qName) {
    return _defaultQueriesMap[_qName];
  };
  /*
   *  extract the dedicated query steps / section based on the _qId
   */
  let _extractJsonByQueryId = function(_queryList, _qId) {
    let _qSection = null;
    if (_queryList) {
      _queryList.forEach(function(_item, _idx) {
        if (_item && _qId == _item['id']) {
          _qSection = _item;
        }
      });
    }
    return _qSection;
  };

  /*
   *  handling of query / general method(s)
   */
  let _handleQueryMethods = function(_methodName, _step, _queryObj) {
    // depends on the "methods"; need specific handling
    if (_methodName == "size") {
      let _size=parseInt(_step['param'], 10)
      _queryObj.size(_size);
    }
    return _queryObj;
  };

  /*
   *  handling of agg setup
   */
  let _handleAgg = function(_aggType, _step, _queryObj) {
    let _agg=_handleAggPerStep(_aggType, _step, _queryObj);

    // add back to the _queryObj
    _queryObj.agg(_agg);

    return _queryObj;
  };

  /*
   *  real action on handling an aggregation (plus sub-aggregations)
   */
  let _handleAggPerStep = function(_aggType, _step, _queryObj) {
    let _agg = null;
    // depends on the agg type, different config might be applied
    if (_aggType == "TermsAggregation") {
      let _param = _step['param'];  // this is a MUST
      let _size = (_step['size']!=null)?parseInt(_step['size'], 10):-1;
      let _order = (_step['order']!=null)?_step['order']:null;
      let _subAgg = (_step['subAggs']!=null)?_step['subAggs']:null;

      _agg = new _eb.TermsAggregation(
        _param[0],
        _param[1]
      );
      if (_size!=-1) {
        _agg.size(_size);
      }
      if (_order!=null) {
        _agg.order(_order[0], _order[1]);
      }
      // handling of subAgg(s) if any
      if (_subAgg!=null) {
        let _subAggArray=[];
        _subAgg.forEach(function(_subA, _idx_1) {
          _subAggArray.push(_handleAggPerStep(_subA['agg'], _subA, _queryObj));
        });
        // add back to _agg...
        _agg.aggs(_subAggArray);
      }
    } else if (_aggType=="SumAggregation") {
      let _param = _step['param'];  // this is a MUST

      _agg = new _eb.SumAggregation(
        _param[0],
        _param[1]
      );
    } else if (_aggType=="TopHitsAggregation") {
      let _param = _step['param'];  // this is a MUST
      let _size = (_step['size']!=null)?parseInt(_step['size'], 10):-1;
      let _orders = (_step['orders']!=null)?_step['orders']:null;

      _agg = new _eb.TopHitsAggregation(
        _param[0]
      );
      if (_size!=-1) {
        _agg.size(_size);
      }
      if (_orders!=null) {
        let _sorts = [];
        _orders.forEach(function(_sort, _idx_1) {
          _sorts.push(new _eb.Sort(_sort['field'], _sort['direction']));
        });
        _agg.sorts(_sorts);
      }
    } else if (_aggType=='SignificantTermsAggregation') {
      let _param=_step['param'];
      let _size=parseInt(_step['size'], 10);
      let _subAgg = (_step['subAggs']!=null)?_step['subAggs']:null;

      _agg = new _eb.SignificantTermsAggregation(_param[0], _param[1]);
      if (_size>=0) {
        _agg.size(_size);
      }
      // handling of subAgg(s) if any
      if (_subAgg!=null) {
        let _subAggArray=[];
        _subAgg.forEach(function(_subA, _idx_1) {
          _subAggArray.push(_handleAggPerStep(_subA['agg'], _subA, _queryObj));
        });
        // add back to _agg...
        _agg.aggs(_subAggArray);
      }
    }
    return _agg;
  };

  /**
   *  handling of suggest setup
   */
  let _handleSuggest = function(_suggestType, _step, _queryObj, _payloads) {
    // depending on the suggest type, the syntax would be different
    if (_suggestType=='completion') {
      let _label = _step['label'];
      let _field = _step['field'];
      let _prefix = _payloads['prefix'];
      let _size = _step['size']
      let _sugg = new _eb.CompletionSuggester(_label, _field);

      _prefix=(_prefix)?_prefix:'';
      _sugg.prefix(_prefix);

      _size=(_size)?parseInt(_size, 10):10;
      _sugg.size(_size);

      // add back to the query object
      _queryObj.suggest(_sugg);
    }
    return _queryObj;
  };

  /*
   *  handy method to return the query_type within the "steps".
   *  only one of the step should contain the "query" type
   */
  let _getQueryTypeFromSteps = function(_steps) {
    let _type='';
    for (let _idx=0; _idx<_steps.length; _idx++) {
      let _step = _steps[_idx];
      if (_step['query']) {
        _type=_step['query'];
        break;
      }
    }
    return _type;
  };

  let _buildQueryByType = function(_payloads, _criteria) {
    let _queryObj = _eb.requestBodySearch();
    // get type
    let _type = _getQueryTypeFromSteps(_payloads['steps']);

    // boolean query
    if ('bool' == _type) {
      let _must=_criteria['must'];
      let _should=_criteria['should'];
      let _mustNot=_criteria['must_not'];
      let _filter=_criteria['filter'];
      let _pagination=_criteria['pagination'];
      let _q = new _eb.BoolQuery();

// TODO: might have query(s) that need more than 2 parameters
      if (_must && _must.length>0) {
        let _mustLst=[];
        _must.forEach(function(_crit, _idx_1) {
          _mustLst.push(new _eb[_crit['query']](_crit['field'], _crit['value']));
        });
        _q.must(_mustLst);
      }
      if (_should && _should.length>0) {
        let _shouldLst=[];
        _should.forEach(function(_crit, _idx_1) {
          _shouldLst.push(new _eb[_crit['query']](_crit['field'], _crit['value']));
        });
        _q.should(_shouldLst);
      }
      if (_mustNot && _mustNot.length>0) {
        let _mustNotLst=[];
        _mustNot.forEach(function(_crit, _idx_1) {
          _mustNotLst.push(new _eb[_crit['query']](_crit['field'], _crit['value']));
        });
        _q.mustNot(_mustNotLst);
      }
      if (_filter && _filter.length>0) {
        let _filterLst=[];
        _filter.forEach(function(_crit, _idx_1) {
          _filterLst.push(new _eb[_crit['query']](_crit['field'], _crit['value']));
        });
        _q.filter(_filterLst);
      }
      // handle _pagination
      if (_pagination) {
        let _size = parseInt(_pagination['pageSize'], 10);
        let _from = parseInt(_pagination['page'], 10)*_size;
        _queryObj.from(_from);
        _queryObj.size(_size);
      }
      // set back the query object to the RequestBodySearch object
      _queryObj.query(_q);

    } else if ('morelikethis' == _type) {
      // MoreLikeThisQuery
      let _q = new _eb.MoreLikeThisQuery();
      let _like = _criteria['like'];
      let _fields = _criteria['fields'];
      let _minTermFreq = parseInt(_criteria['minTermFreq'], 10);

      if (_like) {
        _q.like(_like);
      }
      if (_fields) {
        _q.fields(_fields);
      }
      if (_minTermFreq>=0) {
        _q.minTermFreq(_minTermFreq);
      }
      _queryObj.query(_q);
    }

    return _queryObj;
  };


  // return the minimum methods and attributes for the caller
  return {
    /**
     *  build the body list for msearch query
     */
    buildQueryByQueryId: function(_qName, _qId, _payloads) {
      let _msearchLst=[];
      let _queryList = _extractJsonByQueryName(_qName);
      let _querySection = (_queryList!=null)?_extractJsonByQueryId(_queryList, _qId):null;

      if (_querySection) {
        let _steps = _querySection['steps'];
        let _meta = _querySection['meta'];
        let _queryObj = _eb.requestBodySearch();

        _steps.forEach(function(_step, _idx) {
          /*
           *  is it ...
           *  a) a generic method under the query clause? (e.g. size)
           *  b) an agg(regation) found? (e.g. TermsAggregation)
           */
          if (_step['method']) {
            _queryObj=_handleQueryMethods(_step['method'], _step, _queryObj);
          } else if (_step['agg']) {
            _queryObj=_handleAgg(_step['agg'], _step, _queryObj);
          } else if (_step['suggest']) {
            _queryObj=_handleSuggest(_step['suggest'], _step, _queryObj, _payloads);
          }
        });
        _msearchLst.push(_meta);
        _msearchLst.push(_queryObj.toJSON());

      } else {
        console.log(
          '** the requested queryName or queryId is not available ** qName: '+
          _qName+"; qId: "+_qId
        );
      } // end -- if (_querySection valid)
      return _msearchLst;
    },

    /**
     *  helper method to return the query-section bounded by the queryName and queryId
     */
    extractJsonByQueryNameAndId: function(_qName, _qId) {
      let _queryList = _extractJsonByQueryName(_qName);
      let _querySection = (_queryList!=null)?_extractJsonByQueryId(_queryList, _qId):null;

      return _querySection;
    },

    /**
     *  build a query base on the given criteria
     */
    buildQueryByType: function(_payloads, _criteria) {
      return _buildQueryByType(_payloads, _criteria);
    },

    buildAggByType: function(_aggType, _step, _queryObj) {
      return _handleAgg(_aggType, _step, _queryObj);
    }


  };
};

module.exports = Util;
