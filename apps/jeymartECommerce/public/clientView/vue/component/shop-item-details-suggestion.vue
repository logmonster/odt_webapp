<template>
  <div>
    <!-- title -->
    <div class="shop-ids-container shop-ids-suggestion-type-label">
      Suggestion(s) from "<span class="shop-ids-suggestion-type-label-caption">{{suggetionTypeTitle}}</span>" approach:
    </div>
    <!-- morelikethis OR significant terms-->
    <div class="container-fluid shop-ids-suggestion-row-container" style="padding-top: 4px;">
      <div class='row'>
        <div class='col-sm-6 col-md-3' v-for='(item, idx) in getSuggestionList()'>
          <!--Card-->
          <div class="card">
            <!--Card image-->
            <div class="view overlay hm-white-slight mx-auto">
              <img :src="getImageUrl(item)"
                :style='getImageStyles()'
                class="img-fluid shop-ids-image" alt="">
              <a href="javascript:void(0);">
                  <div class="mask"></div>
              </a>
            </div>
            <!--Card content-->
            <div class="card-body">
              <!--h4 class="card-title">Card title</h4-->
              <div class="card-text text-truncate shop-ids-title"
                :title="item['_source']['s_brand_name']">
                {{item['_source']['s_brand_name']}}
              </div>
              <div>
                <div class='shop-ids-text text-truncate'
                  :title="item['_source']['t_description']">
                  {{item['_source']['t_description']}}</div>
                <div class='shop-ids-text'>
                  $ {{getItemPrice(item)}}</div>
                <div class='shop-ids-text'>
                  {{getCategoryFromItem(item)}}</div>  

              </div>
            </div>
          </div>
          <!--/.Card-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function _model_shop_item_details_suggestions(_inst) {
  return {
    'instance': _inst,
    'fakeIndicator': '',
    'windowEventUtil': null
  };
} // end -- model

module.exports={
  name: 'shop_item_details_suggestions',
  data: function() {
    return new _model_shop_item_details_suggestions(this);
  },
  mounted: function() {
    let _instance=this;

    this.windowEventUtil = new window.windowEventUtil();
    this.windowEventUtil.registerEvent('resize', 'shop-item-details-suggestion', this.fakeUpdateModel);
  },
  props: [ 'dataList', 'sType' ],
  computed: {
    suggetionTypeTitle: function() {
      let _t='';
      if (this.sType) {
        if ('morelikethis'==this.sType) {
          _t='more like this'
        } else if ('st'==this.sType) {
          _t='significant terms'
        }
      }
      return _t;
    }
  },
  methods: {
    /*
     *  a fake indicator to force vue to update the css methods;
     *  the tip is that the model associated with this component must be
     *  changed / updated, if not the css methods won't be re-triggered
     */
    fakeUpdateModel: function() {
      this.fakeIndicator = parseInt(new Date().getTime()*Math.random(), 10);
    },
    /*
     *  return top-4 results from the suggestion(s)
     */
    getSuggestionList: function() {
      let _lst=[];

      if ('morelikethis'==this.sType) {
        if (this.dataList &&
          this.dataList['hits'] &&
          this.dataList['hits']['hits']) {

          let _l = this.dataList['hits']['hits'];
          for (let _idx=0; _idx<_l.length; _idx++) {
            if (_idx>=4) break;
            _lst.push(_l[_idx]);
          } // end -- for (dataList length)
        }
      } else if ('st'==this.sType) {
        if (this.dataList && this.dataList['aggregations'] &&
          this.dataList['aggregations']['_st'] &&
          this.dataList['aggregations']['_st']['buckets']) {

          let _bs=this.dataList['aggregations']['_st']['buckets'];
          let _enough=false;

          for (let _idx=0; _idx<_bs.length; _idx++) {
            let _hits=_bs[_idx]['_st2']['hits']['hits'];

            for (let _idx_1=0; _idx_1<_hits.length; _idx_1++) {
              if (_lst.length>=4) {
                _enough=true;
                break;
              }
              _lst.push(_hits[_idx_1]);
            }
            if (_enough) {
              break;
            }
          } // end -- for (_bs length)
        } // end -- have aggregations
      }
      return _lst;
    },

    getImageUrl: function(_item) {
      return '/image/items/'+_item['_source']['k_photo']
    },
    getItemPrice: function(_item) {
      return parseFloat(_item['_source']['hf_price_suggested'], 0.0).toFixed(2);
    },

    getImageStyles: function() {
      let _s={ 'fakeIndicator': this.fakeIndicator };
      // there is a short time for the elements to be populated
      setTimeout(function() {
        let _jImg=jQuery('.shop-ids-image');

        if (_jImg.length>0) {
          let _width=_jImg.css('width');
          if (_width) {
            let _h=(parseInt(_width, 10)*(3/4))+'px';
            _jImg.css({
              'height': _h
            });
          }
        } // end -- if (_jImg has elements)
      }, 100);

      return _s;
    },

    getCategoryFromItem: function(_item) {
      return _item['_source']['k_category'].join(', ');
    }


  }
};
</script>
