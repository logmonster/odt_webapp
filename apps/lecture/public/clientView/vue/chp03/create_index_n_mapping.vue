<style></style>

<template>
  <div class="lecture-chapter-container">
    <h3>Create Index with Mapping:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      It is a good practice to supply the mapping configurations during index creation.
      Although you can also first create and index, then add back the mapping and/or
      setting configurations just before indexing a document.
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
function _model_chp3_cim(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_cim_jsclient'
    },
    'es': {
      'codeLabel': 'es DSL query',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_cim_es'
    },
    'result': {
      'codeLabel': 'query result (JSON)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_cim_result'
    },
    'showResult': false,
    'esConfig': {  },
    getESConfig: function(_cfg) {
      // make a clone... jesus...
      // https://github.com/elastic/elasticsearch-js/issues/33
      return LectureUtil.cloneObject(_cfg);
    }
    //, es (code as well), js_server (code if necessary)
  };
}
// model instance

module.exports = {
  name: 'query_by_event_handler',
  data: function() {
    return new _model_chp3_cim(this);
  },
  mounted: function() {
    let _instance=this;
    // load esConfig
    LectureUtil.getESConfig().then(function(_data) {
      _instance.esConfig['cfg']=_data;
    });
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/create_index_n_mapping.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.jsClient.codeContent = _data;
          _instance.jsClient.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );  // end -- loadResourceFile
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/query_dsl_cim.code',
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
        getESClient(_instance.getESConfig(_instance.esConfig['cfg'])).indices.create({
          "index": "jeymart_product",
          "body": {
            "mappings": {
              "doc": {
                "properties": {
                  "category": {
                    "type": "text",
                    "fields": {
                      "keyword": {
                        "type": "keyword"
                      }
                    }
                  },
                  "description": {
                    "type": "text"
                  },
                  "stock_code": {
                    "type": "keyword"
                  },
                  "price": {
                    "type": "float"
                  }
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
          // bug for 14.x (submitted PR already)
          if (_err &&
            _err.message &&
            _err.message.message &&
            "Connection Failure"==_err.message.message) {

            _instance.result.codeContent = "index already existed exception";
            _instance.result.codeContentBeautified = "index already existed exception";
            _instance.showResult=true;

          } else {
            _instance.result.codeContent = _err;
            _instance.result.codeContentBeautified = _err;
            _instance.showResult=true;
          }
        });
      }
    } // end -- runQuery
  }
};

</script>
