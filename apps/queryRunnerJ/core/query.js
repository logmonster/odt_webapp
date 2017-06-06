
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
        console.log('$$$$inside success');
        console.log(_body);
        console.log(arguments);
      },
      function(_err) {
        console.log('***inside err');
        console.log(_err);
        console.log(arguments);
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
