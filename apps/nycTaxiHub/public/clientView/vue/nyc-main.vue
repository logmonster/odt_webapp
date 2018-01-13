<template>
  <div :class="getCssClassForMainContainer()"
    style="padding-top: 4px; padding-bottom: 4px;">
    <!-- header navigator -->
    <nyc-header-navigator></nyc-header-navigator>

    <!-- main content -->
    <div class='container-fluid'>
      <div class='row n-main-container'>
        <!-- control panel -->
        <div class='col-sm-6 col-md-5' style="padding: 0px;">
          <nyc-control-panel></nyc-control-panel>
        </div>
        <!-- google map -->
        <div class='col-sm-6 col-md-7' style="padding: 0px;">
          <nyc-gmap></nyc-gmap>
        </div>
      </div>
    </div>

    <!-- modal dialog for { dlgGMapApiKey } -->
    <div class="modal fade" id="dlgGMapApiKey" tabindex="-1"
      role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <!--Jumbotron-->
        <div class="jumbotron text-center blue-grey lighten-5 " style="border-radius: 3px;">
          <!--Title-->
          <h1 class="card-title h2-responsive font-bold mt-3 indigo-text">
            <strong>please enter the Google Map API key here
            </strong></h1>
          <!--Subtitle-->
          <p class="pt-2 font-bold indigo-text">
            <strong>
              <input type='text' v-model='gmap.key' placeholder='enter the api key here' />
            </strong></p>
          <!-- gmap.msg -->
          <p :class='getCssClassForApiKeyDlg()'
            class="pt-2 font-bold pink-text">
            <strong>{{gmap.msg}}</strong></p>

          <!--Text-->
          <div class="d-flex justify-content-center">
              <p class="card-text my-3" style="max-width: 43rem;">
                if you don't have one yet, apply for the
                <br/><span class='blue-text'>Google Map API key</span>
                <br/> at the following
                <a href='https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en' target="_blank">
                  link</a>
              </p>
          </div>
          <hr class="">
          <button class="btn btn-primary btn-rounded" @click='handleSaveApiKey()'>
            save <i class="fa fa-check" aria-hidden="true"></i></button>
          <button class="btn btn-info btn-rounded" @click='handleApiKeyCancel()' >
            cancel <i class="fa fa-close" aria-hidden="true"></i></button>
        </div>
        <!--Jumbotron-->

      </div>
    </div>

    <!-- spy panel -->
    <nyc-spy-panel :viewFile='spyPanelViewFile'></nyc-spy-panel>

  </div>
</template>

<script>
function _model_n_main(_instance) {
  return {
    'instance': _instance,
    'gmap': {
      'nokeyfile': false,
      'msg': undefined,
      'key': undefined
    },
    'spyPanelViewFile': '/clientView/code/taxiNearbySpy.html',
    'isSpyPanelViewVisible': false
  };
} // end model

module.exports={
  name: 'n_main',
  data: function() {
    return new _model_n_main(this);
  },
  props: [],
  mounted: function() {
    let _instance=this;

    // check if the gmap api available or not
    window.gmap={
      key: undefined,
      init: '_initMap',
      lazyLoadApi: '_lazyLoadApi'
    };
    setTimeout(function() {
      window.ajaxUtil.GET(
        '/api/nycGMapApiKeyGET',
        {},
        _instance.handleGMapApiKeyGet,
        function(_jqXHR, _status, _err) {
          console.log('* something wrong happened ~ ');
          console.log(_err);
        }, // _failCallback
        null  // _finallyCallback
      );
    }, 100);

    window.Vue.$on('spyPanelViewToggled', function(_eventObject) {
      _instance.isSpyPanelViewVisible=_eventObject['visibility'];
    });

  },
  watch: {},
  methods: {
    /*
     *  either have or NOT have the gmap api key
     */
    handleGMapApiKeyGet: function(_data) {
      if (_data && _data['exists']==true && _data['key']) {
        // send the key to gmapUtil object too
        window.gmapUtil.setApiKey(_data['key']);
        // extract the key
        window.gmap.key=_data['key'];
        // make the lazyLoadApi call...
        if (window.gmap.lazyLoadApi) {
          let _fxLazy=window[window.gmap.lazyLoadApi];

          if (_fxLazy) {
            _fxLazy.call();
          }
        }
      } else {
        window.gmap.nokeyfile=true;
        // update the model data and force a dialog to ask for api key
        this.gmap.nokeyfile=true;

        if (window.jQuery) {
          window.jQuery('#dlgGMapApiKey').modal();
        }
      }
      //console.log(_data);
    },

    /* ---------------------- */
    /*    dialogue related    */
    /* ---------------------- */
    handleApiKeyCancel: function() {
      if (window.jQuery) {
        window.jQuery('#dlgGMapApiKey').modal('hide');
      }
    },
    handleSaveApiKey: function() {
      // reset
      this.gmap.msg=undefined;

      if (this.gmap.key) {
        window.ajaxUtil.POST(
          '/api/nycGMapApiKeyPOST',
          {
            'key': this.gmap.key
          },
          this.handleServerSaveApiKey,
          function(_jqXHR, _status, _err) {
            console.log('* something wrong happened ~ ');
            console.log(_err);
          }, // _failCallback
          null  // _finallyCallback);
        );

      } else {
        this.gmap.msg='the API key must be provided !';
      }
    },

    /*
     *  api key saved, now refresh
     */
    handleServerSaveApiKey: function(_data) {
      let _done=(_data && _data['done'])?_data['done']:false;
      if ( _done ) {
        if (window.jQuery) {
          setTimeout(function() {
            // CAVEAT, the nodemon module would need to refresh the server; hence might take around 1sec to reload
            window.jQuery('#dlgGMapApiKey').modal('hide');
            window.location.href='/clientView/view/nycTaxiHub.html';
          }, 800);
        }
      } else {
        gmap.msg='something wrong on server side, could not save the api key file';
      }
    },

    /* ------------------ */
    /*    css related     */
    /* ------------------ */
    getCssClassForApiKeyDlg: function() {
      let _css={};

      if (this.gmap.msg) {
        _css['show']=true;
        _css['hide']=false;
      } else {
        _css['show']=false;
        _css['hide']=true;
      }
      return _css;
    },

    getCssClassForMainContainer: function() {
      let _css={};

      if (this.isSpyPanelViewVisible) {
        _css['main-container']=true;
      } else {
        _css['main-container']=false;
      }
      return _css;
    }

  }
};

</script>
