<template>
  <div>
    <div v-for="(_cat, _idx) in getLandingInfoDataByCategories()">
      <shop-product-display-top5 :catObject='_cat' ></shop-product-display-top5>
    </div>
    <!--{{landingInfoData}} -->
  </div>
</template>

<script>
function _model_shop_landing_info(_inst) {
  return {
    'instance': _inst,
    'landingInfoData': ''
  };
}

module.exports={
  name: 'shop_landing_info',
  data: function() {
    return new _model_shop_landing_info(this);
  },
  props: [],
  mounted: function() {
    let _instance = this;

    // setup the init call for landing-info data
    setTimeout(function() {
      window.Vue.$emit('getLandingInfoData', {
        "callback": _instance.setLandingInfoData
      });
    }, 100);
  },
  methods: {
    /**
     *  callback to set back the data from the parent component
     *  again, it is adviced that the DAO related features should be
     *  grouped and controlled by parent component; child components mainly
     *  work on the given data for Visualization as well as basic component
     *  level controls
     */
    setLandingInfoData: function(_data) {
      this.landingInfoData = _data['responses'];
    },

    /*
     *  return the data list starting with the "_cats" aggs
     */
    getLandingInfoDataByCategories: function() {
      let _d=[];

      if (this.landingInfoData) {
        _d = this.landingInfoData[0]['aggregations']['_cats']['buckets'];
      }
      return _d;
    }


  }
};
</script>
