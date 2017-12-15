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
      style="padding-left: 6px;">
      "spy panel" - toggle to see the various queries on this page</span>

    <!-- actual display area for queries / tutorials -->
    <div class='spy-panel-container'
      :class="{ 'showing': isPanelShown, 'hiding': !isPanelShown }">

      <div class="spy-panel-inner-container">
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
        yo man, the "spy panel" showing queries<p/>
      </div>

    </div>
  </div>
</template>

<script>
// model
function _model_shop_spy_panel(_instance) {
  return {
    'instance': _instance,
    'isPanelShown': false
  };
}

module.exports = {
  'name': 'shop-spy-panel',
  data: function() {
    return new _model_shop_spy_panel(this);
  },
  mounted: function() {
    // endable tooltip (need to uncomment the shop.html entry for popper.js)
    //$('.spy-panel-icon').tooltip();
  },
  props: [],
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
