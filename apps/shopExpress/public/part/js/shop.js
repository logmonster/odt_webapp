function _test() {
  console.log('** _test method called **');
}

// ### common variables ###
var _qs=[];

// ### common functions ###
function _stopEvent(_e) {
  if (_e) {
    _e.preventDefault();
    _e.stopPropagation();
  }
}
function _parseQueriesArray(_refresh) {
  if (_refresh==true || _qs.length==0) {
    _qs=$('#divQueries').html().trim().split('::');
    // remove the last entry (as it is just for completeness during template creation)
    _qs.splice(_qs.length-1,1);
  }
  return _qs;
}
// ### common functions (end) ###

function showQuery(_e, _queryIdx, _queryId) {
  _stopEvent(_e);

  var _arr=_parseQueriesArray(false);
  var _q=_arr[_queryIdx];

  // display

}
