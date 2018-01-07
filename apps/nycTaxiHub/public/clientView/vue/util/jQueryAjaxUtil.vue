<!-- only scripts / code -->
<script>
module.exports = {
  /**
   *  running a GET operation against the backend
   */
  GET: function(_url, _payloads, _doneCallback, _failCallback, _finallyCallback) {
    if (!jQuery.ajax) {
      console.log('** jQuery is not available~!! **');
      return;
    }

    if (_payloads) {
      _data = _payloads;
    } else {
      _data = {}
    }

    let _fCb = _finallyCallback;
    if (!_fCb) {
      // empty function
      _fCb = function() {};
    }

    jQuery.ajax(_url, { 'data': _data }).
      done(function(_data, _status, _jqXHR) {
      _doneCallback(_data, _status, _jqXHR);
    }).fail(function(_jqXHR, _status, _err) {
      _failCallback(_jqXHR, _status, _err);
    }).always(function(_data, _status, _err) {
      _fCb(_data, _status, _err);
    });
  },

  POST: function(_url, _payloads, _doneCallback, _failCallback, _finallyCallback) {
    let _data ={};

    if (!jQuery.ajax) {
      console.log('** jQuery is not available~!! **');
      return;
    }

    if (_payloads) {
      _data = _payloads;
    }

    let _fCb = _finallyCallback;
    if (!_fCb) {
      // empty function
      _fCb = function() {};
    }

    jQuery.ajax(
      _url,
      { 'method': 'POST',
        'data': _data }
    ).done(function(_data, _status, _jqXHR) {
      _doneCallback(_data, _status, _jqXHR);
    }).fail(function(_jqXHR, _status, _err) {
      _failCallback(_jqXHR, _status, _err);
    }).always(function(_data, _status, _err) {
      _fCb(_data, _status, _err);
    });
  }

};
</script>
