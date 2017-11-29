<script>

let CODE_TERMS = {
  "keywords": {
    "terms": [ "function", "let", "var", "if", "typeof", "return", "new", "else" ],
    "color": "js_code_keyword"
  },
  "methods": {
    "delim": [ /[a-z|0-9|_]+\s*\(/ ],
    "open_bracket": "(",
    "color": "js_code_method"
  },
  "html": {
    "terms": [ "document", "querySelector", "execCommand", "div", "span", "class", "style", "JSON", "Math" ],
    "color": "js_code_html"
  }
};

let _loadResourceFile = function(_path, _callback) {
  if ($.get) {
    $.get(_path, null, function(_data, _status, _xhr) {
      if (_callback) {
        _callback(_data, _status, _xhr);
      }
    });
  }
};

let _esConfig=null;

module.exports = {
  // return the es-config related json configuration file
  getESConfig: () => {
    var _jDef=$.Deferred();

    // not yet loaded, try loading it
    if (_esConfig==null) {
      _loadResourceFile('/clientView/samples/es_config.json',
        function(_data, _status, _xhr) {
          _esConfig=_data;
          _jDef.resolve(_esConfig);
        }
      );
    } else {
      _jDef.resolve(_esConfig);
    }
    return _jDef.promise();
  },
  // method to copy to clipboard
  htmlCopy2Clipboard: (_elementId, _hideAfterCopy) => {
    var _e = document.querySelector('#'+_elementId);

    if (_e && document.execCommand) {
      // 0. show the element
      $(_e).addClass('showing').removeClass('hiding');

      _e.select();  // a. get the element selected all the contents
      // b. execute a "copy" command
      let _success = document.execCommand('copy');
      // c. to blur and remove selection of the element
      _e.selectionEnd = _e.selectionStart;
      _e.blur();

      // 0. remove the showing class
      $(_e).removeClass('showing').addClass('hiding');

      return _success;
    }
    return false;
  },

  // load a resource file
  loadResourceFile: (_path, _callback) => {
    _loadResourceFile(_path, _callback);
    /*if ($.get) {
      $.get(_path, null, function(_data, _status, _xhr) {
        if (_callback) {
          _callback(_data, _status, _xhr);
        }
      });
    }*/
  },

  // a beta js code beautifier
  jsCodeBeautifier: (_content) => {
    let _lines = _content.split('\n');
    let _ct = '';

    var _checkHtmlTerms = function(_t, _ct) {
      var _currentT=_t; // the currently replaced _t
      for (var _l=0; _l<CODE_TERMS['html']['terms'].length; _l++) {
        var _curTerm=CODE_TERMS['html']['terms'][_l];
        if ( _t.indexOf(_curTerm) != -1) {
          _currentT=_currentT.replace(_curTerm,
            "<span class='"+CODE_TERMS['html']['color']+"'>"+_curTerm+"</span>");
        }
      }
      return { _ct: _currentT, ok: true };
    };

    _lines.forEach(function(_line, _idx) {
      let _htmlMethodReturnVal=null;

      // tokenize
      let _tokens=_line.split(" ");

      // lead space handling
      let _leadSpacesCnt = _line.search(/[^\s]/);
      let _leadSpaces = '';

      if (_leadSpacesCnt!=-1) {
        for (var _k=0; _k<_leadSpacesCnt; _k++) {
          _leadSpaces+="&nbsp;";
        }
        _ct+=_leadSpaces;
      }

      _tokens.forEach(function(_token, _jdx) {
        if (CODE_TERMS['keywords']['terms'].indexOf(_token)!=-1) {
          _ct+="<span class='"+CODE_TERMS['keywords']["color"]+"'>"+_token+"</span>";
          _tokenUpdated=true;

        /*} else if ( (_htmlMethodReturnVal=_checkHtmlTerms(_token, _ct)).ok ) {
          //_ct+="<span class='"+CODE_TERMS['html']["color"]+"'>"+_token+"</span>";
          if (_htmlMethodReturnVal.ok) {
            _ct+=_htmlMethodReturnVal._ct;
            _tokenUpdated=true;
          }
        */
        } else if (_token.search(CODE_TERMS['methods']['delim'][0]) != -1 ) {
          // it is a method token
          let _oBracketIdx = _token.indexOf(CODE_TERMS['methods']['open_bracket']);
          _ct+="<span class='"+CODE_TERMS['methods']['color']+"'>"+_token.substring(0, _oBracketIdx)+"</span>"+_token.substring(_oBracketIdx);

        } else {
          _ct+=_token;
        }
        // trailing space
        _ct+=" ";

      }, _tokens);

      // add newline per row
      _ct+="<br/>";
    }, _ct);

    return _ct;
  },
  /* clone the given object; it is a MUST for elasticsearch.js
   *  as you couldn't re-use a config object to create another connection
   */
  cloneObject: function(_cfg) {
    // make a clone... jesus...
    // https://github.com/elastic/elasticsearch-js/issues/33
    var _keys=Object.keys(_cfg);
    var _clone={};

    for (var _i=0; _i<_keys.length; _i++) {
      var _k=_keys[_i];
      var _v=_cfg[_k];

      _clone[_k]=_v;
    }
    return _clone;
  }

}
</script>
