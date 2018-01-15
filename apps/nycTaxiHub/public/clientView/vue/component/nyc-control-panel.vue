<template>
  <div class="n-c-panel-container">
    <div class="n-c-panel-title">
      <i class="fa fa-map-marker" aria-hidden="true"></i> Set my location
    </div>
    <!-- lat, lon AND by place name -->
    <div class='n-c-panel-location-container'>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-sm-6 col-md-6'>
            <input
              v-on:blur='handleLocationOnBlur()'
              type='text' v-model='location.lat' placeholder='latitude' />
          </div>
          <div class='col-sm-6 col-md-6'>
            <input
              v-on:blur='handleLocationOnBlur()'
              type='text' v-model='location.lon' placeholder='longitude' />
          </div>
          <div class='col-sm-12 col-md-12'>
            <div style='margin: auto; width: 20px;'>OR</div>
          </div>
          <div class='col-sm-12 col-md-12'>
            <input
              v-on:blur='handleLocationPlacenameOnBlur()'
              type='text' v-model='location.placename' placeholder='location name' />
          </div>
        </div>
      </div>
    </div>
    <!-- function tabs -->
    <div class="n-c-panel-option-pill-header">
      <div
        @click='handlePillClick("nearby")'
        :style='getCssStyleForPills()'
        :class='getCssClassForPills("nearby")'
        class="pointer badge badge-pill">
        <i class="fa fa-map-marker" aria-hidden="true"></i>
        <span v-if='pillChosen=="nearby"'>
          taxi nearby
        </span>
      </div>

      <div
        @click='handlePillClick("boundingBox")'
        :style='getCssStyleForPills()'
        :class='getCssClassForPills("boundingBox")'
        class="pointer badge badge-pill">
        <i class="fa fa-map" aria-hidden="true"></i>
        <span v-if='pillChosen=="boundingBox"'>
          bounding box search
        </span>
      </div>

      <div
        @click='handlePillClick("geoPolygon")'
        :style='getCssStyleForPills()'
        :class='getCssClassForPills("geoPolygon")'
        class="pointer badge badge-pill">
        <i class="fa fa-map-signs" aria-hidden="true"></i>
        <span v-if='pillChosen=="geoPolygon"'>
          geo polygon search
        </span>
      </div>
    </div>
    <!-- class="n-c-panel-option-container" -->
    <div>
      <router-view></router-view>
    </div>


  </div>
</template>

<script>
function _model_n_c_panel(_inst) {
  return {
    'instance': _inst,
    'location': {
      'lat': undefined,
      'lon': undefined,
      'placename': undefined,
      'gmapSuggestedPlacename': undefined
    },
    'pillChosen': 'nearby'
  };
} // end -- model


module.exports={
  name: 'n_c_panel',
  data: function() {
    return new _model_n_c_panel(this);
  },
  props: [],
  mounted: function() {
    let _instance=this;

    window.Vue.$on('getLocation', function(_eventObject) {
      if (_eventObject && _eventObject['callback']) {
        _instance.getLocation(_eventObject['callback']);
      }
    });

    window.Vue.$on('controlChanged', function(_eventObject) {
      let _control=_eventObject['control'];
      if ('nyc-nearby'==_control) {
        _instance.pillChosen='nearby';
      } else if ('nyc-boundingbox'==_control) {
        _instance.pillChosen='boundingBox';
      } else if ('nyc-geopolygon'==_control) {
        _instance.pillChosen='geoPolygon';
      } // end -- if (_control check)
    });

  },
  watch: {},
  methods: {
    getCssStyleForPills: function() {
      return {
        'border-radius': '8rem',
        'font-size': '14px',
        'font-weight': 300,
        'padding-left': '12px',
        'padding-right': '12px',
        'padding-top': '6px',
        'padding-bottom': '6px',
        'margin-bottom': '2px;'
      };
    },
    getCssClassForPills: function(_pill) {
      let _css={};
      if (this.pillChosen==_pill) {
        _css['green']=true;
        _css['grey']=false;
      } else {
        _css['green']=false;
        _css['grey']=true;
      }
      return _css;
    },

    handlePillClick: function(_pill) {
      let _needRouterViewUpdate = (this.pillChosen==_pill)?false:true;

      this.pillChosen=_pill;
      // change router view
      if (_needRouterViewUpdate) {
        window.VueRouter.push({
          name: ('/'+_pill),
          params: {}
        });
      }
    },
    handleLocationOnBlur: function() {
      //console.log(this.location.lat +' x '+this.location.lon + ": place "+this.location.placename);
      window.Vue.$emit('myLocationChanged', {
        'location': this.location
      });
    },
    handleLocationPlacenameOnBlur: function() {
      /*
       *  call handleLocationOnBlur() but before that...
       *  do a place search for lat, lon using gmap api
       */
      window.gmapUtil.getLatLonByPlacename(
        this.location.placename,
        this.setLocationLatLonByPlacename);
    },

    getLocation: function(_callback) {
      if (_callback && this.location) {
        // clone the location information and send to callback
        let _loc={
          'lat': this.location.lat,
          'lon': this.location.lon,
          'placename': this.location.placename,
          'gmapSuggestedPlacename': this.location.gmapSuggestedPlacename
        };
        _callback.call(null, _loc );
      }
    },

    setLocationLatLonByPlacename: function(_data) {
      // update the underneath data model
      if (_data && _data['results']) {
        let _r=_data['results'];

        if (_r.length>0) {
          let _r0=_r[0];

          if (_r0['geometry'] && _r0['geometry']['location']) {
            let _rg=_r0['geometry']['location'];

            this.location.lat=_rg['lat'];
            this.location.lon=_rg['lng'];
            this.location.gmapSuggestedPlacename=_r0['formatted_address'];

            // invoke the generic onblur method
            this.handleLocationOnBlur();
          }
        } // end -- if(length of result check)
      } // end -- if (have results)
    }

  }
};
</script>
