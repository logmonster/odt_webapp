<template>
  <div>
    <div class="container-fluid" style="margin-top: 12px;">
      <div class='row'>
        <div class='col-sm-12, col-md-12'>
          <div class="n-c-panel-nearby-info-msg"
            :class='getInfoMsgVisibilityClass()'>
            <i class="fa fa-warning" aria-hidden="true"></i>
            {{info.msg}}</div/>
        </div>
      </div>
      <div class='row'>
        <!-- boundingbox -->
        <div class='col-sm-12 col-md-6' style="margin-bottom: 8px;">
          <input
            type='text' v-model='boundingbox.top'
            placeholder='top geoPoint' />
        </div>
        <div class='col-sm-12 col-md-6' style="margin-bottom: 8px;">
          <input
            type='text' v-model='boundingbox.left'
            placeholder='left geoPoint' />
        </div>
        <div class='col-sm-12 col-md-6' style="margin-bottom: 8px;">
          <input
            type='text' v-model='boundingbox.bottom'
            placeholder='bottom geoPoint' />
        </div>
        <div class='col-sm-12 col-md-6' style="margin-bottom: 16px;">
          <input
            type='text' v-model='boundingbox.right'
            placeholder='right geoPoint' />
        </div>

        <!-- distance -->
        <div class='col-sm-12 col-md-12' style="margin-bottom: 8px;">
          <input
            type='text' v-model='distance.value'
            placeholder='search taxi within a distance' />
        </div>
        <!-- distance unit -->
        <div class='col-sm-12 col-md-6'>
          <input v-model='distance.unit' type='radio'
            name='radDistanceUnit' value='miles'>
            &nbsp;&nbsp;&nbsp;miles</input>
        </div>
        <div class='col-sm-12 col-md-6'>
          <input v-model='distance.unit' type='radio'
            name='radDistanceUnit' value='km'>
            &nbsp;&nbsp;&nbsp;km</input>
        </div>
        <!-- button -->
        <div class='col-sm-12 col-md-12' style="margin-top: 8px;">
          <button @click='handleClick()'
            class="btn btn-primary" style="margin-left: 0px;">go</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function _model_n_boundingbox(_inst) {
  return {
    'instance': _inst,
    'location': {
      'lat': undefined,
      'lon': undefined,
      'placename': undefined,
      'gmapSuggestedPlacename': undefined
    },
    'distance': {
      'value': undefined,
      'unit': 'miles'
    },
    'boundingbox': {
      'top': undefined,
      'left': undefined,
      'bottom': undefined,
      'right': undefined
    },
    'info': {
      'msg': undefined
    }
  };
}

module.exports={
  name: 'n_nearby',
  data: function() {
    return new _model_n_boundingbox(this);
  },
  mounted: function() {
    let _instance=this;

    window.Vue.$on('myLocationChanged', function(_eventObject) {
      _instance.handleLocationChanged(_eventObject);
    });

    // actively get the location from the nyc-control-panel
    window.Vue.$emit('getLocation', {
      'callback': _instance.getLocationCallback
    });

    // let nyc-gmap.vue knows boundingbox has been chosen
    window.Vue.$emit('controlPanelViewChanged', { 'control': 'nyc-boundingbox' });
    
    // handle the boundingBox bounds change
    window.Vue.$on('boundingboxBoundsChanged', function(_eventObject) {
      _instance.handleBoundingboxBoundsChange(_eventObject);
    });

    window.Vue.$emit('updateSpyPanelFile', {
      'file': '/clientView/code/taxiBoundingBoxSpy.html' });
  },
  props: [],
  watch: {},
  methods: {
    getLocationCallback: function(_loc) {
      let _data={ 'location': _loc };
      this.handleLocationChanged(_data);
    },
    handleLocationChanged: function(_eventObject) {
      let _l=_eventObject['location'];

      this.location.lat=_l['lat'];
      this.location.lon=_l['lon'];
      this.location.placename=_l['placename'];
      this.location.gmapSuggestedPlacename=_l['gmapSuggestedPlacename'];

      // reset
      this.info.msg=undefined;
    },

    getInfoMsgVisibilityClass: function() {
      let _css={};
      if (this.info.msg && this.info.msg!='') {
        _css['showing']=true;
        _css['hiding']=false;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },

    handleBoundingboxBoundsChange: function(_eventObject) {
      if (_eventObject) {
        this.boundingbox.top = _eventObject['top'];
        this.boundingbox.left = _eventObject['left'];
        this.boundingbox.bottom = _eventObject['bottom'];
        this.boundingbox.right = _eventObject['right'];
      }
    },

    /*
     *  validation
     */
    validation: function() {
      let _valid=true;

      if (!this.location.lat || !this.location.lon) {
        this.info.msg='either latitude or longitude is not provided !!!';
        _valid=false;
      }
      if (_valid && (!this.distance.value || isNaN(this.distance.value))) {
        this.info.msg='the distance must be provided !!!';
        _valid=false;
      }

      // bounds
      if (_valid) {
        if (!this.boundingbox.top || isNaN(this.boundingbox.top)) {
          _valid=false;
        }
        if (!this.boundingbox.left || isNaN(this.boundingbox.left)) {
          _valid=false;
        }
        if (!this.boundingbox.bottom || isNaN(this.boundingbox.bottom)) {
          _valid=false;
        }
        if (!this.boundingbox.right || isNaN(this.boundingbox.right)) {
          _valid=false;
        }

        if (!_valid) {
          this.info.msg='the bounding box\'s TOP, LEFT, BOTTOM, RIGHT geoPoint is required!';
        }
      }
      return _valid;
    },

    handleClick: function() {
      if (this.validation()) {
        // reset
        this.info.msg=undefined;
        window.ajaxUtil.GET(
          '/api/nycBoundingboxSearchGET',
          {
            'lat': this.location.lat,
            'lon': this.location.lon,
            'distance': this.distance.value,
            'distance_unit': this.distance.unit,
            'boundingbox': this.boundingbox
          },
          this.cbGetNycBoundingboxSearchResult,
          function(_jqXHR, _status, _err) {
            console.log('* something wrong happened ~ ');
            console.log(_err);
          }, // _failCallback
          null  // _finallyCallback
        );
      }
    },

    cbGetNycBoundingboxSearchResult: function(_data) {
      if (_data && _data['data']) {
        // call gmapUtil to add the points + reset existing points
        window.Vue.$emit('boundingboxTaxiDataChanged', {
          'data': _data['data']['responses'][0],
          'dsl': _data['dsl']
        });
        //console.log(_data['dsl']);
      }
    }

  }
};
</script>
