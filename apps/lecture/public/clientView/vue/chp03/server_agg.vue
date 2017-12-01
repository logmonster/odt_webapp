<template>
  <div class="lecture-chapter-container">
    <h3>Server side aggregations:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      Server side code on the aggregations operations.
    </p>

    <lecture-server-side-snippet
      :config="getSTermsAggConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSMultiAggConfig()"
      ></lecture-server-side-snippet>

    <!--button style='margin-top: 12px;' class="btn btn-info" @click="removeDoc()">remove document</button-->
  </div>
</template>

<script>
function _model_chp3_server_aggs(_instance) {
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
  name: 'server_side_code_aggs',
  data: function() {
    return new _model_chp3_server_aggs(this);
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
    getSTermsAggConfig: function() {
      return {
        'iconClass': 'fa-folder-open',
        'title': 'terms aggregation',
        'codeFile': '/clientView/samples/chp03/server_agg.code'
      }
    },
    getSMultiAggConfig: function() {
      return {
        'iconClass': 'fa-folder-open-o',
        'title': 'multiple aggregations (min, max, stats)',
        'codeFile': '/clientView/samples/chp03/server_agg.code'
      }
    }
  }
}

</script>
