<template>
  <div style="padding-left: 2px; padding-right: 2px;">
    <!-- getCssClassForStatusInfo -->
    <div class='gmap-status-bar'>
      status: {{statusInfo}}
      <span :class='getCssClassForStatusBoundsIcon()'>
        <i title='create boundaries for filtering results'
          class="fa fa-object-ungroup pointer gmap-status-bounds-icon"
          @click='toggleBoundingboxMode()'
          aria-hidden="true"></i>
        <i title='remove the boundary created'
        @click='removeBoundingbox()'
          class="fa fa-trash gmap-status-bounds-icon pointer" aria-hidden="true"></i>
      </span>
      <span class='gmap-status-bounds-help-msg'
        :class='getCssClassForStatusBoundsIconMsg()'>
        drag a bounding box on the map. Toggle icon to exit</span>
    </div>
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
    'statusInfo': undefined,
    'controlView': undefined,

    'boundingboxMode': false,
    'boundingbox': undefined

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
    window.Vue.$on('boundingboxTaxiDataChanged', function(_eventObject) {
      _instance.HandleBoundingboxTaxiDataChanged(_eventObject);
    });

    window.Vue.$on('myLocationChanged', function(_eventObject) {
      _instance.handleLocationChanged(_eventObject);
    });

    window.Vue.$on('controlPanelViewChanged', function(_eventObject) {
      _instance.handleControlPanelViewChanged(_eventObject);
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
        //console.log(_eventObject['dsl']); // debug queryDSL
      }
    },
    HandleBoundingboxTaxiDataChanged: function(_eventObject) {
      if (_eventObject) {
        if (_eventObject['data'] && _eventObject['data']['hits']) {
          let _hits=_eventObject['data']['hits']['hits'];
          // reset markers first
          window.gmapUtil.resetAllMarkersOnMap();
          window.gmapUtil.createBoundingboxTaxiMarkers(
            _hits, this.location.lat, this.location.lon);
        }
      }
    },


    handleLocationChanged: function(_eventObject) {
      let _l=_eventObject['location'];

      this.location.lat=_l['lat'];
      this.location.lon=_l['lon'];
      this.location.placename=_l['placename'];
      this.location.gmapSuggestedPlacename=_l['gmapSuggestedPlacename'];
    },

    handleControlPanelViewChanged: function(_eventObject) {
      if (_eventObject) {
        //'control': 'nyc-nearby'
        this.controlView=_eventObject['control'];
      }
      this.resetStatusInfo();
    },

    resetStatusInfo: function() {
      this.statusInfo=undefined;
      this.removeBoundingbox();
    },

    /*
     *  toggle the boundingbox mode; can drag a bounds when mouse
     */
    toggleBoundingboxMode: function() {
      this.boundingboxMode=!this.boundingboxMode;
      if (window.gmapInstance) {
        if (this.boundingboxMode) {
          window.gmapInstance.setOptions({
            draggable: false
          });
          // calculate the bounds diff based on zoom value
          let _mapZoom=window.gmapInstance.getZoom();
          let _boundsDiff=0;
          switch (_mapZoom) {
            case 13:
              _boundsDiff=0.005;
              break;
            case 11:
              _boundsDiff=0.05;
              break;
            default:
             _boundsDiff=0.1;
          }
          let _bounds={
            north: (this.location.lat + _boundsDiff),
            south: (this.location.lat - _boundsDiff),
            east: (this.location.lon + _boundsDiff),
            west: (this.location.lon - _boundsDiff)
            /*north: 44.599,
            south: 44.490,
            east: -78.443,
            west: -78.649
            0.005*/
          };
          if (this.boundingbox) {
            this.boundingbox.setDraggable(true);
            this.boundingbox.setEditable(true);

          } else {
            this.boundingbox=new google.maps.Rectangle({
              bounds: _bounds,
              editable: true,
              draggable: true
            });
            // add event listener too
            this.boundingbox.addListener('bounds_changed', this.updateBoundingboxGeopoints);
            this.boundingbox.setMap(window.gmapInstance);
          }

        } else {
          window.gmapInstance.setOptions({
            draggable: true
          });
          //this.boundingbox.setMap(null);
          //this.boundingbox=undefined;
          this.boundingbox.setDraggable(false);
          this.boundingbox.setEditable(false);

        }
      } // end -- gmapInstance valid
    },
    updateBoundingboxGeopoints: function() {
      if (this.boundingbox) {
        let _ne=this.boundingbox.getBounds().getNorthEast();
        let _sw=this.boundingbox.getBounds().getSouthWest();

        // emit the bounds changed geoPoint(s)
        window.Vue.$emit('boundingboxBoundsChanged', {
          top: _ne.lat(),
          left: _sw.lng(),
          bottom: _sw.lat(),
          right: _ne.lng()
        });
      }
    },
    removeBoundingbox: function() {
      if (this.boundingbox) {
        this.boundingbox.setMap(null);
        this.boundingbox=undefined;
      }
    },

    getCssClassForStatusBoundsIcon: function() {
      let _css={};
      if ('nyc-boundingbox' != this.controlView) {
        _css['showing-inline']=false;
        _css['hiding']=true;
      } else {
        // bounding box add the boundary button
        _css['showing-inline']=true;
        _css['hiding']=false;
      }
      return _css;
    },
    getCssClassForStatusBoundsIconMsg: function() {
      let _css={};
      if ('nyc-boundingbox' == this.controlView && this.boundingboxMode) {
        _css['showing-inline']=true;
        _css['hiding']=false;
      } else {
        _css['showing-inline']=false;
        _css['hiding']=true;
      }
      return _css;
    }

  }
};
</script>
