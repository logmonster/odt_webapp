
let CONST_SIMPLE_MATCH_QUERY = {
  'meta': 'GET jeymart_item/_search',
  'query': JSON.stringify({
    "query": {
      "match": {
        "FIELD": "TEXT"
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
          "field": "FIELD",
          "size": 10
        }
      }
    }
  })
};


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
    });
  }

  _jBtn=window.jQuery('#btnSimpleTermsAggs');
  if (_jBtn.length>0) {
    _jBtn.on('click', function(_event) {
      copyCodeToQueryTextArea(CONST_SIMPLE_TERMS_AGGS);
    });
  }

  _jBtn=window.jQuery('#btnClear');
  if (_jBtn.length>0) {
    _jBtn.on('click', function(_event) {
      clearQueryTextArea();
    });
  }
}
/*
 *  init the radio boxes
 */
function initResultFormatRadio() {
  let _jRad = window.jQuery('input[name=radResultChoice]');

  if (_jRad && _jRad.length==3) {
    _jRad.on('change', function(_event) {
      let _jControl = window.jQuery(_event.target);

      if (_jControl.val()==2) {
        window.jQuery('#divCodeView').addClass('showing').removeClass('hiding');
      } else {
        window.jQuery('#divCodeView').addClass('hiding').removeClass('showing');
        window.jQuery('#txtCode').val("");
      } // show the custom code textarea
      window.resultFormat = _jControl.val();
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
