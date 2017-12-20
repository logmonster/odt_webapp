<template>
  <div>
    hi there
    <!--{{$route.params.catList}}<br/>
    {{$route.params.brandList}}<br/>
    {{$route.params.ratingList}}<br/>-->
    {{facets['category']}}<br/>
    {{facets['brand']}}<br/>
    {{facets['rating']}}<br/>

    # hi there $
  </div>
</template>

<script>
function _model_shop_landing_listing(_inst) {
  return {
    'instance': _inst,

    'facets': {
      'category': 'all',
      'brand': 'all',
      'rating': -1
    },

    'dataListing': [],

    'pagination': {
      'page': 0,
      'pageSize': 10
    }
  };
} // model

module.exports={
  name: 'shop_landing_listing',
  data: function() {
    return new _model_shop_landing_listing(this);
  },
  props: [],
  watch: {
    $route: function(_newValue) {
      if (_newValue) {
        if (_newValue.params.catList) {
          this.facets['category']=_newValue.params.catList;
        }
        if (_newValue.params.brandList) {
          this.facets['brand']=_newValue.params.brandList;
        }
        if (_newValue.params.ratingList) {
          this.facets['rating']=_newValue.params.ratingList;
        }
        // ask for updated data (DAO)
        this.getListingDataByRouteParams();
      } // end -- if (_newValue is valid)
    }
  },
  mounted: function() {
    let _instance=this;
    /*
     *  1st time route params matching; subsequent changes on the $route object
     *  is reflected by "watch" lifecycle hook
     */
    if (this.$route.params) {
      let _r=this.$route.params;

      if (_r.catList) {
        this.facets['category']=_r.catList;
      }
      if (_r.brandList) {
        this.facets['brand']=_r.brandList;
      }
      if (_r.ratingList) {
        this.facets['rating']=_r.ratingList;
      }
      // ask for updated data (DAO)
      this.getListingDataByRouteParams();
    } // end -- if ($route.params valid)

  },
  methods: {

    getListingDataByRouteParams: function() {
      window.Vue.$emit('getListingDataByRouteParams', {
        'categoryList': this.facets.category,
        'brandList': this.facets.brand,
        'ratingList': this.facets.rating,
        
        'pagination': this.pagination,
        'callback': this.setListingData
      });
    },
    setListingData: function(_data) {
      this.dataListing = _data;
      console.log(_data);
    }

  }
};
</script>
