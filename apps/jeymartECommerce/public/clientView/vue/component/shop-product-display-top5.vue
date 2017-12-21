<template>
  <div>
    <span class="product-t6-label">{{getCategoryName()}}</span>&nbsp;
    <a href='javascript:void(0);' @click='handleMoreClick()'>
      <span class='product-t6-more'>
        more...</span>
    </a>

    <div class='container-fluid'>
      <div class='row'>
        <div class='col-sm-6 col-md-3'
          style='padding: 2px;'
          v-for="(_hit, _idx) in getTop6Hits()" >
          <!--{{_hit['_source']['t_description']}}-->
          <shop-product-item-small
            style="margin-bottom: 8px;"
            :item="_hit"  ></shop-product-item-small>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
function _model_shop_product_top5(_inst) {
  return {
    'instance': _inst
  };
} // end -- model

module.exports={
  name: 'shop_product_top5',
  data: function() {
    return new _model_shop_product_top5(this);
  },
  props: [ 'catObject' ],
  methods: {

    getCategoryName: function() {
      let _n='';
      if (this.catObject) {
        _n=this.catObject['key'];
      }
      return _n;
    },
    getTop6Hits: function() {
      let _d=[];
      if (this.catObject) {
        _d=this.catObject['_top6']['hits']['hits'];
      }
      return _d;
    },

    handleMoreClick: function() {
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
      _eventObject['catList'] = [ this.catObject['key'] ];
      // indicate it is from "shop_product_top5"
      _eventObject['from'] = 'shop_product_top5';

      window.Vue.$emit('changeRouterViewToListing', _eventObject);
    }

  }
};
</script>
