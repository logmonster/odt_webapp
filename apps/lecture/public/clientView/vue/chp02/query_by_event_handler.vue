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
function _model_chp2_qbeh(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbeh_jsclient'
    },
    'es': {
      'codeLabel': 'es DSL query',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbeh_es'
    },
    'result': {
      'codeLabel': 'query result (JSON)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp2_qbeh_result'
    },
    'showResult': false,
    'esConfig': {  },
    getESConfig: function(_cfg) {
      return LectureUtil.cloneObject(_cfg);
    }
    //, es (code as well), js_server (code if necessary)
  };
}
// model instance
//var _model;

module.exports = {
  name: 'query_by_event_handler',
  data: function() {
    /*
    if (!_model) {
      _model = new _model_chp2_qbeh(this);
    }
    return _model; */
    return new _model_chp2_qbeh(this);
  },
  mounted: function() {
    let _instance=this;
    // load esConfig
    LectureUtil.getESConfig().then(function(_data) {
      _instance.esConfig['cfg']=_data;
    });
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp02/query_by_event_handler.code',
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
        search(getESClient(_instance.getESConfig(_instance.esConfig['cfg'])),
          'javascript_client_data',
          'doc',
          {
            "query": {
              "match_all": {}
            }
          },
          false,
          function(_err, _resp) {
            if (!_err) {
              var _v = prettyJson(JSON.stringify(_resp));
              _instance.result.codeContent = _v;
              _instance.result.codeContentBeautified = LectureUtil.jsCodeBeautifier(_v);
              _instance.showResult=true;
            } else {
              _instance.result.codeContent = _err;
              _instance.result.codeContentBeautified = _err;
              _instance.showResult=true;
            }
          },
          null
          /*function(_resp) {
            var _v = prettyJson(JSON.stringify(_resp));
            _instance.result.codeContent = _v;
            _instance.result.codeContentBeautified = LectureUtil.jsCodeBeautifier(_v);
            _instance.showResult=true;
          },
          function(_err) {
            _instance.result.codeContent = _err;
            _instance.result.codeContentBeautified = _err;
            _instance.showResult=true;
          }*/
        );  // end -- search
      }
    } // end -- runQuery
  }
};

</script>
