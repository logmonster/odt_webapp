
var path=require('path');
var _homeCtrl=require('./../controller/HomeController');

/**
 *  main method to set route(s)
 */
function _setRoutes(_router, _app, _multer) {
  // set basic testing routes
  //_setTestRoutes(_router, _app, _multer);

  _setRoute01(_router, _app, _multer);

  _app.use('/', _router);
}

/**
 *  setup route(s) related to XXXX
 */
function _setRoute01(_router, _app, _multer) {
  _router.get('/', function(req, res) {
    _homeCtrl.getCategories(req, res);

    /*res.render('shop/home', {
      'title': ' created successfully',
      'link': '/odt3'
    });*/

  });
}

/**
 *  setup of testing related route(s); these routes should be ignored
 *  during production
 */
function _setTestRoutes(_router, _app, _multer) {
  // set default path
  _router.get('/', function(req, res) {
    res.sendFile( path.join(__dirname, '../../view/shop.html') );
  });

  // typically just for testing
  _router.route('/test').get(function(req, res) {
    res.sendFile( path.join(__dirname, '../../view/formTest.html') );

  }).post(_multer.array('fAvatar'), function(req, res) {
    if (req.body && req.body['hType']=='basic') {
      console.log('** basic form var');
      console.log(req.body);
    } else if (req.body && req.body['hType']=='binary') {
      console.log('** binary / multi-part form data');
      console.log(req.body);
      console.log(req.file);
      console.log(req.files);
      //console.log(req);
    }
    res.send('inside test POST');
  });
}


module.exports = {
  setRoutes: _setRoutes
};
