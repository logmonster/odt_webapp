<style></style>

<template>
  <div style="padding-left: 12px; padding-top: 12px;">
    <div class="no-wrap-horizontal-scroll-container">
      <div v-for="(_stat, _i) in chpStatus" :key="_stat.id" style="margin-top: 4px;">
        <!-- caret icons -->
        <div @click='toggleMenuItemsVisibility(_stat.id)' class="pointer">
          <i class="fa fa-caret-right" aria-hidden="true"
            :class="{ 'showing-inline': !_stat.showSubItems, 'hiding': _stat.showSubItems }" ></i>
          <i class="fa fa-caret-down" aria-hidden="true"
            :class="{ 'showing-inline': _stat.showSubItems, 'hiding': !_stat.showSubItems }" ></i>
          <span>{{_stat.label}}</span>
        </div>
        <!-- sub items -->
        <div :class="{ 'showing': _stat.showSubItems, 'hiding': !_stat.showSubItems }">
          <div v-for="(_item, _j) in _stat.items" :key="_stat.id+'-'+_item.id" class="pointer">
            <i class="fa  lecture-sidemenu-subitem lecture-sidemenu-subitem-icon"
              :class="{ 'fa-circle-o': !_item.selected, 'fa-circle': _item.selected }"
              aria-hidden="true" ></i>
            <span @click="updateRouterView(_stat, _item, _item.view)" class="lecture-sidemenu-subitem-label">
              {{_item.label}}</span>
          </div>
        </div>
      </div>  <!-- end of chpStatus items -->
    </div>
    <!-- Test on Parent Child interaction through props and events
    {{pickedChapter}} > {{pickedItemId}}
    <button @click='testNotifyParent("chapter03", $event)' class='btn btn-secondary'>change to chapter03 > 99</button>
    -->
  </div>
</template>

<script>

// utility method to change the icon for selected menuItem
function _updateSelectedMenuItem(_chpStatus, _item, _model) {
  // check if the _model is there or not...
  if (_model) {
    for (var _i=0; _i<_model.chpStatus.length; _i++) {
      var _curItem = _model.chpStatus[_i];
      // menuItem(s)
      for (var _j=0; _j<_curItem['items'].length; _j++) {
        var _curMenuItem = _curItem['items'][_j];

        if (_curItem['id'] == _chpStatus['id'] && (_curMenuItem['id']==_item['id'])) {
          _curMenuItem['selected'] = true;
        } else {
          _curMenuItem['selected'] = false;
        }
      }
    } // end -- for (chpStatus.length)
  }
};

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
    updateRouterView: (_chpStatus, _item, _view) => {
      _updateSelectedMenuItem(_chpStatus, _item, _model);
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
          { id: '__1', label: 'query by eventHandler example', view: '/chp02/query_by_event_handler', selected: false },
          { id: '__2', label: 'query by promise example', view: '/chp02/query_by_promise', selected: false }
        ]
      },
      {
        id: '__chp03',
        label: 'chapter 3',
        showSubItems: false,
        items: [
          { id: '__1', label: 'item a', selected: false },
          { id: '__2', label: 'item b', selected: false }
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
  mounted: () => {
    Vue.$on('getStartedFromHelpComponent', function() {
      // picked the first example...
      if (_model) {
        let _1chpStatus = _model.chpStatus[0];
        let _1menuItem = _1chpStatus.items[0];
        _updateSelectedMenuItem(_1chpStatus, _1menuItem, _model);
      }
    });
  },
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
