
let _es=null;

function getESClientInstance() {
  if (_es==null) {
    _es=getESClient();
  }
  return _es;
}

function prettyJson(_jsonObj) {
  var _json=_isValidJson(_jsonObj);

  if (typeof(_json)=='object') {
    _v=JSON.stringify(_json, null, 2);
    return _v;
  }
  return 'unknown format: '+_jsonObj;
}
function _isValidJson(_string) {
  var _s='';
  try {
    _s=JSON.parse(_string);
  } catch(_err) {
    _s='incorrect json query format : '+_err;
  }
  return _s;
}

function _isEmptyString(_string) {
  var _reg=new RegExp('^\s*$');

  return _reg.test(_string);
}

let chp02={
  // define the query
  basicQuery_1: {
    index: 'javascript_client_data',
    type: 'config',
    body: {
      "query": {
        "match_all": {}
      }
    }
  },
  runQueryEventHandler: function() {
    getESClientInstance().search(
      chp02['basicQuery_1'],
      function(_err, _resp) {
        // event-handler / callback
        if (_err) {
          // error handling
          alert(_err);
        } else {
          // display the first result to a div
          let _hit=_resp.hits.hits[0];
          document.querySelector('#divRes_1').innerHTML=JSON.stringify(_hit._source);
        }
      }
    );  // end of "search"
  },
  runQueryPromise: function() {
    getESClientInstance().
      search(chp02['basicQuery_1']).
      then(function(_resp) {
        // SUCCEED -- display the last result to a div
        let _hit=_resp.hits.hits[_resp.hits.hits.length-1];
        document.querySelector('#divRes_2').innerHTML=JSON.stringify(_hit._source);
      }, function(_err) {
        // FAIL
        alert(_err);
      }
    );  // end of "search"
  },
  runQueryWithFilterPath: function() {
    // only return the "took", "hits.hits._source.key" and "hits.hits._score"
    // ** seems not work on jQuery....?
    getESClient({
      hosts: 'http://localhost:9200',
      ignore: [404],
      filterPath: 'took,hits.hits._source.key,hits.hits._score'
    }).search(chp02['basicQuery_1']).then(
      function(_resp) {
        let _hit=_resp.hits.hits[_resp.hits.hits.length-1];
        document.querySelector('#divRes_3').innerHTML=JSON.stringify(_hit._source);
      }, function(_err) {
        // FAIL
        alert(_err);
      }
    );  // end -- search
  }

};
