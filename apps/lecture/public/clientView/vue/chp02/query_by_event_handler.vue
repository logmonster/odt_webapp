<style></style>

<template>
  <div class="lecture-chapter-container">
    <h3>Query by eventHandler:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      There are 2 ways to handle the results from a ES query. One of the ways
      is through a simple eventHander. The following are the
      javascript side code as well as the es query involved.
    </p>

    <lecture-code-snippet
      :codeLabel="jsClient.codeLabel"
      :codeContent="jsClient.codeContent"
      :codeContentBeautified="jsClient.codeContentBeautified"
      :codeId="jsClient.codeId" ></lecture-code-snippet>

  </div>
</template>

<script>
function _model_chp2_qbeh(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbeh_jsclient'
    }
    //, es (code as well), js_server (code if necessary)
  };
}
// model instance
var _model;

module.exports = {
  name: 'query_by_event_handler',
  data: function() {
    if (!_model) {
      _model = new _model_chp2_qbeh(this);
    }
    return _model;
  },
  mounted: function() {
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp02/query_by_event_handler.code',
      function(_data, _status, _xhr) {
        if (_data) {
          _model.jsClient.codeContent = _data;
          _model.jsClient.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );  // end -- loadResourceFile
  }
};

</script>
