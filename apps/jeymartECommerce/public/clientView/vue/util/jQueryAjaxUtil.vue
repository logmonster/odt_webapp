<!-- only scripts / code -->
<script>
module.exports = {
  /**
   *  running a GET operation against the backend
   */
  GET: function(_url, _payloads, _doneCallback, _failCallback) {
    if (!jQuery.ajax) {
      console.log('** jQuery is not available~!! **');
      return;
    }

    jQuery.ajax(_url, {}).done(function(_data, _status, _jqXHR) {
      _doneCallback(_data, _status, _jqXHR);
    }).fail(function(_jqXHR, _status, _err) {
      _failCallback(_jqXHR, _status, _err);
    });
  }

};
</script>
