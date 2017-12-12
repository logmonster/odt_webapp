
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
    // depends on the agg type, different config might be applied
    if (_aggType == "TermsAggregation") {
      let _param = _step['param'];  // this is a MUST
      let _size = (_step['size']!=null)?parseInt(_step['size'], 10):-1;
      let _order = (_step['order']!=null)?_step['order']:null;
      let _agg = new _eb.TermsAggregation(
        _param[0],
        _param[1]
      );
      if (_size!=-1) {
        _agg.size(_size);
      }
      if (_order!=null) {
        _agg.order(_order[0], _order[1]);
      }
      // add back to the _queryObj
      _queryObj.agg(_agg);
    }
    return _queryObj;
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
      let _sugg = new _eb.CompletionSuggester(_label, _field);

      _prefix=(_prefix)?_prefix:'';
      _sugg.prefix(_prefix);

      // add back to the query object
      _queryObj.suggest(_sugg);
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
    }


  };
};

module.exports = Util;
