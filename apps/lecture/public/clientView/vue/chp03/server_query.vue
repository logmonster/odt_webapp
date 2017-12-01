<template>
  <div class="lecture-chapter-container">
    <h3>Server side term and match query:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      Server side code on "term" and "match" query.
    </p>

    <!--i class="fa fa-database" aria-hidden="true"></i>
    <i class="fa fa-file-o" aria-hidden="true"></i>
    <i class="fa fa-file-text-o" aria-hidden="true"></i>
    <i class="fa fa-edit" aria-hidden="true"></i>
    <i class="fa fa-file-text-o" aria-hidden="true"></i>
    <i class="fa fa-refresh" aria-hidden="true"></i>
    <i class="fa fa-trash-o" aria-hidden="true"></i-->

    <!--i class="fa fa-question-circle-o" aria-hidden="true"></i>
    <i class="fa fa-question-circle" aria-hidden="true"></i-->

    <lecture-server-side-snippet
      :config="getSTermQueryConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSMatchQueryConfig()"
      ></lecture-server-side-snippet>

    <!--button style='margin-top: 12px;' class="btn btn-info" @click="removeDoc()">remove document</button-->
  </div>
</template>

<script>
function _model_chp3_server(_instance) {
  return {
    /*
    '_instance': _instance
    'esConfig': {  },
    getESConfig: function(_cfg) {
      return LectureUtil.cloneObject(_cfg);
    }
    */
  };
}
// model instance

module.exports = {
  name: 'server_side_code',
  data: function() {
    return new _model_chp3_server(this);
  },
  mounted: function() {
    let _instance=this;
    // load esConfig
    /*
    LectureUtil.getESConfig().then(function(_data) {
      _instance.esConfig['cfg']=_data;
    });
    */
  },
  methods: {
    getSTermQueryConfig: function() {
      return {
        'iconClass': 'fa-question-circle',
        'title': 'term query',
        'codeFile': '/clientView/samples/chp03/server_query.code'
      }
    },
    getSMatchQueryConfig: function() {
      return {
        'iconClass': 'fa-question-circle-o',
        'title': 'match query',
        'codeFile': '/clientView/samples/chp03/server_query.code'
      }
    }

  }
}

</script>
