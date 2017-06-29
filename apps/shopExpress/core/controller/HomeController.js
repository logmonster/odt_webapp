var _es=require('elasticsearch');
var _builder=require('elastic-builder');

const ODT_INDEX='odt_shopexpress_real_trx';
const ODT_TYPE_TRX='trx';

var _client=null;

// get es client
function _getClient() {
  if (!_client) {
    _client=new _es.Client({
      host: ['localhost:9200'],
      log: 'debug'
    });
  }
  return _client;
}


function _getCategories(req, res) {
  var _qs=[];
  var _q1=_builder.requestBodySearch().
    size(0).
    agg(_builder.termsAggregation('categories', 'category.keyword').order('_term', 'asc'));

  // send the queries to the front end when necessary
  _qs.push(JSON.stringify(_q1.toJSON(), null, 2));

  /*
   *  run multi-search (running several queries in 1 request,
   *  handy when you need to preload some data based on different queries)
   *
   *  each UI component might need some data from the indice(s), hence
   *  running a msearch is useful and improves UX by getting all results in
   *  1 batch and prevents clunky UI updates
   */
  _getClient().msearch({
    body: [
      { index: ODT_INDEX, type: ODT_TYPE_TRX },
      _q1.toJSON()
    ]
  }).then(function(data) {
    res.render('shop/home', {
      'categories': data['responses'][0]['aggregations']['categories']['buckets'],
      'queries': _qs
    });



  }, function(err) {
    console.log('### damn');
    console.log(err);
  });

}




module.exports={
  getCategories: _getCategories
};
