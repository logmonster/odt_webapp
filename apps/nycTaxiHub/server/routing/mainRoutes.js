var _path=require('path');
var _fs=require('fs');

var MainRoutes= function(
  _client, _router, _eBuilder, _defaultQueriesMap, _esInterpretorUtil) {

  // sort of alias
  let _eb=_eBuilder;

  /**
   *  handle the nearby search request
   */
  let handleNycNearbyTaxiSearchGET = function(_req, _resp) {
    let _queryObj=new _eb.RequestBodySearch();
    let _r=_req.query;
    let _size=1000;  // 100
    let _distance=undefined;

    if (_r['size']) {
      _size=parseInt(_r['size'], 10);
    }
    _queryObj.size(_size);

    _distance=_r['distance']+_r['distance_unit'];

    // setup bool query and filter clause
    let _bQ=new _eb.BoolQuery();
    let _filterLst=[];
    let _gPt=new _eb.GeoPoint();
    let _gDQ=null;

    _gPt.lat(parseFloat(_r['lat'], 0.0));
    _gPt.lon(parseFloat(_r['lon'], 0.0));

    _gDQ=new _eb.GeoDistanceQuery('pickup_location.location', _gPt);
    _gDQ.distance( _distance );

    _filterLst.push(_gDQ);
    _bQ.filter(_filterLst);

    // create the sort clause
    /*
    let _sort=new _eb.Sort('dropoff_location.location', 'asc');
    _sort.geoDistance(_gPt);
    _sort.unit(_r['distance_unit']);
    _sort.mode('min');
    _sort.distanceType('arc');

    _queryObj.sort(_sort);
    */
    _queryObj.query(_bQ);

    // msearch body
    let _body=[];
    let _dsl=_queryObj.toJSON();
    _body.push({
      "index": "nyc_taxi_hub_2016_11",
      "type": "doc"
    });
    _body.push(_dsl);

    // run the query
    _client.msearch({
      body: _body
    }).then(function(_data) {
      _resp.send({
        'data': _data,
        'dsl': _dsl
      });
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /*
   *  handle the boundingbox + geo_distance search
   */
  let handleNycBoundingboxSearchGET = function(_req, _resp) {
    let _queryObj=new _eb.RequestBodySearch();
    let _r=_req.query;
    let _size=1000;
    let _distance=undefined;

    if (_r['size']) {
      _size=parseInt(_r['size'], 10);
    }
    _queryObj.size(_size);

    _distance=_r['distance']+_r['distance_unit'];

    // setup bool query and filter clause
    let _bQ=new _eb.BoolQuery();
    let _filterLst=[];
    let _gPt=new _eb.GeoPoint();
    let _gDQ=null;

    _gPt.lat(parseFloat(_r['lat'], 0.0));
    _gPt.lon(parseFloat(_r['lon'], 0.0));

    _gDQ=new _eb.GeoDistanceQuery('pickup_location.location', _gPt);
    _gDQ.distance( _distance );
    _filterLst.push(_gDQ);

    // add the bounding box (geo_bounding_box)
    let _gboundQ=new _eb.GeoBoundingBoxQuery('pickup_location.location');
    _gboundQ.top(parseFloat(_r['boundingbox']['top'], 0.0) );
    _gboundQ.left(parseFloat(_r['boundingbox']['left'], 0.0) );
    _gboundQ.bottom(parseFloat(_r['boundingbox']['bottom'], 0.0) );
    _gboundQ.right(parseFloat(_r['boundingbox']['right'], 0.0) );
    _filterLst.push(_gboundQ);

    // set the filter clause to the bool query
    _bQ.filter(_filterLst);
    _queryObj.query(_bQ);

    // msearch body
    let _body=[];
    let _dsl=_queryObj.toJSON();
    _body.push({
      "index": "nyc_taxi_hub_2016_11",
      "type": "doc"
    });
    _body.push(_dsl);

    // run the query
    _client.msearch({
      body: _body
    }).then(function(_data) {
      _resp.send({
        'data': _data,
        'dsl': _dsl
      });
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /*
   *  handle the geopolygon search
   */
  let handleNycGeopolygonTaxiSearchGET = function(_req, _resp) {
    let _queryObj=new _eb.RequestBodySearch();
    let _r=_req.query;
    let _size=1000;

    if (_r['size']) {
      _size=parseInt(_r['size'], 10);
    }
    _queryObj.size(_size);

    // setup bool query and filter clause
    let _bQ=new _eb.BoolQuery();
    let _filterLst=[];

    // geoPoints
    let _gPoints=_r['geopolygonPoints'];
    let _gPointsArr=[];
    if (_gPoints) {
      _gPoints.forEach(function(_pt, _idx) {
        _gPointsArr.push({
          'lat': (parseFloat(_pt['lat'], 0.0)),
          'lon': (parseFloat(_pt['lon'], 0.0))
        });
      });
    }
    let _gPolygonQ=new _eb.GeoPolygonQuery('pickup_location.location');
    _gPolygonQ.points(_gPointsArr);

    _filterLst.push(_gPolygonQ);
    _bQ.filter(_filterLst);
    _queryObj.query(_bQ);

    // msearch body
    let _body=[];
    let _dsl=_queryObj.toJSON();
    _body.push({
      "index": "nyc_taxi_hub_2016_11",
      "type": "doc"
    });
    _body.push(_dsl);

    // run the query
    _client.msearch({
      body: _body
    }).then(function(_data) {
      _resp.send({
        'data': _data,
        'dsl': _dsl
      });
    }, function(_err) {
      _resp.send(_err);
    }); // end -- msearch
  };

  /**
   *  handle the save GMap api key to the key file
   */
  let handleNycGMapApiKeyPOST = function(_req, _resp) {
    let _apiKey=_req.body['key'];
    let _jAPI={ "google": { "map": undefined } };
    let _done=true;

    if (_apiKey) {
      _jAPI['google']['map']=_apiKey;
      _jAPI=JSON.parse(JSON.stringify(_jAPI));
    }

    try {
      _fs.writeFileSync(
        _path.join(__dirname, "../config/apiKeys.json"),
        JSON.stringify(_jAPI)
      );
    } catch(_err) {
      _done=false;
    }

    _resp.send({
      'done': _done
    });
  };

  /**
   *  handle the check and load of the GMap api file
   */
  let handleNycGMapApiKeyGET = function(_req, _resp) {
    let _apiFile=_path.join(__dirname, "../config/apiKeys.json");
    let _fileStat=null;
    let _ret={
      'exists': false
    };

    try {
      _fileStat=_fs.statSync( _apiFile );
    } catch(_err) {
      // not exists
      console.log('** google api keys file not found **')
    }

    // valid (file exists)
    if (_fileStat) {
      _ret['exists']=true;
      // load the api key
      let _fContent=_fs.readFileSync(_apiFile);
      let _jsonContent=JSON.parse(_fContent);

      _ret['key']=_jsonContent['google']['map'];
    }
    _resp.send(_ret);
  };


  return {
    setup: () => {
      _router.route('/').
        get(function(_req, _resp) {
          _resp.sendFile( _path.join(
            __dirname,
            "../../public/clientView/view/redirectToNycTaxiHub.html") );
        }
      );
      // start of "api" routes
      _router.route('/api/nycNearbyTaxiSearchGET').
        get(function(_req, _resp) {
          handleNycNearbyTaxiSearchGET(_req, _resp);
        }
      );

      // check if google apiKeys.json
      _router.route('/api/nycGMapApiKeyGET').
        get(function(_req, _resp) {
          handleNycGMapApiKeyGET(_req, _resp);
        }
      );
      // save the api key file
      _router.route('/api/nycGMapApiKeyPOST').
        post(function(_req, _resp) {
          handleNycGMapApiKeyPOST(_req, _resp);
        }
      );

      // handle the bondingbox geo_distance search
      _router.route('/api/nycBoundingboxSearchGET').
        get(function(_req, _resp) {
          handleNycBoundingboxSearchGET(_req, _resp);
        }
      );
      _router.route('/api/nycGeopolygonTaxiSearchGET').
        get(function(_req, _resp) {
          handleNycGeopolygonTaxiSearchGET(_req, _resp);
        }
      );




      return _router;
    }

  };
};

module.exports=MainRoutes;
