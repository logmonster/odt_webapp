<script>

const GMAP_GEOCODE_API_ENTRY_POINT='https://maps.googleapis.com/maps/api/geocode/json?language=en&';

let _apiKey=undefined;

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

  createNearbyTaxiMarkers: function(_hits) {
    if (_hits) {
      let _markerMap={};

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

      console.log(_markerMap);

    }
  }


};
</script>
