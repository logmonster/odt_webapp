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
    'boundingbox': undefined,

    'geopolygon': undefined,
    'geopolygonPoints': []

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
    window.Vue.$on('geopolygonTaxiDataChanged', function(_eventObject) {
      _instance.handleGeopolygonTaxiDataChanged(_eventObject);
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
    handleGeopolygonTaxiDataChanged: function(_eventObject) {
      if (_eventObject) {
        if (_eventObject['data'] && _eventObject['data']['hits']) {
          let _hits=_eventObject['data']['hits']['hits'];
          // reset markers first
          window.gmapUtil.resetAllMarkersOnMap();
          window.gmapUtil.createGeopolygonTaxiMarkers(
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
      // reset status info and polygons and boundingbox
      this.resetStatusInfo();

      if (_eventObject) {
        //'control': 'nyc-nearby'
        this.controlView=_eventObject['control'];
        if ('nyc-geopolygon'==this.controlView) {
          this._showGeopolygon();
        }
      }
    },

    resetStatusInfo: function() {
      this.statusInfo=undefined;
      this.removeBoundingbox();
      this._removeGeopolygon();
    },

    _showGeopolygon: function() {
      let _instance = this;

      if (window.gmapInstance) {
        let _boundsDiff=this._getBoundsDiffByZoom(
          window.gmapInstance.getZoom());
        let _gPolygon=window.gmapUtil.showGeopolygon(
          this.location, _boundsDiff);

        if (_gPolygon) {
          this.geopolygon=_gPolygon;
          this.geopolygon.setMap(window.gmapInstance);
          // add event listener
          google.maps.event.addListener(
            this.geopolygon.getPath(), 'insert_at',
            function(_idx) {
              _instance._geopolygonInsertAt(_idx);
            }
          );
          google.maps.event.addListener(
            this.geopolygon.getPath(), 'set_at',
            function(_idx, _obj) {
              _instance._geopolygonSetAt(_idx, _obj);
            }
          );
          // get the first geopolygon co-ord(s)
          setTimeout(function() {
            _instance._getGeoploygonPoints();
          }, 200);
        }
      }
    },
    _removeGeopolygon: function() {
      if (this.geopolygon) {
        // remove event listeners
        google.maps.event.clearListeners(
          this.geopolygon.getPath(), 'insert_at');
        google.maps.event.clearListeners(
          this.geopolygon.getPath(), 'set_at');

        // setMap
        this.geopolygon.setMap(null);
        this.geopolygon=undefined;
      }
    },

    _geopolygonInsertAt: function(_idx) {
      //console.log('insert-at: '+_idx);
      this._getGeoploygonPoints();
    },
    _geopolygonSetAt: function(_idx, _obj) {
      //console.log('set-at: '+_idx);
      // update the polygon co-ordinates
      this._getGeoploygonPoints();
    },

    _getGeoploygonPoints: function() {
      let _pointsArray=undefined;
      if (this.geopolygon.getPaths()) {
        /*
         *  the data structure for getPaths() =>
         *  MVCArray< MVCArray< LatLng > >
         */
        _pointsArray=this.geopolygon.getPaths().getArray();
        if (_pointsArray) {
          _pointsArray=_pointsArray[0].getArray();
        }
        if (_pointsArray) {
          // reset
          this.geopolygonPoints=[];

          let _gPoints=this.geopolygonPoints;
          _pointsArray.forEach(function(_point, _idx) {
            _gPoints.push({ lat: _point.lat(), lon: _point.lng() });
          });
          window.Vue.$emit('geopolygonPointsChanged', {
            geopolygonPoints: this.geopolygonPoints
          });
        } // end -- if pointsArray is valid
      }
    },


    /*
     *  estimate the boundsDiff to form a rectangle based on the
     *  zoom value of the map
     */
    _getBoundsDiffByZoom: function(_mapZoom) {
      let _boundsDiff=-1;
      switch (_mapZoom) {
        case 22:
          _boundsDiff=0.00003;
          break;
        case 21:
          _boundsDiff=0.00005;
          break;
        case 20:
          _boundsDiff=0.0001;
          break;
        case 19:
          _boundsDiff=0.0003;
          break;
        case 18:
          _boundsDiff=0.0004;
          break;
        case 17:
          _boundsDiff=0.001;
          break;
        case 16:
          _boundsDiff=0.001;
          break;
        case 15:
          _boundsDiff=0.002;
          break;
        case 14:
          _boundsDiff=0.003;
          break;
        case 13:
          _boundsDiff=0.005;
          break;
        case 12:
          _boundsDiff=0.025;
          break;
        case 11:
          _boundsDiff=0.05;
          break;
        case 10:
          _boundsDiff=0.075;
          break;
        case 9:
          _boundsDiff=0.1;
          break;
        case 8:
          _boundsDiff=0.125;
          break;
        case 7:
          _boundsDiff=0.45;
          break;
        case 6:
          _boundsDiff=1.5;
          break;
        case 5:
          _boundsDiff=3.5;
          break;
        case 4:
          _boundsDiff=5;
          break;
        case 3:
          _boundsDiff=15;
          break;
        case 2:
          _boundsDiff=15;
          break;
        case 1:
          _boundsDiff=15;
          break;
        default:
         _boundsDiff=0.1;
      }
      return _boundsDiff;
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
          let _boundsDiff=this._getBoundsDiffByZoom(_mapZoom);

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

        this.boundingboxMode=false;
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
