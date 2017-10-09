<style></style>

<template>
  <div>
    <div class='text-right code-snippet-header'
      :class="{ 'rounded-top': codeContentVisible, 'rounded': !codeContentVisible }"
      @click="toggleCodeContentVisibility()" >
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
      :class="{ 'showing': codeContentVisible, 'hiding': !codeContentVisible }"
      class="code-snippet-content rounded-bottom"
      style="overflow: auto;">
      <div v-html="codeContentBeautified"></div>
    </div>



  </div>
</template>

<script>
// IMPORTANT: store the VueComponent instance in the model for data access later on
// to access a field => _model._instance.{field_name}
function _model_cnc(_instance) {
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
    if (!_model) _model = new _model_cnc(this);
    return _model;
  },
  computed: {
    // create certain randomness to the div's id
    getCodeId: () => {
      if (!_model._instance.hasOwnProperty('_idGenerated')) {
        _model._instance._idGenerated = _model._instance.codeId+
          Math.round(Math.random()*10000);
      }
      return _model._instance._idGenerated;
    }
  },
  props: [ 'codeLabel', 'codeContent', 'codeId', 'codeContentBeautified' ],
  methods: {
    // copy content to clipboard
    copyCodeContentToClipboard: () => {
      // "this" sometimes... is undefined....???
      LectureUtil.htmlCopy2Clipboard(_model._instance._idGenerated, true);
    },
    // toggle the codeContent's visibility
    toggleCodeContentVisibility: () => {
      if (_model) {
        _model.codeContentVisible = !_model.codeContentVisible;
      }
    }
  }
};
</script>
