<template>
  <div>
    <span class="product-t6-label">{{getCategoryName()}}</span>&nbsp;
    more <!-- similar to the linking of the shop-facets-control.vue -->
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-sm-6 col-md-2'
          v-for="(_hit, _idx) in getTop6Hits()" >

          {{_hit['_source']['t_description']}}

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
    }

  }
};
</script>
