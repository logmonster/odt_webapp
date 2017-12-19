<template>
  <div class="product-item-sm-container">
    <!--:id='generatedImgId'-->
    <img :id='getImgId()'
      :src='getImageUrl()'
      :class='getImgCss()'
      style="width: calc(100%);"  >
    <div class='text-truncate'>
      {{item["_source"]["t_description"]}}</div>
    <div>
      {{item["_source"]["hf_price_suggested"]}}
    </div>
  </div>
</template>

<script>
function _model_shop_product_item_sm(_inst) {
  return {
    'instance': _inst,
    'imgId': ''
  };
} // end -- model

module.exports = {
  name: 'shop_product_item_sm',
  data: function() {
    return new _model_shop_product_item_sm(this);
  },
  props: [ 'item' ],
  /*computed: {
    *
     *  a generated id (sort of hash) for the image component
     *
    generatedImgId: function() {
      return 'img_'+parseInt(new Date().getTime()*Math.random(), 10);
    }*
  },*/
  methods: {
    /*
     *  create the image component id (not using computed value)
     */
    getImgId: function() {
      if (!this.imgId || this.imgId=='') {
        this.imgId='img_'+parseInt(new Date().getTime()*Math.random(), 10);
      }
      return this.imgId;
    },

    /*
     *  get the image
     */
    getImageUrl: function() {
      return '/image/items/'+this.item["_source"]["k_photo"];
    },

    /*
     *  [testing] update the image component's width:height to 4:3 ratio
     */
    getImgCss: function() {
      let _jImg=jQuery('#'+this.getImgId());

      if (_jImg.length>0) {
        let _width=parseInt(_jImg.css('width'), 10);

        if (_width>0) {
          // 4:3 ratio
          let _height=parseInt(_width*3/4, 10);

          _jImg.css('height', _height+'px');
        } // end -- if (_width is > 0)
      } // end -- if (jQuery object is valid)
      // return a dummy object...
      return {};
    }

// TODO: try https://jsfiddle.net/hr77p7qb/3/ approach instead    

  }
};
</script>
