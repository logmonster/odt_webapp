<template>
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
      <!-- polygon -->
      <div class="n-c-panel-geopolyon-title">polygon geoPoint(s)</div>
      <div class='container-fluid'>
        <div class='row'>
          <div v-for="(_gPoint, _idx) in getGeopolygonPoints()" class='col-sm-12 col-md-12'>
            <div style="margin-top: 4px; margin-bottom: 4px;">
              <span class='n-c-panel-geopolyon-points-lat'>
                {{_gPoint['lat']}}
              </span>&nbsp;x&nbsp;<span class='n-c-panel-geopolyon-points-lon'>
                {{_gPoint['lon']}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- button -->
      <div class='col-sm-12 col-md-12' style="margin-top: 12px;">
        <button @click='handleClick()'
          class="btn btn-primary" style="margin-left: 0px;">go</button>
      </div>
    </div>
  </div>
</template>

<script>
function _model_n_geoshape(_inst) {
  return {
    'instance': _inst,
    'location': {
      'lat': undefined,
      'lon': undefined,
      'placename': undefined,
      'gmapSuggestedPlacename': undefined
    },
    'info': {
      'msg': undefined
    },
    'geopolygonPoints': []
  };
}

module.exports={
  name: 'n_nearby',
  data: function() {
    return new _model_n_geoshape(this);
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

    // let nyc-gmap.vue knows nearbyTaxi has been chosen
    window.Vue.$emit('controlPanelViewChanged', { 'control': 'nyc-geopolygon' });

    // geoploygonPointsChanged
    window.Vue.$on('geopolygonPointsChanged', function(_eventObject) {
      _instance.geopolygonPoints = _eventObject['geopolygonPoints'];
    });

    window.Vue.$emit('updateSpyPanelFile', {
      'file': '/clientView/code/taxiGeoPolygonSpy.html' });
  },
  props: [],
  watch: {},
  methods: {
    getGeopolygonPoints: function() {
      if (this.geopolygonPoints) {
        return this.geopolygonPoints;
      } else {
        return [];
      }
    },

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

    handleClick: function() {
      // validate if the lat,lon has values
      if (this.validation()) {
        // reset
        this.info.msg=undefined;
        window.ajaxUtil.GET(
          '/api/nycGeopolygonTaxiSearchGET',
          {
            /*
            'lat': this.location.lat,
            'lon': this.location.lon,
            'distance': this.distance.value,
            'distance_unit': this.distance.unit,
            */
            'geopolygonPoints': this.geopolygonPoints
          },
          this.cbGetNycGeopolygonTaxiSearchResult,
          function(_jqXHR, _status, _err) {
            console.log('* something wrong happened ~ ');
            console.log(_err);
          }, // _failCallback
          null  // _finallyCallback
        );
      }
    },
    cbGetNycGeopolygonTaxiSearchResult: function(_data) {
      if (_data && _data['data']) {
        // call gmapUtil to add the points + reset existing points
        window.Vue.$emit('geopolygonTaxiDataChanged', {
          'data': _data['data']['responses'][0],
          'dsl': _data['dsl']
        });
        //console.log(_data['dsl']);
      }
    },
    validation: function() {
      let _valid=true;

      /*if (!this.location.lat || !this.location.lon) {
        this.info.msg='either latitude or longitude is not provided !!!';
        _valid=false;
      }
      if (_valid && (!this.distance.value || isNaN(this.distance.value))) {
        this.info.msg='the distance must be provided !!!';
        _valid=false;
      }*/
      return _valid;
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
    }

  }
};
</script>
