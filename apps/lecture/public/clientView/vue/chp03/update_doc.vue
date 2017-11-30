<template>
  <div class="lecture-chapter-container">
    <h3>Update document:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      Update an existing document on a subset of fields only. <br></br>
      For example,the document consists of 100 fields, whilst the only field
      you need to update is the "mailing_address" field; instead of preparing
      the 100 fields, all you need is to provide the 1 and only 1
      "mailing_address" field.
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

    <button style='margin-top: 12px;' class="btn btn-info" @click="readDoc()">read/get document</button>


  </div>
</template>

<script>
function _model_chp3_udoc(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_udoc_jsclient'
    },
    'es': {
      'codeLabel': 'es DSL query',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_udoc_es'
    },
    'result': {
      'codeLabel': 'query result (JSON)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_udoc_result'
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
  name: 'update_doc',
  data: function() {
    return new _model_chp3_udoc(this);
  },
  mounted: function() {
    let _instance=this;
    // load esConfig
    LectureUtil.getESConfig().then(function(_data) {
      _instance.esConfig['cfg']=_data;
    });
    // load js and dsl file
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/update_doc.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.jsClient.codeContent = _data;
          _instance.jsClient.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/query_update_doc.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.es.codeContent = _data;
          _instance.es.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );

  },
  methods: {
    readDoc: function() {
      let _instance=this;
      getESClient(_instance.getESConfig(_instance.esConfig['cfg'])).update({
        "index": "jeymart_product",
        "type": "doc",
        "id": "testing_create_doc_1",
        "body": {
          "doc": {
            "description": "MetaRola is the best ringer phones ever~ Say no to smart phones.",
            "price": 409
          }
        }
      }).then(function(_resp) {
        var _v = prettyJson(JSON.stringify(_resp));
        _instance.result.codeContent = _v;
        _instance.result.codeContentBeautified = LectureUtil.jsCodeBeautifier(_v);
        _instance.showResult=true;
      }, function(_err) {
        if (_err &&
          _err.message &&
          _err.message.message &&
          "Connection Failure"==_err.message.message) {

          _instance.result.codeContent = "document not found";
          _instance.result.codeContentBeautified = "document not found";
          _instance.showResult=true;

        } else {
          _instance.result.codeContent = _err;
          _instance.result.codeContentBeautified = _err;
          _instance.showResult=true;
        }
      });

    }
  }
}

</script>
