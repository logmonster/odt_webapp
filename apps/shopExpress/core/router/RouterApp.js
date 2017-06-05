
var path=require('path');

function _setRoutes(_router, _app, _multer) {
  // set basic testing routes
  _setTestRoutes(_router, _app, _multer);

  _app.use('/', _router);
}

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

  _app.post('/testUpload', _multer.array('fAvatar'), function (req, res, next) {
    // req.body contains the text fields
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);
    res.send('testUpload post');
  });
}


module.exports = {
  setRoutes: _setRoutes
};
