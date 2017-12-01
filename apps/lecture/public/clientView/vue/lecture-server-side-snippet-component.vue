<style></style>

<template>
  <div class="code-snippet-bottom-margin">
    <div class="container-fluid">
      <div class="row no-gutters">
        <div class="col-sm-2 col-md-2">
          <div class="server-code-snippet-icon-container text-center">
            <i aria-hidden="true"
              class="fa "
              :class="getIconClass"></i>
          </div>
        </div>
        <div class="col-sm-10 col-md-10 server-code-snippet-code-container">
          <div
            class="server-code-snippet-title-container pointer"
            @click.prevent.stop="toggleContentVisibility()">
            {{config.title}}</div>
          <!--textarea
            :id='getCodeId'
            style="width: calc(100%); height: 200px; border-top: 0px;"
            class='server-code-snippet-content-container'
            :class="{ 'showing': contentVisible, 'hiding': !contentVisible }"
            readonly >{{code}}</textarea-->
          <div
            :id='getCodeId'
            style="width: calc(100%); height: 200px; border-top: 0px; overflow: auto;"
            class='server-code-snippet-content-container'
            :class="{ 'showing': contentVisible, 'hiding': !contentVisible }" >
            <div v-html="codeBeautified"></div>
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
function _model_sssc(_instance) {
  return {
    contentVisible: false,
    code: '',
    codeBeautified: '',
    "_instance": _instance
  };
}
// model

module.exports = {
  name: 'server-side-code-snippet-component',
  data: function() {
    return new _model_sssc(this);
  },
  computed: {
    // create certain randomness to the div's id
    getCodeId: function() {
      this._idGenerated = this.codeId+Math.round(Math.random()*10000);
      return this._idGenerated;
    },
    // compute once for the css of the icon
    getIconClass: function() {
      if (this) {
        let _cssObj={};

        _cssObj[this.config.iconClass]=true;
        return _cssObj;
      }
      return '';
    }
  },
  mounted: function() {
    let _instance=this;
    // load js and dsl file
    LectureUtil.loadResourceFile(
      this.config.codeFile,
      function(_data, _status, _xhr) {
        if (_data && _instance) {
          _instance.code=_data;
          _instance.codeBeautified=LectureUtil.jsCodeBeautifier(_data);
        }
      }
    );
  },
  props: [ 'config' ],
  methods: {
    // copy content to clipboard
    /*copyCodeContentToClipboard: function() {
      // "this" sometimes... is undefined....???
      if (this && this._idGenerated) {
        LectureUtil.htmlCopy2Clipboard(this._idGenerated, true);
      } else {
        console.log('***damn missing this reference???');
      }
    },
    */
    // toggle the codeContent's visibility
    toggleContentVisibility: function () {
      if (this) {
        this.contentVisible = !this.contentVisible;
      }
    }
  }
}
</script>
