<template>
  <div>
    <div class="shop-adv-main-container">
      <shop-adv-search-panel></shop-adv-search-panel>
    </div>
    <!-- result contents -->
    <div class="container-fluid">
      <div class='row'>
        <!-- query DSL -->
        <div class='col-sm-6 col-md-6'>
          <div class="shop-adv-s-main-label" style='padding-top: 18px;'>
            Query DSL:</div>
          <div class="shop-adv-s-result-dsl"
            :class='getQueryDSLVisibilityCss()'
            style="overflow: auto; ">
            <div v-html="query.dslBeautified"></div>
          </div>
        </div>
        <!-- result listing -->
        <div class='col-sm-6 col-md-6'>
          <div class="shop-adv-s-main-label" style='padding-top: 18px;'>
            Result(s):
            <span class='pull-right'>{{getHitsCount()}}</span>
          </div>
          <div v-for="(hit, idx) in getHitsArray()"
            style="overflow: auto; "
            class='shop-adv-s-result-listing-container' >

            <img :src="getImageUrl(hit)"
              class='shop-adv-s-result-listing-img' />
            <div>
              <div class="em-marker">
                <i class="fa fa-tags" aria-hidden="true"></i>
                <span v-html='getHitBrand(hit)'></span>
              </div>
              <div class="text-truncate em-marker" :title="hit['_source']['t_description']">
                <i class="fa fa-list-alt" aria-hidden="true"></i>
                <span v-html='getHitDescription(hit)'></span>
              </div>
              <div>
                <i class="fa fa-money" aria-hidden="true"></i>
                {{getHitPrice(hit)}}
              </div>
              <div class="em-marker">
                <i class="fa fa-list-ul" aria-hidden="true"></i>
                <span v-html='getHitCategory(hit)'></span>
              </div>
            </div>

          </div>
          <!--{{query.dataList}}-->
        </div>
      </div>
    </div>
    <!-- spy panel for sample code display -->
    <shop-spy-panel :viewFile='spyPanelViewFile' ></shop-spy-panel>
  </div>
</template>

<script>
function _model_shop_adv_search(_inst) {
  return {
    'instance': _inst,
    'query': {
      'dsl': '',
      'dslBeautified': '',
      'dataList': []
    }
  };
} // end -- model


module.exports={
  name: 'shop_adv_search',
  data: function() {
    return new _model_shop_adv_search(this);
  },
  mounted: function() {
    let _instance=this;

    window.Vue.$on('runMatchQuery', function(_eventObject) {
      _instance.validateNSetDefaultValuesForFields(_eventObject);
      window.ajaxUtil.GET(
        '/api/shopAdvSearchMatchQueryGet',
        _eventObject,
        function(_data, _status, _jqXHR) {
          _instance.query.dataList=_data['data']['responses'][0];
          _instance.query.dsl=_data['dsl'];

          if (_data['dsl']) {
            _instance.query.dslBeautified=
              window.lectureUtil.jsCodeBeautifier(JSON.stringify(_data['dsl'], null, 2).toString());
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });
    window.Vue.$on('runMatchPhraseQuery', function(_eventObject) {
      _instance.validateNSetDefaultValuesForFields(_eventObject);
      window.ajaxUtil.GET(
        '/api/shopAdvSearchMatchPhraseQueryGet',
        _eventObject,
        function(_data, _status, _jqXHR) {
          _instance.query.dataList=_data['data']['responses'][0];
          _instance.query.dsl=_data['dsl'];

          if (_data['dsl']) {
            _instance.query.dslBeautified=
              window.lectureUtil.jsCodeBeautifier(JSON.stringify(_data['dsl'], null, 2).toString());
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });
    window.Vue.$on('runMultiMatchQuery', function(_eventObject) {
      _instance.validateNSetDefaultValuesForFields(_eventObject);
      window.ajaxUtil.GET(
        '/api/shopAdvSearchMultiMatchQueryGet',
        _eventObject,
        function(_data, _status, _jqXHR) {
          _instance.query.dataList=_data['data']['responses'][0];
          _instance.query.dsl=_data['dsl'];

          if (_data['dsl']) {
            _instance.query.dslBeautified=
              window.lectureUtil.jsCodeBeautifier(JSON.stringify(_data['dsl'], null, 2).toString());
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });
    window.Vue.$on('runMultiTermsQuery', function(_eventObject) {
      _instance.validateNSetDefaultValuesForFields(_eventObject);
      // handling of terms
      if (_eventObject['terms']) {
        _eventObject['termsArray']=_eventObject['terms'].split(',');
      } else {
        _eventObject['termsArray']=[];
      }

      window.ajaxUtil.GET(
        '/api/shopAdvSearchMultiTermsQueryGet',
        _eventObject,
        function(_data, _status, _jqXHR) {
          _instance.query.dataList=_data['data']['responses'][0];
          _instance.query.dsl=_data['dsl'];

          if (_data['dsl']) {
            _instance.query.dslBeautified=
              window.lectureUtil.jsCodeBeautifier(JSON.stringify(_data['dsl'], null, 2).toString());
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });


  },
  props: [],
  watch: {},
  methods: {
    /**
     *  validation and provide default values to the query information
     */
    validateNSetDefaultValuesForFields: function(_e) {
      if (_e) {
        let _key='';
        /*_key=_e['highlight'];
        if (_key) {
          if ('yes'==_key) {
            _e['highlight']=true;
          } else {
            _e['highlight']=false;
          }
        }*/
        _key=_e['minShouldMatch'];
        if (_key) {
          if (isNaN(_key)) {
            _e['minShouldMatch']=0;
          } else {
            _e['minShouldMatch']=parseInt(_key, 10);
          }
        } else if (_e.hasOwnProperty('minShouldMatch')) {
          _e['minShouldMatch']=0;
        }
        _key=_e['size'];
        if (_key) {
          if (isNaN(_key)) {
            _e['size']=10;
          } else {
            _e['size']=parseInt(_key, 10);
          }
        } else if (_e.hasOwnProperty('size')) {
          _e['size']=10;
        }
        _key=_e['slop'];
        if (_key) {
          if (isNaN(_key)) {
            _e['slop']=0;
          } else {
            _e['slop']=parseInt(_key, 10);
          }
        } else if (_e.hasOwnProperty('slop')) {
          _e['slop']=0;
        }
      } // end -- if (_e valid)
    },

    getHitsArray: function() {
      let _hits=[];
      if (this.query.dataList &&
        this.query.dataList['hits'] &&
        this.query.dataList['hits']['hits']) {
        _hits=this.query.dataList['hits']['hits'];
      }
      return _hits;
    },
    getHitsCount: function() {
      let _v='';
      let _hits=this.getHitsArray();

      if (_hits && _hits.length>0) {
        _v='Hits: '+_hits.length;
      }
      return _v;
    },
    getImageUrl: function(_hit) {
      return '/image/items/'+_hit['_source']['k_photo'];
    },
    getHitPrice: function(_hit) {
      let _v='';
      if (_hit && _hit['_source']) {
        _v=('$'+parseFloat(_hit['_source']['hf_price_suggested'], 0.0).toFixed(2));
      }
      return _v;
    },
    getQueryDSLVisibilityCss: function() {
      let _css={};
      if (this.query.dsl && this.query.dsl!='') {
        _css['showing']=true;
        _css['hiding']=false;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },

    getHitHighlight: function(_hit) {
      let _hl={};
      if (_hit && _hit['highlight']) {
        _hl=_hit['highlight'];
      }
      return _hl;
    },

    getHitDescription: function(_hit) {
      let _v='';
      let _hl=this.getHitHighlight(_hit);
      // check if highlight is available
      let _hlD = _hl['t_description'];

      if (_hlD && _hlD.length>0) {
        _v=_hlD[0];
      } else if (_hit && _hit['_source']) {
        _v=_hit['_source']['t_description'];
      }
      return _v;
    },
    getHitBrand: function(_hit) {
      let _v='';
      let _hl=this.getHitHighlight(_hit);
      // check if highlight is available
      let _hlD = _hl['s_brand_name'];

      if (_hlD && _hlD.length>0) {
        _v=_hlD[0];
      } else if (_hit && _hit['_source']) {
        _v=_hit['_source']['s_brand_name'];
      }
      return _v;
    },
    getHitCategory: function(_hit) {
      let _v='';
      let _hl=this.getHitHighlight(_hit);
      // check if highlight is available
      let _hlD = _hl['k_category'];

      if (_hlD && _hlD.length>0) {
        _v=_hlD[0];
      } else if (_hit && _hit['_source']) {
        _v=_hit['_source']['k_category'];
      }
      return _v;
    }



  }
};
</script>
