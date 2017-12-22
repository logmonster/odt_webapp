<template>
  <div
    @click='handleItemClick()'
    class="product-item-sm-container pointer">
    <!--:id='generatedImgId'-->
    <img :id='getImgId()'
      :src='getImageUrl()'
      :class='getImgCss()'
      style="width: calc(100%);"  >

    <div
      :title='item["_source"]["t_description"]'
      class='text-truncate product-item-sm-label'>
      {{item["_source"]["t_description"]}}</div>

    <div class="product-itme-sm-sublabel">
      ${{ getSuggestedPrice(item) }}
    </div>
  </div>
</template>

<script>
function _model_shop_product_item_sm(_inst) {
  return {
    'instance': _inst,
    'imgId': '',
    'fakeIndicator': 1
  };
} // end -- model

module.exports = {
  name: 'shop_product_item_sm',
  data: function() {
    return new _model_shop_product_item_sm(this);
  },
  props: [ 'item' ],
  mounted: function() {
    let _instance = this;

    this.windowEventUtil = new window.windowEventUtil();
    this.windowEventUtil.registerEvent('resize', 'shop_product_item_sm', this.fakeUpdateModel);
  },
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
     *  a fake indicator to force vue to update the css methods;
     *  the tip is that the model associated with this component must be
     *  changed / updated, if not the css methods won't be re-triggered
     */
    fakeUpdateModel: function() {
      this.fakeIndicator = parseInt(new Date().getTime()*Math.random(), 10);
    },

    getSuggestedPrice: function(_item) {
      let _price=0.000;

      if (_item && _item['_source'] && _item['_source']['hf_price_suggested']) {
        let _val=_item["_source"]["hf_price_suggested"];
        if (_val) {
          _price=_val.toFixed(3)
        }
      }
      return _price;
    },

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
      let _c=this.fakeIndicator;
      return { _c: false };
    },

    handleItemClick: function() {
// TODO:
      console.log('## fwd to product-item-details page '+this.item['_source']['t_description']);
    }


  }
};
</script>
