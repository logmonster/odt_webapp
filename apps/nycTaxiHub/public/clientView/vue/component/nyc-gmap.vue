<template>
  <div style="padding-left: 2px; padding-right: 2px;">
    <div class='gmap-status-bar'>status: {{statusInfo}}</div>
    <div id='nyc-gmap-map' class='gmap-map-container' ></div>
  </div>
</template>

<script>
function _model_n_gmap(_inst) {
  return {
    'instance': _inst,
    'nearby': {
      'hits': undefined
    },
    'location': {
      'lat': undefined,
      'lon': undefined,
      'placename': undefined,
      'gmapSuggestedPlacename': undefined
    },
    'statusInfo': undefined
  };
} // end -- model

module.exports={
  name: 'n_gmap',
  data: function() {
    return new _model_n_gmap(this);
  },
  mounted: function() {
    let _instance=this;

    if (window.gmapUtil) {
      window.gmapUtil.setStatusUpdateCb(_instance.handleStatusInfoUpdate);
      // set nyc center marker
      _instance.handleSetNycCenterMarker();
    }

    window.Vue.$on('nearbyTaxiDataChanged', function(_eventObject) {
      _instance.handleNearbyTaxiDataChanged(_eventObject);
    });

    window.Vue.$on('myLocationChanged', function(_eventObject) {
      _instance.handleLocationChanged(_eventObject);
    });

  },
  props:[],
  watch: {},
  methods: {
    /*
     *  a more robust way to set the initial NYC center pointer
     */
    handleSetNycCenterMarker: function() {
      let _instance=this;
      if (window.gmapInstance) {
        window.gmapUtil.setNycCenterMarker();
      } else {
        setTimeout(function() {
        _instance.handleSetNycCenterMarker();
      }, 120);
      }
    },

    handleStatusInfoUpdate: function(_updateType, _info) {
      if ('nearbyTaxi' == _updateType && _info) {
        this.statusInfo='lat: '+_info['lat']+' ; lon: '+_info['lon'];
      }
    },

    handleNearbyTaxiDataChanged: function(_eventObject) {
      //console.log(_eventObject);
      if (_eventObject) {
        if (_eventObject['data'] && _eventObject['data']['hits']) {
          this.nearby.hits=_eventObject['data']['hits']['hits'];
          // reset markers first
          window.gmapUtil.resetAllMarkersOnMap();
          window.gmapUtil.createNearbyTaxiMarkers(
            this.nearby.hits, this.location.lat, this.location.lon);
        }
      }
    },
    handleLocationChanged: function(_eventObject) {
      let _l=_eventObject['location'];

      this.location.lat=_l['lat'];
      this.location.lon=_l['lon'];
      this.location.placename=_l['placename'];
      this.location.gmapSuggestedPlacename=_l['gmapSuggestedPlacename'];
    }

  }
};
</script>
