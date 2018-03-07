
let CONST_SIMPLE_MATCH_QUERY = {
  'meta': 'GET jeymart_item/_search',
  'query': JSON.stringify({
    "query": {
      "match": {
        "t_description": "dress"
      }
    }
  })
};
let CONST_SIMPLE_TERMS_AGGS = {
  'meta': 'GET jeymart_item/_search',
  'query': JSON.stringify({
    "size": 0,
    "aggs": {
      "terms_aggs": {
        "terms": {
          "field": "k_category",
          "size": 10
        }
      }
    }
  })
};

let CONST_JEYMART_ITEMS_VALID_FIELDS = [
  "k_stock_code", "k_category", "t_description", "s_brand_name",
  "hf_price_suggested"];

/*
 *  method to initialize the query related buttons
 */
function initQueryButtons() {
  let _jBtn = undefined;

  _jBtn=window.jQuery('#btnSimpleMatchQuery');
  if (_jBtn.length>0) {
    _jBtn.on('click', function(_event) {
      // console.log(JSON.parse(CONST_SIMPLE_TERMS_AGGS.query));
      // console.log(CONST_SIMPLE_TERMS_AGGS.query);
      copyCodeToQueryTextArea(CONST_SIMPLE_MATCH_QUERY);
      window.queryType = 'query';
    });
  }

  _jBtn=window.jQuery('#btnSimpleTermsAggs');
  if (_jBtn.length>0) {
    _jBtn.on('click', function(_event) {
      copyCodeToQueryTextArea(CONST_SIMPLE_TERMS_AGGS);
      window.queryType = 'aggs';
    });
  }

  _jBtn=window.jQuery('#btnClear');
  if (_jBtn.length>0) {
    _jBtn.on('click', function(_event) {
      clearQueryTextArea();
      window.queryType = undefined;
    });
  }

  _jBtn=window.jQuery('#btnRunQuery');
  if (_jBtn.length>0) {
    _jBtn.on('click', function(_event) {
      sendQueryToServer();
    });
  }
}
/*
 *  init the radio boxes
 */
function initResultFormatRadio() {
  let _jRad = _getResultFormatRadio();

  if (_jRad && _jRad.length==3) {
    _jRad.on('change', function(_event) {
      let _jControl = window.jQuery(_event.target);

      if (_jControl.val()==2) {
        window.jQuery('#divCodeView').addClass('showing').removeClass('hiding');
        _getDivResult().empty();
      } else {
        window.jQuery('#divCodeView').addClass('hiding').removeClass('showing');
        window.jQuery('#txtCode').val("");
      } // show the custom code textarea
      window.resultFormat = _jControl;
    });
  }
}

// helper to make the json look good
function _prettyJSON(_codeObject) {
  let _v='';

  if (_codeObject) {
    _v += _codeObject.meta + '\r\n'
    _v += JSON.stringify(JSON.parse(_codeObject.query), undefined, 2);
  }
  return _v;
}
function _simplePrettyJSON_stringify(_q) {
  return JSON.stringify(_q, undefined, 2);
}

// helper to copy the prettify code to the textarea
function copyCodeToQueryTextArea(_codeObject) {
  let _jTxt = window.jQuery('#txtQuery');

  if (_codeObject) {
    // rebuild the code object here
    let _code = _prettyJSON(_codeObject);
    _jTxt.val(_code);
  }
}
// helper to clear the query textarea
function clearQueryTextArea() {
  window.jQuery('#txtQuery').val("");
}

function sendQueryToServer() {
  let _q = window.jQuery('#txtQuery').val();

  if (_q.trim().length>0) {
    window.jQuery.post(
      '/api/query',
      { 'query': _q },
      function(_data, _status, _jqXHR) {
        _handleQueryResponse(_data, _status, _jqXHR);
      }
    );
  } else {
    alert('query is not provided yet!');
  }
}

function _handleQueryResponse(_data, _status, _jqXHR) {
  let _resultFormat = _getResultFormatRadio();
  let _resultFormatVal = _resultFormat.val();

  if (_resultFormatVal=='0') {
    if (window.queryType) {
      if (window.queryType == 'query') {
        _renderTableFromData(_data);
      } else if (window.queryType == 'aggs') {
        _renderTableFromData_aggs(_data);
      }
    }
  } else if (_resultFormatVal=='1') {
    if (window.queryType) {
      if (window.queryType == 'query') {
        _renderPlainFromData(_data);
      } else if (window.queryType == 'aggs') {
        _renderPlainFromData_aggs(_data);
      }
    }
  } else if (_resultFormatVal=='2') {
    _renderJScriptSnippetWithData(_data);
  } else {
    alert('unknown format');
  }
  //console.log(_data);
}

function _getDivResult() {
  if (!window.divResult) {
    let _dResult = window.jQuery('div[class=divResult]');
    if (_dResult.length==1) {
      window.divResult = _dResult;
    }
  }
  return window.divResult;
}
function _getResultFormatRadio() {
  if (!window.resultFormat) {
    window.resultFormat = window.jQuery('input[name=radResultChoice]');
  }
  return window.resultFormat;
}

function _renderDataTable(_hitsArr) {
  // only certain field(s) would be extracted
  let _t = "<table class='table'>";

  _t += "<thead class='thead-inverse'><tr>";
  CONST_JEYMART_ITEMS_VALID_FIELDS.forEach(function(_item, _idx) {
    _t += "<th>" + _item + "</th>"
  });
  _t += "</tr></thead>";

  return _t;
}
function _renderDataRow(_hit) {
  let _r = '<tr>';

  CONST_JEYMART_ITEMS_VALID_FIELDS.forEach(function(_item, _idx) {
    let _v = _hit[_item];
    if (!_v || (_v.trim && _v.trim().length==0)) {
      _v="&nbsp;";
    }
    _r += "<td>" + _v + "</td>";
  });
  _r += "</tr>";

  return _r;
}

/**
 *  rendering the table results
 */
function _renderTableFromData(_data) {
  let _dResult = _getDivResult();
  if (_dResult.length==1) {
    // reset
    _dResult.empty();

    if (_data['data'].hasOwnProperty('hits') &&
      _data['data']['hits'].hasOwnProperty('hits')) {

      let _d = _data['data']['hits']['hits'];
      // the table contents in string, convert to element by jQuery later
      let _t = '';
      if (_d.length>0) {
        // build table header
        _t = _renderDataTable(_d);
        // build table contents
        _t += "<tbody>";
        _d.forEach(function(_item, _idx) {
          _t += _renderDataRow(_item['_source']);
          //_item['_source']
        });
        _t += "</tbody>";
        _t += "</table>";
      } else {
        _t = '<div>no result found!</div>'
      }
      _dResult.html(_t);

    } // has data
  } // if (_dResult is valid)
}
function _renderTableFromData_aggs(_data) {
  let _dResult = _getDivResult();
  if (_dResult.length==1) {
    _dResult.empty();

    if (_data['data'].hasOwnProperty('aggregations')) {
      let _t = '';
      let _as = _data['data']['aggregations'];
      // aggs is very flexible in the no. of aggs run plus the aggs_name returned
      let _aggsLabels = Object.keys(_as);

      _aggsLabels.forEach(function(_aggsL, _idx) {
        let _aggsC = _as[_aggsL];
        // aggs could be "buckets" or "value" based...
        let _aggsCBuckets = _aggsC['buckets'];
        let _aggsCValue = _aggsC['value'];
        // table header and contents is of coz "case by case"
        _t+="<div> &nbsp; aggs: "+_aggsL+"</div>";
        if (_aggsCBuckets && _aggsCBuckets.length>0) {
          // header
          _t += "<table class='table'> <thead class='thead-inverse'><tr>";
          // get the 1st row of data
          let _row0Keys = Object.keys(_aggsCBuckets[0]);
          _row0Keys.forEach(function(_rowItem, _idx2) {
            _t += "<th>"+_rowItem+"</th>";
          });
          _t += "</tr></thead>";

          // table content
          _t += "<tbody>";
          _aggsCBuckets.forEach(function(_row, _idx2) {
            _t += "<tr>";
            _row0Keys.forEach(function(_rowItem, _idx2) {
              _t += "<td>"+_row[_rowItem]+"</td>";
            });
            _t += "</tr>";
          });

          _t += "</tbody>";
          _t += "</table>";

        } else if (_aggsCValue) {
          _t += "<table class='table'> <thead class='thead-inverse'><tr> <th>value</th> </tr></thead>";
          _t += "<tbody> <tr><td>"+_aggsCValue+"</td></tr> </tbody>";
          _t += "</table>";

        } else {
          _t += "<div>no aggregation result available!</div>"
        }
      }); // forEach label of aggs
      _dResult.html(_t);
    }

  } // end if (_dResult valid)
}

function _renderPlainFromData(_data) {
  let _dResult = _getDivResult();
  if (_dResult.length==1) {
    _dResult.empty();
    if (_data['data'].hasOwnProperty('hits') &&
      _data['data']['hits'].hasOwnProperty('hits')) {

      let _v = '';
      let _d = _data['data']['hits']['hits'];
      _d.forEach(function(_item, _idx) {
        _v += _simplePrettyJSON_stringify(_item);
        _v += '\r\n\r\n';
      });
      _dResult.html("<textarea readonly class='txtCodeView_textarea'>"+_v+"</textarea>");
    }
  } // end if (valid _dResult)
}
function _renderPlainFromData_aggs(_data) {
  let _dResult = _getDivResult();
  if (_dResult.length==1) {
    _dResult.empty();

    if (_data['data'].hasOwnProperty('aggregations')) {
      let _d = _data['data']['aggregations'];
      let _aKeys = Object.keys(_d);
      let _v = '';

      _aKeys.forEach(function(_aKey, _idx2) {
        // results could be in buckets or value form
        let _vC = _d[_aKey]['buckets'];
        let _vV = _d[_aKey]['value'];

        _v += 'aggs: '+_aKey+'\r\n';
        if (_vC) {
          _v += _simplePrettyJSON_stringify(_vC);

        } else if (_vV) {
          _v += '{ value: ';
          _v += _simplePrettyJSON_stringify(_vV);
          _v += ' }';
        }
        _v += "\r\n\r\n";
      });
      _v = "<textarea readonly class='txtCodeView_textarea'>"+_v+"</textarea>";
      _dResult.html(_v);
    }
  } // end -- if (_dResult valid)
}

function _renderJScriptSnippetWithData(_data) {
  let _dResult = _getDivResult();
  if (_dResult.length==1) {
    _dResult.empty();
    // eval the jscript snippet
    let _js = window.jQuery('#txtCode');
    if (_js.length==1 && _js.val().trim().length>0) {
      let _jsCode = _js.val();

      // try catch???
      try {
        //eval("(function(_data) { "+_jsCode+" })("+JSON.stringify(_data)+");");
        // provide a context (this.data => _data)
        let _ctx = { 'data': _data };
        let _fx = function() {
          eval(_jsCode);
        };
        _fx.call(_ctx);

      } catch(e) {
        alert(e);
      }
    } else {
      alert('javascript snippet not valid or not provided!!');
    }
  } // end -- if (_dResult is valid)
}
