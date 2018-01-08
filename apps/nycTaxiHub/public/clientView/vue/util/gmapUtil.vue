<script>

const GMAP_GEOCODE_API_ENTRY_POINT='https://maps.googleapis.com/maps/api/geocode/json?language=en&';

let _apiKey=undefined;

// array of Marker(s) for display
let _nearbyMarkers=[];
let _nycCenterMarker=undefined;
let _centerMarker=undefined;

let _setCenterMarker=function(_lat, _lon) {
  // remove the nyc center marker (keep it there still, don't remove it from mem)
  _nycCenterMarker.setMap(null);
  // reset previous set center marker if any
  if (_centerMarker) {
    _centerMarker.setMap(null);
  }
  if (window.gmapInstance) {
    _centerMarker= new google.maps.Marker({
      position: { lat: _lat, lng: _lon },
      map: window.gmapInstance,
      animation: google.maps.Animation.BOUNCE
    });
  }
}

module.exports={

  /*
   *  retreive the geocode information based on the given place name
   * API: google geocode
   */
  getLatLonByPlacename: function(_placename, _cb) {
    // https://maps.googleapis.com/maps/api/geocode/json?address=???
    let _addr=null;
    if (_placename) {
      _addr=encodeURI(GMAP_GEOCODE_API_ENTRY_POINT+'address='+_placename);
    }
    if (_addr && window.ajaxUtil) {
      // _url, _payloads, _doneCallback, _failCallback, _finallyCallback
      window.ajaxUtil.GET(
        _addr,
        {},
        _cb,
        null,
        null
      );
    }
  },

  /**
   *  set the gmap api key
   */
  setApiKey: function(_key) {
    this._apiKey=_key;
  },

  setNycCenterMarker: function() {
    if (window.gmapInstance) {
      _nycCenterMarker= new google.maps.Marker({
        position: { lat: 40.7127753, lng: -74.0059728 },
        map: window.gmapInstance,
        animation: google.maps.Animation.BOUNCE
      });
    }
  },

  setCenterMarker: function(_lat, _lon) {
    _setCenterMarker(_lat, _lon);
  },

  /**
   *  create and add markers on the gmap
   */
  createNearbyTaxiMarkers: function(_hits, _centerLat, _centerLon) {
    if (_hits) {
      let _markerMap={};

      _setCenterMarker(_centerLat, _centerLon);
      // create a map to filter out duplicated entries
      _hits.forEach(function(_hit, _idx) {
        let _src=_hit['_source'];
        let _loc=_src['pickup_location']['location']
        let _markerKey=_loc['lat']+','+_loc['lon'];

        if (_markerMap[_markerKey]) {
          _markerMap[_markerKey]['count']=_markerMap[_markerKey]['count']+1;

        } else {
          _markerMap[_markerKey]={
            lat: _loc['lat'],
            lon: _loc['lon'],
            count: 1
          };
        }
      });

      if (window.gmapInstance) {
        let _keys=Object.keys(_markerMap);
        // icon image
        let _icon='/image/taxi_map.png';
        // bounds object
        let _mapBounds=new google.maps.LatLngBounds();

        _keys.forEach(function(_key, _idx) {
          let _marker=_markerMap[_key];
          let _gMarker= new google.maps.Marker({
            position: { lat: _marker['lat'], lng: _marker['lon'] },
            map: window.gmapInstance,
            title: (_marker['count']+' taxis at this point'),
            icon: _icon
          });
          _nearbyMarkers.push(_gMarker);
          // update the bounds
          _mapBounds.extend(_gMarker.position);
        });
        // add bounds to the centerMarker too
        _mapBounds.extend(_centerMarker.position);
        window.gmapInstance.fitBounds(_mapBounds);

      } else {
        console.log('something wrong, the GMap instance is not available');
      } // end -- if (gmapInstance)
    } // end -- if (_hits) valid
  },

  resetAllMarkersOnMap: function() {
    if (_nearbyMarkers && _nearbyMarkers.length>0) {
      _nearbyMarkers.forEach(function(_marker, _idx) {
        _marker.setMap(null);
      });
      _nearbyMarkers=[];
    }
  }


};
</script>
