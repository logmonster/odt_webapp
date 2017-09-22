
var _esClient=null;

function getESClientInstance() {
  if (_esClient==null) {
    _esClient=getESClient();
  }
  return _esClient;
}

/**
 *  reset the tQuery textarea
 */
function resetTQuery() {
  var _e = $('#tQuery');

  if (_e.length>0) {
    _e[0].value='';
  }
  $('#tIndex').val('');
  $('#tType').val('');

  // hide the dResultPane
  $('#dResultPane')[0].className='hiding';
}
/**
 *  pretty print (format) the typed in json query
 */
function prettyJson() {
  var _e=$('#tQuery');
  var _v='';

  if (_isEmptyString(_e[0].value)==false) {
    var _json=_isValidJson(_e[0].value);

    if (typeof(_json)=='object') {
      _v=JSON.stringify(_json, null, 2);
      _e[0].value=_v;
    }
  }
}

/**
 *  validation on if the given string is empty
 */
function _isEmptyString(_string) {
  var _reg=new RegExp('^\s*$');

  return _reg.test(_string);
}
/**
 *  validation on if the given string is a valid Json format
 */
function _isValidJson(_string) {
  var _s='';
  try {
    _s=JSON.parse(_string);
  } catch(_err) {
    _s='incorrect json query format : '+_err;
  }
  return _s;
}

/**
 *  parse and run a query against elasticsearch
 */
function runQuery() {
  var _e=$('#tQuery');
  var _v=_e[0].value;
  var _eArr=[];
  var _validJson=null;
  var _index=$('#tIndex').val();
  var _type=$('#tType').val();

  // validation on json structure
  if (_isEmptyString(_v)==true) {
    _eArr.push('query is empty!!');
  } else {
    var _json=_isValidJson(_v);

    if (typeof(_json)=='object') {
      _validJson=_json;
    } else {
      _eArr.push(_json);
    }
  } // end -- if (validations)

  if (_eArr.length>0) {
    _setErrBox(_eArr);
  } else {
    _resetErrBox();
    // can run query... promise approach
    search(getESClientInstance(), _index, _type, _validJson, true,
      function(_body) {
        _setResult(_body);
      },
      function(_err) {
        //console.log(arguments);
        // hide result pane
        $('#dResultPane')[0].className='hiding';

        if (_err.message.message.indexOf('Connection Failure')!=-1) {
          _setErrBox([ 'This could be caused by entering an invalid "index", please check. '+_err.message.stack ]);
        }
      }
    );
    /* callback approach
    search(getESClientInstance(), _index, _type, _validJson, false,
      function(err, response, status) {
        console.log(err);
        console.log(response);
        console.log(status);
      }
    );*/
  }
}

/**
 *  set result textarea
 */
function _setResult(_body) {
  console.log(_body);

  var _e=$('#tResult');
  var _v='';

  // set the original result to a hidden variable
  $('#tOriResult').html(JSON.stringify(_body));

  // set the results (typically just handle the hits and aggregations part)
  if (_body.hasOwnProperty('hits')) {
    _v='hits:\r\n'+JSON.stringify( (_body['hits']['hits']), null, 2);
  }
  if (_body.hasOwnProperty('aggregations')) {
    var _keys=Object.keys(_body['aggregations']);

    _v+='\r\n\r\naggregations:\r\n';
    for (var _idx=0; _idx<_keys.length; _idx++) {
      var _key=_keys[_idx];

      _v+='#'+_key+':\r\n';
      _v+=JSON.stringify( (_body['aggregations'][_key]['buckets']), null, 2);
    } // end -- for (keys within aggregations)
  }
  _e.html(_v);

  // review the dResultPane
  $('#dResultPane')[0].className='showing';
  _e.scrollTop(0);
}

/**
 *  reset the error-box
 */
function _resetErrBox() {
  var _e=$('#dErr');
  _e[0].innerHTML='';
  _e[0].className='error-box hiding';
}
/**
 *  update error-box
 */
function _setErrBox(_eArr) {
  var _e=$('#dErr');
  var _content='<ul style="padding-left: 16px;">';

  // build the content
  for (var _idx in _eArr) {
    var _msg=_eArr[_idx];
    _content+='<li style="list-style-type: disc;">'+_msg+'</li>';
  }
  _content+='</ul>';

  _e[0].innerHTML=_content;
  _e[0].className='error-box showing';
}

/**
 *  copy the original json to clipboard
 */
function copyResultToClipboard() {
  var _e=$('#tOriResult');
  var _success=false;

  _e[0].className='showing';
  _e[0].select();
  _success=document.execCommand('copy');
  _e[0].className='hiding';

  if (_success==true) {
    alert('original json copied to clipboard');
  } else {
    alert('something wrong, could not copy the json response to clipboard');
  }
}

function getESIndices() {
  queryIndices(getESClientInstance(), null,
    function(_body) {
      // break by "\n"
      // ** could be filtered
      var _e=$('#tResult');
      var _v='';
      var _indices=_body.split('\n');

      for (var _i=_indices.length-1; _i>=0; _i--) {
        if (_indices[_i].trim().length==0) {
          _indices.splice(_i, 1);
        } else {
          if (_v.length>0) _v+='\r\n';
          _v+=_indices[_i];
        }
      } // end -- for (_indices)

      // review the dResultPane
      $('#tResult').html(_v);
      $('#tOriResult').html(_v);
      $('#dResultPane')[0].className='showing';
      _e.scrollTop(0);

    }, function(_err) {
      console.log('$$$$ error');
      console.log(_err);
    }
  );
}


/* example query
GET musicbrainz-artists/_search
{
  "size": 0,
  "aggs": {
    "most_popular_areas": {
      "terms": {
        "field": "area.name.keyword"
      }
    }
  }
}
*/
