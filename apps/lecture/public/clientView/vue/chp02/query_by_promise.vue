<style></style>

<template>
  <div class="lecture-chapter-container">
    <h3>Query by promise:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      This is the "promise" approach in handling results from a ES query.
      The following are the javascript side code as well as the es query involved.
    </p>

    <lecture-code-snippet
      :codeLabel="jsClient.codeLabel"
      :codeContent="jsClient.codeContent"
      :codeContentBeautified="jsClient.codeContentBeautified"
      :codeId="jsClient.codeId" ></lecture-code-snippet>

    <lecture-code-snippet
      :codeLabel="es.codeLabel"
      :codeContent="es.codeContent"
      :codeContentBeautified="es.codeContentBeautified"
      :codeId="es.codeId" ></lecture-code-snippet>

    <lecture-code-snippet
      style="margin-top: 6px;"
      :class="{ 'showing': showResult, 'hiding': !showResult }"
      snippetType="result"
      :codeLabel="result.codeLabel"
      :codeContent="result.codeContent"
      :codeContentBeautified="result.codeContentBeautified"
      :codeId="result.codeId" ></lecture-code-snippet>

    <button style='margin-top: 12px;' class="btn btn-info" @click="runQuery()">run query</button>


  </div>
</template>

<script>
function _model_chp2_qbp(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbp_jsclient'
    },
    'es': {
      'codeLabel': 'es DSL query',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbp_es'
    },
    'result': {
      'codeLabel': 'query result (JSON)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbp_result'
    },
    'showResult': false
    //, es (code as well), js_server (code if necessary)
  };
}
// model instance
//var _model;

module.exports = {
  name: 'query_by_event_handler',
  data: function() {
    return new _model_chp2_qbp(this);
  },
  mounted: function() {
    let _instance=this;
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp02/query_by_promise.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.jsClient.codeContent = _data;
          _instance.jsClient.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );  // end -- loadResourceFile
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp02/query_dsl.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.es.codeContent = _data;
          _instance.es.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );  // end -- loadResourceFile
  },
  methods: {
    runQuery: function() {
      let _instance = this;
      // re-use the functions declared in clientJS/es.js
      if (getESClient && search) {
        search(getESClient(),
          'javascript_client_data',
          'config',
          {
            "query": {
              "match_all": {}
            }
          },
          true,
          function(_resp) {
            var _v = prettyJson(JSON.stringify(_resp));
            _instance.result.codeContent = _v;
            _instance.result.codeContentBeautified = LectureUtil.jsCodeBeautifier(_v);
            _instance.showResult=true;
          },
          function(_err) {
            _instance.result.codeContent = _err;
            _instance.result.codeContentBeautified = _err;
            _instance.showResult=true;
          }
        );  // end -- search
      }
    } // end -- runQuery
  }
};

</script>
