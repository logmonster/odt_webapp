<style></style>

<template>
  <div class="code-snippet-bottom-margin">
    <div class='text-right '
      :class="{ 'rounded-top': codeContentVisible, 'rounded': !codeContentVisible, 'code-snippet-header': 'result'!=snippetType, 'code-snippet-header-result': 'result'==snippetType }"
      @click="toggleCodeContentVisibility()" >
      <span class="pull-left">
        <i class="fa pointer" aria-hidden="true"
          :class="{ 'fa-caret-down': codeContentVisible, 'fa-caret-right': !codeContentVisible }"></i>
      </span>
      <span >{{codeLabel}}</span>
      <span @click.prevent.stop="copyCodeContentToClipboard()">
        &nbsp;
        <i class="fa fa-file-text-o pointer" aria-hidden="true"></i>
      </span>
    </div>
    <textarea
      :id="getCodeId"
      class="code-snippet-content rounded-bottom hiding"
      readonly >{{codeContent}}</textarea>
    <div
      :class="{ 'showing': codeContentVisible, 'hiding': !codeContentVisible, 'code-snippet-content': 'result'!=snippetType, 'code-snippet-content-result': 'result'==snippetType }"
      class="rounded-bottom"
      style="overflow: auto;">
      <div v-html="codeContentBeautified"></div>
    </div>

  </div>
</template>

<script>
// OBSOLETE: store the VueComponent instance in the model for data access later on
// to access a field => _model._instance.{field_name}
function _model_cnc(_instance) {
  // result(s) don't need to be shown before running the query ...
  //var _visible = ('result' == _instance.snippetType)?false:true;
  return {
    codeContentVisible: true,
    "_instance": _instance
  };
}
var _model;

module.exports = {
  name: 'code-snippet-component',
  /*
   *  tricky => you need to use "function" instead of "() => "; if not,
   *  "this" would be the window object instead of the VueComponent
   */
  data: function() {
    //if (!_model) _model = new _model_cnc(this);
    //return _model;
    return new _model_cnc(this);
  },
  computed: {
    // create certain randomness to the div's id
    getCodeId: function() {
      /*
      if (!_model._instance.hasOwnProperty('_idGenerated')) {
        _model._instance._idGenerated = _model._instance.codeId+
          Math.round(Math.random()*10000);
      }
      return _model._instance._idGenerated;
      */
      this._idGenerated = this.codeId+Math.round(Math.random()*10000);
      return this._idGenerated;
    }
  },
  props: [ 'codeLabel', 'codeContent', 'codeId', 'codeContentBeautified', 'snippetType' ],
  methods: {
    // copy content to clipboard
    copyCodeContentToClipboard: function() {
      // "this" sometimes... is undefined....???
      if (this && this._idGenerated) {
        LectureUtil.htmlCopy2Clipboard(this._idGenerated, true);
      } else {
        console.log('***damn missing this reference???');
      }
    },
    // toggle the codeContent's visibility
    toggleCodeContentVisibility: function () {
      if (this) {
        this.codeContentVisible = !this.codeContentVisible;
      }
    }
  }
};
</script>
