<template>
  <div class="fixed-bottom">
    <!-- toggle icon -->
    <span @click='togglePanelVisibility()'
      data-toggle="tooltip"
      data-placement="top"
      title='"spy panel" - toggle to see the various queries on this page'
      class='spy-panel-icon'
      :class="{ 'showing-inline': !isPanelShown, 'hiding': isPanelShown }">
      <i class="fa fa-arrow-circle-up pointer" aria-hidden="true"></i></span>
    <span @click='togglePanelVisibility()'
      data-toggle="tooltip"
      data-placement="top"
      title='"spy panel" - toggle to see the various queries on this page'
      class='spy-panel-icon'
      :class="{ 'showing-inline': isPanelShown, 'hiding': !isPanelShown }" >
      <i class="fa fa-arrow-circle-down pointer" aria-hidden="true"></i></span>
    <span @click='togglePanelVisibility()'
      class='pointer'
      style="padding-left: 6px; background-color: white;">
      "spy panel" - toggle to see the various queries on this page</span>

    <!-- actual display area for queries / tutorials -->
    <div class='spy-panel-container'
      :class="{ 'showing': isPanelShown, 'hiding': !isPanelShown }">

      <div class="spy-panel-inner-container">
        <div v-html='viewFileContent' ></div>

        <!-- check on the code for multiple router-view(s) displays @router.vue -->
        <!-- router-view name='rvSpyPanel'></router-view -->
      </div>

    </div>
  </div>
</template>

<script>
// model
function _model_shop_spy_panel(_instance) {
  return {
    'instance': _instance,
    'isPanelShown': false,
    'viewFileContent': ''
  };
}

module.exports = {
  'name': 'shop-spy-panel',
  data: function() {
    return new _model_shop_spy_panel(this);
  },
  watch: {
    viewFile: function(_newValue) {
      let _instance=this;
      window.ajaxUtil.GET(
        _newValue,
        {},
        function(_data, _status, _jqXHR) {
          _instance.viewFileContent=_data;
        },
        function(_jqXHR, _status, _err) {
          _instance.viewFileContent=_err;
        }
      );
    }
  },
  mounted: function() {
    let _instance = this;
    // endable tooltip (need to uncomment the shop.html entry for popper.js)
    //$('.spy-panel-icon').tooltip();

    // load the given viewFile (containing the code samples for the relevant page)
    window.ajaxUtil.GET(
      this.viewFile,
      {},
      function(_data, _status, _jqXHR) {
        _instance.viewFileContent=_data;
      },
      function(_jqXHR, _status, _err) {
        _instance.viewFileContent=_err;
      }
    );

  },
  props: [ 'viewFile' ],
  methods: {
    /*
     *  toggle the visibility of the spy panel
     */
    togglePanelVisibility: function() {
      this.isPanelShown = !this.isPanelShown;
    }
  }
};
</script>
