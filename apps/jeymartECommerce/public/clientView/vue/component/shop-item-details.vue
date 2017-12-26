<template>
  <div>
    <div class="shop-item-details-container">
      <span class="shop-listing-header-label">Filters:&nbsp;&nbsp;</span>
      <span v-for='(_item, _idx) in dataFacets.category'
        :style='getCssStyleForPills()'
        @click='handlePillClick(_item, "category")'
        class=" badge badge-pill light-blue shop-listing-header-pill">
        {{_item}}</span>
      <span v-for='(_item, _idx) in dataFacets.brand'
        :style='getCssStyleForPills()'
        @click='handlePillClick(_item, "brand")'
        class=" badge badge-pill green shop-listing-header-pill">
        {{_item}}</span>

      <span
        :style='getCssStyleForPills()'
        @click='handleBackClick()'
        class="pull-right pointer badge badge-pill teal shop-listing-header-pill">
        back <i class="fa fa-caret-left" aria-hidden="true"></i></span>
    </div>

    <!-- details -->
    <div class='container-fluid'>
      <div class='row'>
        <!-- main photo -->
        <div class='col-sm-6 col-md-6'>
          <!--  style="width: calc(50%);" -->
          <div class="card">
            <!--Card image-->
            <div class="view overlay hm-white-light shop-item-details-img-container">
              <img :src='getImageUrl()' class='shop-item-details-img img-fluid'>
              <a href="javascript:void(0);">
                <!--  pattern-4 (make it blurrer) -->
                <div class="mask"></div>
              </a>
            </div>

            <!--Card content-->
            <div class="card-body shop-item-details-specification-container">
              <!--Title-->
              <h4 class="card-title shop-item-details-specification-label">specifications:</h4>
              <!--Text-->
              <p class="card-text">
                <div>
                  <span class='shop-item-details-spec-item-label'>
                    <i class="fa fa-tags" aria-hidden="true"></i>
                  </span>
                  &nbsp;
                  <span class='shop-item-details-spec-item-value text-truncate'>{{getDetailsByKey('s_brand_name')}}</span>
                </div>
                <div>
                  <span class='shop-item-details-spec-item-label'>
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                  </span>
                  &nbsp;
                  <span class='shop-item-details-spec-item-value text-truncate'>{{getDetailsByKey('t_description')}}</span>
                </div>
                <div>
                  <span class='shop-item-details-spec-item-label'>
                    <i class="fa fa-money" aria-hidden="true"></i>
                  </span>
                  &nbsp;
                  <span class='shop-item-details-spec-item-value'>$ {{getFloatDetailsByKey('hf_price_suggested')}}</span>
                </div>
                <div>
                  <span class='shop-item-details-spec-item-label'>
                    <i class="fa fa-list-ul" aria-hidden="true"></i>
                  </span>
                  &nbsp;
                  <span class='shop-item-details-spec-item-value'>{{getGroupedDetailsByKey('k_category')}}</span>
                </div>
              </p>
              <!--a href="#" class="btn btn-primary">add to cart</a-->
            </div>
          </div>
          <!--/.Card-->

        </div>
        <!-- related specifications -->
        <div class='col-sm-6 col-md-6'>
          <div class='shop-item-details-comments-main-container'>
            <div class='shop-item-details-comments-tab'>comment</div>
            <div class="shop-item-details-comments-container">

              <!-- comment 1 (hard coded though) -->
              <div class='shop-item-details-comment-card'>
                <div>
                  <i class="fa fa-id-card-o shop-item-details-comment-card-icon" aria-hidden="true"></i>
                  anonymous
                  <i class="fa fa-thumbs-o-up shop-item-details-comment-card-icon" aria-hidden="true"></i>
                </div>
                <div>
                  <i class="fa fa-map-marker shop-item-details-comment-card-icon" aria-hidden="true" style="padding-left: 4px; padding-right: 4px;"></i>
                  London, United Kingdom
                </div>
                <div class="shop-item-details-comment-card-text">
                  great product at a reasonable price.
                </div>
              </div>

              <div class='shop-item-details-comment-card'>
                <div>
                  <i class="fa fa-id-card-o shop-item-details-comment-card-icon" aria-hidden="true"></i>
                  Marinos Quina
                  <i class="fa fa-thumbs-o-up shop-item-details-comment-card-icon" aria-hidden="true"></i>
                </div>
                <div>
                  <i class="fa fa-map-marker shop-item-details-comment-card-icon" aria-hidden="true" style="padding-left: 4px; padding-right: 4px;"></i>
                  Madrid, Spain
                </div>
                <div class="shop-item-details-comment-card-text">
                  gran producto a un precio razonable.
                </div>
              </div>

              <div class='shop-item-details-comment-card'>
                <div>
                  <i class="fa fa-id-card-o shop-item-details-comment-card-icon" aria-hidden="true"></i>
                  高橋たろ
                  <i class="fa fa-thumbs-o-down shop-item-details-comment-card-icon" aria-hidden="true"></i>
                </div>
                <div>
                  <i class="fa fa-map-marker shop-item-details-comment-card-icon" aria-hidden="true" style="padding-left: 4px; padding-right: 4px;"></i>
                  Tokyo, Japan
                </div>
                <div class="shop-item-details-comment-card-text">
                  海外配送のために少し高価
                </div>
              </div>

            </div>
          </div>


          some other suggestions: (significant terms etc)
        </div>
      </div>
      <!-- suggestions -->
      <div>
        <shop-item-details-suggestion
          sType='morelikethis'
          :dataList='dataSuggestions["morelikethis"]'></shop-item-details-suggestion>
      </div>
      <div>
        <shop-item-details-suggestion
          sType='st'
          :dataList='dataSuggestions["st"]'></shop-item-details-suggestion>
      </div>
    </div>

  </div>
</template>

<script>
function _model_shop_item_details(_inst) {
  return {
    'instance': _inst,
    /* data facets from the listing page */
    'dataFacets': {
      'category':[],
      'brand':[],
      'rating':[],
      'searchbarText': '__empty__'
    },
    'item': {},

    'dataSuggestions': {
      'morelikethis': [],
      'st': []
    }
  };
} // end model

module.exports={
  name: 'shop_item_details',
  data: function() {
    return new _model_shop_item_details(this);
  },
  props: [],
  mounted: function() {
    let _instance=this;

    _instance.populateDataFacets(this.$route.params, _instance);

    // get back the suggestion(s)
    window.Vue.$emit('getShopItemDetailsSuggestions', {
      'callback': this.setDataSuggestions,
      'item': this.item
    });

  },
  watch: {
    $route: function(_newValue) {
      console.log('## new data');
      console.log(_newValue);
      console.log(_newValue['params']['item']);
      console.log(_newValue['params']['itemId']);
      populateDataFacets(_newValue.params, null);
    }
  },
  methods: {

    handleBackClick: function() {
      window.Vue.$emit('changeRouterViewToListing', {
        'catList': this.dataFacets['category'],
        'brandList': this.dataFacets['brand'],
        'ratingList': this.dataFacets['rating'],
        'searchbarText': this.dataFacets['searchbarText'],

        'view': 'listing/:hash',
        'hash': parseInt((new Date().getTime()*Math.random()), 10),
        'from': 'shop_item_details_suggestion'
      });
    },

    setDataSuggestions: function(_data) {
      if (_data && _data['responses']) {
        this.dataSuggestions['morelikethis']=_data['responses'][0];
        this.dataSuggestions['st']=_data['responses'][1];
      }
    },

    /**
     *  populate the dataFacets based on the given _object
     */
    populateDataFacets: function(_object, _instance) {
/*
hash: _hash,
item: _item,
itemId: _item['_id'],
catList: _instance.chosenFacetsCriteria['catList'],
brandList: _instance.chosenFacetsCriteria['brandList'],
ratingList: _instance.chosenFacetsCriteria['ratingList'],
searchbarText: _instance._searchbarText
*/
      if (!_instance) {
        _instance=this;
      }
      let _lst=_object['catList'];
      _instance.dataFacets['category']=(_lst)?_lst:[];
      _lst=_object['brandList'];
      _instance.dataFacets['brand']=(_lst)?_lst:[];
      _lst=_object['ratingList'];
      _instance.dataFacets['rating']=(_lst)?_lst:[];

      let _searchbarText=_object['searchbarText'];
      _instance.dataFacets['searchbarText']=(_searchbarText && _searchbarText.trim().length>0)?_searchbarText:"__empty__";

      _instance.item=_object['item'];
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

    handlePillClick: function(_item, _facetType) {
      // TODO: handle the swap of page
      console.log('** item (type) => '+_item+' ('+_facetType+')');
    },

    getImageUrl: function() {
      if (this.item && this.item['_source']) {
        return '/image/items/'+this.item['_source']['k_photo']
      }
      return '';
    },

    getDetailsByKey: function(_key) {
      let _v='';
      if (this.item && this.item['_source']) {
        _v=this.item['_source'][_key];
      }
      return _v;
    },
    getGroupedDetailsByKey: function(_key) {
      let _v=this.getDetailsByKey(_key);
      if (_v && _v!='') {
        if (_v.length) {
          let _arr=_v;

          _v='';
          for (let _idx=0; _idx<_arr.length; _idx++) {
            if (_idx>0) {
              _v+=', ';
            }
            _v+=_arr[_idx];
          } // end -- for ()
        }
      }
      return _v;
    },
    getFloatDetailsByKey: function(_key) {
      let _v=this.getDetailsByKey(_key);

      if (_v && _v!='') {
        _v=parseFloat(_v, 0.0).toFixed(2);
      }
      return _v;
    }

  }
};
</script>
