
function ajaxCall(_url, _okCb, _failCb) {
  $.ajax(_url, {
    dataType: 'json',
    error: _failCb,
    success: _okCb
  });
}
