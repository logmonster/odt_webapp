<template>
  <div class="lecture-chapter-container">
    <h3>Server side CRUD:</h3>
    <p class="lead text-justify" style="font-size: 16px; margin-top: 8px;">
      Server side code on the CRUD operations.
    </p>

    <!--i class="fa fa-database" aria-hidden="true"></i>
    <i class="fa fa-file-o" aria-hidden="true"></i>
    <i class="fa fa-file-text-o" aria-hidden="true"></i>
    <i class="fa fa-edit" aria-hidden="true"></i>
    <i class="fa fa-file-text-o" aria-hidden="true"></i>
    <i class="fa fa-refresh" aria-hidden="true"></i>
    <i class="fa fa-trash-o" aria-hidden="true"></i-->

    <lecture-server-side-snippet
      :config="getSIndexConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSIndexIdConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSCreateConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSReadConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSUpdateConfig()"
      ></lecture-server-side-snippet>

    <lecture-server-side-snippet
      :config="getSDeleteConfig()"
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
    getSIndexConfig: function() {
      return {
        'iconClass': 'fa-file-o',
        'title': 'index a document (without document_id)',
        'codeFile': '/clientView/samples/chp03/server_index_without_id.code'
      }
    },

    getSIndexIdConfig: function() {
      return {
        'iconClass': 'fa-file-text-o',
        'title': 'index a document (with document_id)',
        'codeFile': '/clientView/samples/chp03/server_index_without_id.code'
      }
    },
    getSCreateConfig: function() {
      return {
        'iconClass': 'fa-edit',
        'title': 'create a document',
        'codeFile': '/clientView/samples/chp03/server_index_without_id.code'
      }
    },
    getSReadConfig: function() {
      return {
        'iconClass': 'fa-file-text-o',
        'title': 'read a document',
        'codeFile': '/clientView/samples/chp03/server_index_without_id.code'
      }
    },
    getSUpdateConfig: function() {
      return {
        'iconClass': 'fa-refresh',
        'title': 'update a document',
        'codeFile': '/clientView/samples/chp03/server_index_without_id.code'
      }
    },
    getSDeleteConfig: function() {
      return {
        'iconClass': 'fa-trash-o',
        'title': 'delete a document',
        'codeFile': '/clientView/samples/chp03/server_index_without_id.code'
      }
    }

  }
}

</script>
