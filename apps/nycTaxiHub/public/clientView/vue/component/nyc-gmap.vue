<template>
  <div style="padding-left: 2px; padding-right: 2px;">
    <div class='gmap-status-bar'>status:</div>
    <div id='nyc-gmap-map' class='gmap-map-container' ></div>
  </div>
</template>

<script>
function _model_n_gmap(_inst) {
  return {
    'instance': _inst,
    'nearby': {
      'hits': undefined
    }
  };
} // end -- model

module.exports={
  name: 'n_gmap',
  data: function() {
    return new _model_n_gmap(this);
  },
  mounted: function() {
    let _instance=this;

    window.Vue.$on('nearbyTaxiDataChanged', function(_eventObject) {
      _instance.handleNearbyTaxiDataChanged(_eventObject);
    });

  },
  props:[],
  watch: {},
  methods: {

    handleNearbyTaxiDataChanged: function(_eventObject) {
      //console.log(_eventObject);
      if (_eventObject) {
        if (_eventObject['data'] && _eventObject['data']['hits']) {
          this.nearby.hits=_eventObject['data']['hits']['hits'];
          window.gmapUtil.createNearbyTaxiMarkers(this.nearby.hits);
        }
      }

    }

  }
};
</script>
