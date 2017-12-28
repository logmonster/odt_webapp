<template>
  <div>
    <!-- header -->
    <div class="shop-listing-header-container">
      <span class="shop-listing-header-label">Filters:&nbsp;&nbsp;</span>
      <span v-for='(_item, _idx) in facets.category'
        :style='getCssStyleForPills()'
        @click='handlePillClick(_item, "category")'
        class="pointer badge badge-pill light-blue shop-listing-header-pill">
        {{_item}} <i class="fa fa-close" aria-hidden="true"></i></span>
      <span v-for='(_item, _idx) in facets.brand'
        :style='getCssStyleForPills()'
        @click='handlePillClick(_item, "brand")'
        class="pointer badge badge-pill green shop-listing-header-pill">
        {{_item}} <i class="fa fa-close" aria-hidden="true"></i></span>

      <!-- hits -->
      <div class="pull-right">
        <span class='shop-listing-header-count'>Hits: </span>
        <span class='shop-listing-header-count-label'>
          {{getHitsCount()}}
        </span>
        &nbsp;
        <span class='shop-listing-header-count-label'>
          {{getPageNumForDisplay()}}
          <!--(page {{pagination.page+1}})-->
        </span>
      </div>
    </div>

    <!-- listing -->
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-sm-6 col-md-3'
          style='padding: 2px;'
          v-for="(_hit, _idx) in getHitsList()" >
          <shop-product-item-small
            style="margin-bottom: 8px;"
            :item="_hit"  ></shop-product-item-small>

        </div>
      </div>
    </div>

    <!-- pagination controls -->
    <div
      :class='getCssForPagination()'
      class='shop-listing-pagination-container text-center'>
      <button type='button'
        @click='handlePrevClick()'
        :style='getCssStyleForPills()'
        :disabled='isPreviousButtonDisabled()'
        class="btn btn-outline-info waves-effect" >
        previous</button>
      <button type='button'
        @click='handleNextClick()'
        :style='getCssStyleForPills()'
        :disabled='isNextButtonDisabled()'
        class="btn btn-outline-success waves-effect" >
        next page</button>
    </div>

  </div>
</template>

<script>
function _model_shop_landing_listing(_inst) {
  return {
    'instance': _inst,

    'facets': {
      'category': [],
      'brand': [],
      'rating': -1
    },

    'dataListing': [],

    'pagination': {
      'page': 0,
      'pageSize': 16
    },

    'searchbarText': ''
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
        if (_newValue.params.pagination) {
          this.pagination=_newValue.params.pagination;
        }
        if (_newValue.params.searchbarText) {
          this.searchbarText=_newValue.params.searchbarText;
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
      if (_r.pagination) {
        this.pagination=_r.pagination;
      }
      if (_r.searchbarText) {
        this.searchbarText=_r.searchbarText;
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
        'searchbarText': this.searchbarText,

        'pagination': this.pagination,
        'callback': this.setListingData
      });
    },
    setListingData: function(_data) {
      this.dataListing = _data['responses'][0];
    },

    /*
     *  for some css (from mdbootstrap); you need to override
     *  the "style" directly instead of using a css class
     */
    getCssStyleForPills: function() {
      return {
        'border-radius': '8rem',
        'font-size': '14px',
        'font-weight': 300,
        'padding-left': '12px',
        'padding-right': '12px',
        'padding-top': '6px',
        'padding-bottom': '6px',
        'margin-bottom': '2px;'
      };
    },

    getCssForPagination: function() {
      let _css={};
      if (this.getHitsList().length>0) {
        _css['showing']=true;
        _css['hiding']=false;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    isPreviousButtonDisabled: function() {
      let _disabled=false;
      if (this.pagination.page==0) {
        _disabled=true;
      }
      return _disabled;
    },
    isNextButtonDisabled: function() {
      return !this.hasNextPage();
    },

    hasNextPage: function() {
      let _hasNext=true;
      let _total = this.getHitsCount();
      let _pageTotal = (this.pagination.page+1) * this.pagination.pageSize;

      if (_pageTotal>=_total) {
        _hasNext = false;
      }
      return _hasNext;
    },

    getHitsCount: function() {
      let _cnt=0;
      if (this.dataListing && this.dataListing['hits'] && this.dataListing['hits']['total']) {
        _cnt=parseInt(this.dataListing['hits']['total'], 10);
      }
      return _cnt;
    },

    getPageNumForDisplay: function() {
      if (this.getHitsCount()>0) {
        return "(page "+(this.pagination.page+1)+")";
      } else {
        return "";
      }
    },

    getHitsList: function() {
      let _d=[];
      if (this.dataListing) {
        if (this.dataListing['hits'] && this.dataListing['hits']['hits']) {
          _d=this.dataListing['hits']['hits'];
        }
      }
      return _d;
    },

    handlePillClick: function(_pillValue, _facetType) {
      // update the filter and get refreshed data for listing
      if ('category'==_facetType) {
        window.collectionUtil.removeElementFromArray(
          _pillValue, this.facets['category']);

      } else if ('brand'==_facetType) {
        window.collectionUtil.removeElementFromArray(
          _pillValue, this.facets['brand']);
      } // end -- if (_facetType)
      this.emitLandingListingPageChangeEvent();
    },

    handlePrevClick: function() {
      if (this.pagination.page>0) {
        this.pagination.page=this.pagination.page-1;
        this.emitLandingListingPageChangeEvent();
      }
    },
    handleNextClick: function() {
      if (this.hasNextPage()) {
        this.pagination.page=this.pagination.page+1;
        this.emitLandingListingPageChangeEvent();
      }
    },
    emitLandingListingPageChangeEvent: function() {
      window.Vue.$emit('getListingDataByRouteParams', {
        'from': 'shop_landing_listing',
        'categoryList': this.facets['category'],
        'brandList': this.facets['brand'],
        'ratingList': this.facets['rating'],
        'searchbarText': this.searchbarText,
        'pagination': this.pagination,
        'callback': this.setListingData
      });
    }

  }
};
</script>
