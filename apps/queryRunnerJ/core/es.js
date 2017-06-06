
function getESClient() {
  var client = new $.es.Client({
    hosts: 'http://localhost:9200',
    ignore: [404]
  });
  return client;
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
