<style></style>

<template>
  <div>
    <!-- common header -->
    <shop-header-navigator
      :data="data.init"
      :dataSuggest="data.searchbarTextSuggestions"
      ></shop-header-navigator>

    <!-- main container, router-view plus spy-panel component -->
    <div class="main-container">
      <router-view></router-view>

      <!-- spy panel for sample code display -->
      <shop-spy-panel :viewFile='spyPanelViewFile' ></shop-spy-panel>

      <!--div class="mx-auto" style="width: 320px;">
        <p/>main content
      </div-->
    </div>
  </div>
</template>

<script>
/*
 *  model
 */
function _model_shop_main(_instance) {
  return {
    'instance': _instance,
    'data': {
      'init': '',
      'searchbarTextSuggestions': ''
    },
    /*
     *  searchbar component related properties
     */
    'throttleUtil': new window.throttleUtil(),
    'searchbarText': '',
    'searchbarCategory': '',
    /*
     *  update this property when the router-view changes
     *  so that the correct code sample is displayed!
     */
    'spyPanelViewFile': '/clientView/code/landingInfoSpy.html'
  };
}

module.exports={
  data: function() {
    return new _model_shop_main(this);
  },
  mounted: function() {
    let _instance = this;

    // start throttleUtil timer
    this.throttleUtil.start(
      this.getSearchbarText,
      this.getAutoCompletionSuggestionsBySearchbarText);
    /*
     *  run a msearch query so that multiple init query(s) could be run
     *  during the "mounted" event
     */
    window.ajaxUtil.GET(
      '/api/shopInitGet',
      null,
      function(_data, _status, _jqXHR) {
        // update the data structure, so that the value would be passed to the child components
        _instance.data.init=_data['responses'];
      },
      function(_jqXHR, _status, _err) {
        console.log('* something wrong happened ~ ');
        console.log(_err);
      }
    );



    /* ---------------------------------------------------------------- */
    /*  define $on events (parent-child component communication model)  */
    /* ---------------------------------------------------------------- */

    window.Vue.$on('updateSpyPanelFile', function(_eventObject) {
      _instance.spyPanelViewFile=_eventObject['file'];
    });

    // handle searchbarText keyup event
    window.Vue.$on('searchbartextkeyup', function(_keyObject) {
      _instance.searchbarText = _keyObject.text;
      _instance.searchbarCategory = _keyObject.category;
      _instance.throttleUtil.isTimeout();
    });

    // when the searchbarText has been replaced by picking one of the suggestions
    window.Vue.$on('searchbartextupdated', function() {
      _instance.data.searchbarTextSuggestions=null;
    });

    /*
     *  handle the searchbarText category change; similar to a keyup event,
     *  need to search for the new suggestions
     */
    window.Vue.$on('searchbarcategorychanged', function(_eventObject) {
      _instance.searchbarText = _eventObject.text;
      _instance.searchbarCategory = _eventObject.category;
      _instance.throttleUtil.isTimeout();
    });

    /*
     *  handle the request for facets-data (aggs); usually it is the
     *  LHS panel
     */
    window.Vue.$on('getFacetsData', function(_eventObject) {
      window.ajaxUtil.GET(
        '/api/shopFacetsGet',
        _eventObject,
        function(_data, _status, _jqXHR) {
          // updates the data... might not work, use callback instead
          //_instance.data.facets=_data['responses'];
          if (_eventObject && _eventObject.callback) {
            _eventObject.callback(_data);
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });

    /*
     *  handle request for landing page info data retrieval
     */
    window.Vue.$on('getLandingInfoData', function(_eventObject) {
      window.ajaxUtil.GET(
        '/api/shopLandingInfoGet',
        null,
        function(_data, _status, _jqXHR) {
          if (_eventObject && _eventObject.callback) {
            _eventObject.callback(_data);
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });

    /*
     *  handle the request to fetch the listing data based on the router.params
     */
    window.Vue.$on('getListingDataByRouteParams', function(_eventObject) {
      window.ajaxUtil.GET(
        '/api/shopListingByParamsGet',
        {
          'categoryList': _eventObject['categoryList'],
          'brandList': _eventObject['brandList'],
          'ratingList': _eventObject['ratingList'],
          'pagination': _eventObject['pagination'],
          'searchbarText': _eventObject['searchbarText']
        },
        function(_data, _status, _jqXHR) {
          if (_eventObject && _eventObject.callback) {
            _eventObject.callback(_data);
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });

    // (partial) moved to shop-landing.vue
    window.Vue.$on('searchbarIconClick', function(_eventObject) {
      // handle the category
      let _category=[];
      if (_eventObject['searchbar']['category']!='all') {
        _category.push(_eventObject['searchbar']['category']);
      }
      let _searchbarText=_eventObject['searchbar']['text'];
      if (_searchbarText.trim().length==0) {
        _searchbarText="__empty__";
      }
      // update the data entries in the model
      _instance.searchbarText=_searchbarText;
      _instance.searchbarCategory=_category;
    });

    /**
     *  handling on request for suggestions for the item details suggestion(s)
     */
    window.Vue.$on('getShopItemDetailsSuggestions', function(_eventObject) {
      window.ajaxUtil.GET(
        '/api/shopItemDetailsSuggestionsGet',
        {
          'item': _eventObject['item']
        },
        function(_data, _status, _jqXHR) {
          if (_eventObject && _eventObject.callback) {
            _eventObject.callback(_data);
          }
        },
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }
      );
    });

  },
  methods: {
    /*
     *  return the searchbarText value
     *  (this is a function callback for the throttleUtil)
     */
    getSearchbarText: function() {
      return this.searchbarText;
    },
    /*
     *  GET from es on the auto completion suggestion
     *  (also used as a function callback for the throttleUtil)
     */
    getAutoCompletionSuggestionsBySearchbarText: function() {
      let _instance = this;

      if (!this.throttleUtil.getTimeoutCallbackInProgress()) {
        this.throttleUtil.setTimeoutCallbackInProgress(true);

        window.ajaxUtil.GET(
          '/api/searchbarTextAutoCompletionSuggestionsGet',
          {
            'prefix': this.searchbarText,
            'searchbarCategory': this.searchbarCategory
          },
          function(_data, _status, _jqXHR) {
            _instance.data.searchbarTextSuggestions = _data['responses'];
          },
          function(_jqXHR, _status, _err) {
            console.log('* something wrong happened ~ ');
            console.log(_err);
          },
          function(_data, _status, _err) {
            if (_instance) {
              setTimeout(function() {
                _instance.throttleUtil.setTimeoutCallbackInProgress(false);
                _instance.throttleUtil.reset();
              }, 1000);

            }
          }
        );
      }
    }

  }
};

</script>
