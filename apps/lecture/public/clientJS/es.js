
//var _previousESConfig=null;
//var _previousClient=null;

/**
 *  enhanced getESClient method; you can provide config params for the
 *  client creation
 */
function getESClient(_config) {
  let _client=null;
  // default config
  let _finalConfig={
    hosts: 'http://localhost:9200',
    ignore: [404]
  };

  if (_config && typeof(_config)=='object') {
    _finalConfig=_config;
  }
  return new $.es.Client(_finalConfig);
}

/**
 *  create the required json document for query
 */
function createQueryJson(_client, _index, _type, _query) {
  var _jObj={};
  var _queryDoc=null;

  if (!_isEmptyString(_index)) _jObj['index']=_index;
  if (!_isEmptyString(_type)) _jObj['type']=_type;
  _jObj['body']=JSON.stringify(_query);

  _queryDoc=JSON.parse(JSON.stringify(_jObj));

  return _queryDoc;
}

/**
 *  perform a search (underneath calling createQueryJson method to form the json for query)
 */
function search(_client, _index, _type, _query, _usePromise, _successFunction, _errorFunction) {
  var _queryDoc=createQueryJson(_client, _index, _type, _query);

  if (_queryDoc) {
    if (_usePromise==true) {
      _client.search(_queryDoc).then(_successFunction, _errorFunction);
    } else {
      _client.search(_queryDoc, _successFunction);
    } // end -- if (promise)
  } // end -- if (queryDoc)
}

/**
 *  query for the indices available within the elasticsearch cluster
 */
function queryIndices(_client, _columns, _success, _error) {
  var _cols=null;
  if (_columns && _columns.length>0) {
    _cols = _columns;
  } else {
    _cols=["index"];
  }

  _client.cat.indices({
    'h': _cols,
    's': _cols
  }).then(_success, _error);
}
