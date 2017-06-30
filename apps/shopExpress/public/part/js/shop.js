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
/**
 *  ref: https://mdbootstrap.com/javascript/tooltips/
 */
function _initBootstrapTooltip() {
  // Tooltips Initialization
  $(function () {
    //$('#iInfo').tooltip();  // if just started a specific tooltip
    $('[data-toggle="tooltip"]').tooltip()
  });
}

// ### common functions (end) ###

function showQuery(_e, _queryIdx, _queryId) {
  _stopEvent(_e);

  var _arr=_parseQueriesArray(false);
  var _q=_arr[_queryIdx];

  // display
  $('#divQueryTitle').html('Query Info');
  $('#txtQueryContent').html(_q);
  $('#btnShowQuery').click();
}

function copyQueryToClipboard() {
  var _t=$('#txtQueryContent');
  var _success=false;

  // select contents of the textarea
  _t[0].select();
  _success=document.execCommand('copy');
  // deselects all
  window.getSelection().removeAllRanges();

  if (!_success) console.log('*** cannot copy query to clipboard...');
}

function runSearchBoxSearch() {
  var _t = $('#txtSearchBar').val();
  console.log(_t);
}
