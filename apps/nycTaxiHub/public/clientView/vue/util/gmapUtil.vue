<script>

const GMAP_GEOCODE_API_ENTRY_POINT='https://maps.googleapis.com/maps/api/geocode/json?language=en&';

let _apiKey=undefined;

// array of Marker(s) for display
let _nearbyMarkers=[];
let _nycCenterMarker=undefined;
let _centerMarker=undefined;

// setStatusInfoCb
let _statusInfoCb=undefined;

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
};

let _invokeStatusUpdateCb=function(_updateType, _info) {
  if (_statusInfoCb) {
    _statusInfoCb.call(null, _updateType, _info);
  }
};

let _createMarkers=function(_markerMap) {
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
        animation: google.maps.Animation.DROP,
        title: (_marker['count']+' taxis at this point'),
        icon: _icon
      });
      // add info to status bar
      _gMarker.addListener('click', function() {
        let _pos=_gMarker.getPosition();
        _invokeStatusUpdateCb('nearbyTaxi', {
          'lat': _pos.lat(),
          'lon': _pos.lng()
        });
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
};

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
    _apiKey=_key;
  },
  /*
   *  set the status info update callback
   */
  setStatusUpdateCb: function(_cb) {
    if (_cb) {
      _statusInfoCb = _cb;
    }
  },
  /*
   *  invoke the callback with the given params
   */
  invokeStatusUpdateCb: function(_updateType, _info) {
    _invokeStatusUpdateCb(_updateType, _info);
  },


  /*
   *  set the NYC center marker
   */
  setNycCenterMarker: function() {
    if (window.gmapInstance) {
      _nycCenterMarker= new google.maps.Marker({
        position: { lat: 40.7127753, lng: -74.0059728 },
        map: window.gmapInstance,
        animation: google.maps.Animation.BOUNCE
      });
    }
  },
  /*
   *  set the chosen center marker based on user input
   */
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
      let _geoField='pickup_location';
      _hits.forEach(function(_hit, _idx) {
        let _src=_hit['_source'];
        let _loc=_src[_geoField]['location']
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
      _createMarkers(_markerMap);
    } // end -- if (_hits) valid
  },
  createBoundingboxTaxiMarkers: function(_hits, _centerLat, _centerLon) {
    if (_hits) {
      let _markerMap={};

      _setCenterMarker(_centerLat, _centerLon);
      // create a map to filter out duplicated entries
      let _geoField='pickup_location';
      _hits.forEach(function(_hit, _idx) {
        let _src=_hit['_source'];
        let _loc=_src[_geoField]['location']
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
      _createMarkers(_markerMap);
    } // end -- if (_hits) valid
  },
  createGeopolygonTaxiMarkers: function(_hits, _centerLat, _centerLon) {
    if (_hits) {
      let _markerMap={};

      _setCenterMarker(_centerLat, _centerLon);
      // create a map to filter out duplicated entries
      let _geoField='pickup_location';
      _hits.forEach(function(_hit, _idx) {
        let _src=_hit['_source'];
        let _loc=_src[_geoField]['location']
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
      _createMarkers(_markerMap);
    } // end -- if (_hits) valid
  },

  /*
   *  geopolygon =>
   */
  showGeopolygon: function(_locationObject, _boundsDiff) {
    // get the center marker for polygon reference
    let _gPolygon=undefined;
    let _realCenter=undefined;
    if (_locationObject &&
      !isNaN(_locationObject.lat) &&
      !isNaN(_locationObject.lon)) {
      _realCenter={ lat: _locationObject.lat, lon: _locationObject.lon };

    } else if (_centerMarker) {
      _realCenter={
        lat: _centerMarker.getPosition().lat(),
        lon: _centerMarker.getPosition().lng() };

    } else if (_nycCenterMarker) {
      _realCenter={
        lat: _nycCenterMarker.getPosition().lat(),
        lon: _nycCenterMarker.getPosition().lng() };
    }
    // reset the center marker
    _setCenterMarker(_realCenter.lat, _realCenter.lon);

    // create the geopolygon (lat = height, lon = width from origin)
    let _polygonPaths=[
      { lat: (_realCenter.lat+_boundsDiff), lng: (_realCenter.lon+_boundsDiff) },
      { lat: (_realCenter.lat+_boundsDiff), lng: (_realCenter.lon-_boundsDiff) },
      { lat: (_realCenter.lat-_boundsDiff), lng: (_realCenter.lon-_boundsDiff) },
      { lat: (_realCenter.lat-_boundsDiff), lng: (_realCenter.lon+_boundsDiff) }
    ];
    _gPolygon=new google.maps.Polygon({
      // map is not set for the moment; let the caller handle
      paths: _polygonPaths,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      draggable: true,
      editable: true
    });
    return _gPolygon;
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
