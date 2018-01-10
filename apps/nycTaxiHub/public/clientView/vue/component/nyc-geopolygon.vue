<template>
  <div class="container-fluid" style="margin-top: 12px;">
    <div class='row'>
      <div class='col-sm-12, col-md-12'>
        <div class="n-c-panel-nearby-info-msg"
          :class='getInfoMsgVisibilityClass()'>
          <i class="fa fa-warning" aria-hidden="true"></i>
          {{info.msg}}</div/>
      </div>
    </div>
    <div class='row'>
      <!-- polygon -->

      <!-- button -->
      <div class='col-sm-12 col-md-12' style="margin-top: 8px;">
        <button @click='handleClick()'
          class="btn btn-primary" style="margin-left: 0px;">go</button>
      </div>
    </div>
  </div>
</template>

<script>
function _model_n_geoshape(_inst) {
  return {
    'instance': _inst,
    'location': {
      'lat': undefined,
      'lon': undefined,
      'placename': undefined,
      'gmapSuggestedPlacename': undefined
    },
    'info': {
      'msg': undefined
    }
  };
}

module.exports={
  name: 'n_nearby',
  data: function() {
    return new _model_n_geoshape(this);
  },
  mounted: function() {
    let _instance=this;

    window.Vue.$on('myLocationChanged', function(_eventObject) {
      _instance.handleLocationChanged(_eventObject);
    });

    // actively get the location from the nyc-control-panel
    window.Vue.$emit('getLocation', {
      'callback': _instance.getLocationCallback
    });

    // let nyc-gmap.vue knows nearbyTaxi has been chosen
    window.Vue.$emit('controlPanelViewChanged', { 'control': 'nyc-geopolygon' });
  },
  props: [],
  watch: {},
  methods: {
    getLocationCallback: function(_loc) {
      let _data={ 'location': _loc };
      this.handleLocationChanged(_data);
    },

    handleLocationChanged: function(_eventObject) {
      let _l=_eventObject['location'];

      this.location.lat=_l['lat'];
      this.location.lon=_l['lon'];
      this.location.placename=_l['placename'];
      this.location.gmapSuggestedPlacename=_l['gmapSuggestedPlacename'];

      // reset
      this.info.msg=undefined;
    },

    handleClick: function() {
      console.log('* inside click');
    },

    getInfoMsgVisibilityClass: function() {
      let _css={};
      if (this.info.msg && this.info.msg!='') {
        _css['showing']=true;
        _css['hiding']=false;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    }

  }
};
</script>
