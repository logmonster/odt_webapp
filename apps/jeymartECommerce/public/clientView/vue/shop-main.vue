<style></style>

<template>
  <div>
    <!-- common header -->
    <shop-header-navigator
      :data="data.init"
      :dataSuggest="data.searchbarTextSuggestions"
      ></shop-header-navigator>
    <div class="main-container">
      <router-view></router-view>

      <!--div class="mx-auto" style="width: 320px;">
        <p/>main content
      </div-->

    </div>
    <!--router-view></router-view-->
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

    'throttleUtil': new window.throttleUtil(),
    'searchbarText': '',
    'searchbarCategory': ''
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

// TODO: to be coded
    window.Vue.$on('searchbarIconClick', function(_eventObject) {
      console.log(_eventObject);
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
