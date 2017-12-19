<template>
  <div>
    <div class="facets-control-header pointer"
      @click="toggleItemsVisibility()">
      {{label}}
    </div>
    <!-- items (button mode) -->
    <div v-if="mode=='button'">
      <div v-for="(_item, _idx) in data"
        @click='handleItemClick(_item["key"])'
        :class='getFacetsItemCss(_item)'
        class=" pointer text-truncate">
        {{_item['key']}}
        <span class="pull-right badge badge-pill green badge-rounded">
          {{_item['doc_count']}}</span>
      </div>
    </div>

<!-- TODO items (checkbox mode) -->
    <div v-if="mode=='checkbox'">
      checkbox
    </div>

  </div>
</template>

<script>
// model
function _model_shop_facets_control(_inst) {
  return {
    'instance': _inst,

    'css': {
      'canShowItems': true
    },

    'chosenItemList': []
  };
}

module.exports = {
  name: 'shop_facets_control',
  data: function() {
    return new _model_shop_facets_control(this);
  },
  // mode: button (click and go), checkbox (multi-check and go)
  props: [ 'label', 'mode', 'data' ],
  methods: {
    /*
     *  method to toggle the visiblility of the facets item list
     */
    toggleItemsVisibility: function() {
      this.css.canShowItems = !this.css.canShowItems;
    },

    /*
     *  return the css class required for the facets item list
     */
    getFacetsItemCss: function(_item) {
      let _css = {
        'showing': this.css.canShowItems,
        'hiding': !this.css.canShowItems,
        'facets-control-item-chosen': false,
        'facets-control-item': true
      };
      let _idx=0;
      for (; _idx<this.chosenItemList.length; _idx++) {
        if (_item.key == this.chosenItemList[_idx]) {
          _css['facets-control-item-chosen']=true;
          _css['facets-control-item']=false;
        }
      }
      return _css;
    },

    /*
     *  handle the click on item(s); in actual, updates the chosenItemList
     */
    handleItemClick: function(_key) {
      let _idx_1 = 0;
      let _exists = false;

      // check if _key is within the chosenItemList
      for (; _idx_1<this.chosenItemList.length; _idx_1++) {
        if (_key == this.chosenItemList[_idx_1]) {
          _exists = true;
          break;
        }
      }
      // update the chosenItemList
      // * button mode => only "1" item could be chosen
      if ('button' == this.mode) {
        this.chosenItemList = [];
        if (!_exists) {
          this.chosenItemList.push(_key);
        }
      } else {
        // * checkbox mode, multiple item(s) could be chosen
        if (_exists) {
          this.chosenItemList.splice(_idx_1, 1);
        } else {
          this.chosenItemList.push(_key);
        }
      } // end -- if (mode = button / checkbox)
      /*
       *  emit event for router change,
       *  a "random" hash MUST be provided so that the router-view would be
       *  refreshed everytime (if not... vue.js will re-use the existing
       *  components)
       */
      let _eventObject = {
        'view': 'listing/:hash',
        'hash': parseInt(new Date().getTime()*Math.random(), 10)
      };
      if (this.label == 'categories') {
        _eventObject['catList'] = this.chosenItemList;
      } else if (this.label == 'brands') {
        _eventObject['brandList'] = this.chosenItemList;
      } else if (this.label == 'ratings') {
        _eventObject['ratingList'] = this.chosenItemList;
      }
      window.Vue.$emit('changeRouterView', _eventObject);
    }

  }
};
</script>
