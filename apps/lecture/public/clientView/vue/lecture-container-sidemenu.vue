<style></style>

<template>
  <div style="padding-left: 12px; padding-top: 12px;">
    <div class="no-wrap-horizontal-scroll-container">
      <div v-for="(_stat, _i) in chpStatus" :key="_stat.id" style="margin-top: 4px;">
        <!-- caret icons -->
        <i class="fa fa-caret-right" aria-hidden="true"
          :class="{ 'showing-inline': !_stat.showSubItems, 'hiding': _stat.showSubItems }"
          @click='toggleMenuItemsVisibility(_stat.id)' ></i>
        <i class="fa fa-caret-down" aria-hidden="true"
          :class="{ 'showing-inline': _stat.showSubItems, 'hiding': !_stat.showSubItems }"
          @click='toggleMenuItemsVisibility(_stat.id)' ></i>
        <span>{{_stat.label}}</span>
        <!-- sub items -->
        <div :class="{ 'showing': _stat.showSubItems, 'hiding': !_stat.showSubItems }">
          <div v-for="(_item, _j) in _stat.items" :key="_stat.id+'-'+_item.id">
            <i class="fa fa-circle-o lecture-sidemenu-subitem lecture-sidemenu-subitem-icon" aria-hidden="true" ></i>
            <span @click="updateRouterView(_item.view)" class="lecture-sidemenu-subitem-label">
              {{_item.label}}</span>
          </div>
        </div>
      </div>  <!-- end of chpStatus items -->
    </div>
    <!--
    {{pickedChapter}} > {{pickedItemId}}
    <button @click='testNotifyParent("chapter03", $event)' class='btn btn-secondary'>change to chapter03 > 99</button>
    -->
  </div>
</template>

<script>
// model
function _model_lcs() {
  return {
    // helper method to toggle the "showing" status of the chpStatus map
    toggleChpStatus: (_model, _chp) => {
      if (!_model) return;

      _model.chpStatus.forEach(function(_e, _idx) {
        if (_e['id']==_chp) {
          _e['showSubItems']=!_e['showSubItems'];
        }
      });
    },
    updateRouterView: (_view) => {
      // # validation => check if the Route is declared???
      VueRouter.push({
        name: _view //, params: { 'key1': 'value1' }
      } //, onCompleteCallback, onAbortCallback
      );
    },
    // list of menu-item(s) and corresponding subItem(s)
    chpStatus: [
      {
        id: '__chp02',
        label: 'chapter 2',
        showSubItems: false,
        items: [
          { id: '__1', label: 'query by eventHandler example', view: '/chp02/query_by_event_handler' },
          { id: '__2', label: 'item 2' }
        ]
      },
      {
        id: '__chp03',
        label: 'chapter 3',
        showSubItems: false,
        items: [
          { id: '__1', label: 'item a' },
          { id: '__2', label: 'item b' }
        ]
      }
    ],
    itemStatus: {}
  };
};
var _model;

module.exports = {
  name: 'lecture-container-sidemenu',
  data: () => {
    if (!_model) {
      _model = new _model_lcs();
    }
    return _model;
  },
  props: [ 'pickedChapter', 'pickedItemId' ],
  methods: {
    // toggle the subItem(s) visibility
    toggleMenuItemsVisibility: (_chp) => {
      _model.toggleChpStatus(_model, _chp);
    },

    testNotifyParent: (_chp, _evt) => {
      Vue.$emit('testing', _chp, '99', _evt);
    }
  }
};
</script>
