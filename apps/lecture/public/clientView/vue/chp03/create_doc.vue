<template>
  <div class="lecture-chapter-container">
    <h3>Create document:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      Create differs from Index by checking if any document exists with the
      provided document_id; if exist returns Exception else inserts the
      document in the specifed index.
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

    <button style='margin-top: 12px;' class="btn btn-info" @click="createDoc()">create document</button>


  </div>
</template>

<script>
function _model_chp3_cdoc(_instance) {
  return {
    '_instance': _instance,
    'jsClient': {
      'codeLabel': 'javascript (client)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_cdoc_jsclient'
    },
    'es': {
      'codeLabel': 'es DSL query',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_cdoc_es'
    },
    'result': {
      'codeLabel': 'query result (JSON)',
      'codeContent': '',
      'codeContentBeautified': '',
      'codeId': '_model_chp3_cdoc_result'
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
  name: 'create_doc',
  data: function() {
    return new _model_chp3_cdoc(this);
  },
  mounted: function() {
    let _instance=this;
    // load esConfig
    LectureUtil.getESConfig().then(function(_data) {
      _instance.esConfig['cfg']=_data;
    });
    // load js and dsl file
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/create_doc.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.jsClient.codeContent = _data;
          _instance.jsClient.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );
    LectureUtil.loadResourceFile(
      '/clientView/samples/chp03/query_create_doc.code',
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.es.codeContent = _data;
          _instance.es.codeContentBeautified = LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );

  },
  methods: {
    createDoc: function() {
      let _instance=this;
      getESClient(_instance.getESConfig(_instance.esConfig['cfg'])).create({
        "index": "jeymart_product",
        "type": "doc",
        "id": "testing_create_doc_1",
        "body": {
          "category": [
            "phones",
            "electronics"
          ],
          "description": "Tired of using smart phones? Try MetaRola ringer phones.",
          "price": 399,
          "stock_code": "rng_ph_12900"
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

          _instance.result.codeContent = "document already exists";
          _instance.result.codeContentBeautified = "document already exists";
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
