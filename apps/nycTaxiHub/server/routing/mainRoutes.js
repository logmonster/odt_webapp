var _path=require('path');

var MainRoutes= function(
  _client, _router, _eBuilder, _defaultQueriesMap, _esInterpretorUtil) {

  return {
    setup: () => {
      _router.route('/').
        get(function(_req, _resp) {
          _resp.sendFile( _path.join(
            __dirname,
            "../../public/clientView/view/redirectToNycTaxiHub.html") );
        }
      );

      return _router;
    }

  };
};

module.exports=MainRoutes;
