<template>
  <div class="lecture-chapter-container">
    <h3>match query:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      match query is best for searching again "full text searchable" fields;
      you are not expected to provide the exact wordings to get a hit.
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

    <button style='margin-top: 12px;' class="btn btn-info" @click="matchQuery()">run match query</button>


  </div>
</template>

<script>
function _model_chp3_mq(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_mq_jsclient'
    },
    'es': {
      'codeLabel': 'es DSL query',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_mq_es'
    },
    'result': {
      'codeLabel': 'query result (JSON)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_mq_result'
    },
    'showResult': false,
    'esConfig': {  },
    getESConfig: function(_cfg) {
      return LectureUtil.cloneObject(_cfg);
    }
  };
}
// model instance

module.exports = {
  name: 'match_query',
  data: function() {
    return new _model_chp3_mq(this);
  },
  mounted: function() {
    let _instance=this;
    // load esConfig
    LectureUtil.getESConfig().then(function(_data) {
      _instance.esConfig['cfg']=_data;
    });
    // load js and dsl file
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/match_query.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.jsClient.codeContent = _data;
          _instance.jsClient.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/query_match_query.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.es.codeContent = _data;
          _instance.es.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );

  },
  methods: {
    matchQuery: function() {
      let _instance=this;
      getESClient(_instance.getESConfig(_instance.esConfig['cfg'])).search({
        "index": "jeymart_product",
        "type": "doc",
        "body": {
          "query": {
            "match": {
              "description": {
                "query": "PhOne"
              }
            }
          }
        }
      }).then(function(_resp) {
        var _v = prettyJson(JSON.stringify(_resp));
        _instance.result.codeContent = _v;
        _instance.result.codeContentBeautified = LectureUtil.jsCodeBeautifier(_v);
        _instance.showResult=true;
      }, function(_err) {
        _instance.result.codeContent = _err;
        _instance.result.codeContentBeautified = _err;
        _instance.showResult=true;
      });

    }
  }
}

</script>
