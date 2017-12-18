<template>
  <div>
    <!-- carousel component -->
    <shop-carousel :images='carouselImages' ></shop-carousel>
    <!-- main promotion / information area -->
    <div class="container-fluid landing-main-container">
      <div class='row'>
        <div class='col-sm-12 col-md-3'>
          <shop-facets-control
            mode='button'
            :data='getFacetsDataByType("_cats")'
            label='categories' ></shop-facets-control>
          <p/>
          <shop-facets-control
            mode='button'
            :data='getFacetsDataByType("_brands")'
            label='brands' ></shop-facets-control>
          <p/>
          <shop-facets-control
            mode='button'
            :data='getFacetsDataByType("_ratings")'
            label='ratings' ></shop-facets-control>


        </div>
        <div class='col-sm-12 col-md-9'>
          <!-- showing subview (landing info or listing) -->
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
function _model_shop_landing(_instance) {
  return {
    'instance': _instance,

    'carouselImages': [
      '/image/carousel/carousel01.jpeg',
      '/image/carousel/carousel02.jpeg',
      '/image/carousel/carousel03.jpeg',
      '/image/carousel/carousel04.jpeg'
    ],

    'dataFacets': [],
    'chosenFacetsCriteria': {
      'catList': [],
      'brandList': [],
      'ratingList': []
    }
  };
}

module.exports = {
  name: 'shop-landing',
  data: function() {
    return new _model_shop_landing(this);
  },
  props: [  ],
  mounted: function() {
    let _instance = this;
    /*
     *  issue an event to the parent (since the left hand side panel results
     *  occur more than once, the related logic should not be bounded by a
     *  child component)
     */
    setTimeout(function() {
      /*
       *  ** due to the latency between a mounted component and a
       *    parent component... need a very short timeout
       */
      window.Vue.$emit('getFacetsData', {
        'categories': true,
        'brands': true,
        'ratings': true,
        'callback': _instance.setFacetsData
      });
    }, 100);

    /* -------------------- */
    /*  parent child events */
    /* -------------------- */

    window.Vue.$on('changeRouterView', function(_eventObject) {
      /*
       *  prepare the correct facets criteria object
       *  (preserve the other facets options)
       */
      if (_instance.chosenFacetsCriteria && _eventObject) {
        if (_eventObject['catList']) {
          _instance.chosenFacetsCriteria['catList']=_eventObject['catList'];
        } else if (_eventObject['brandList']) {
          _instance.chosenFacetsCriteria['brandList']=_eventObject['brandList'];
        } else if (_eventObject['ratingList']) {
          _instance.chosenFacetsCriteria['ratingList']=_eventObject['ratingList'];
        }
        window.VueRouter.push({
          name: _eventObject['view'],
          params: {
            hash: _eventObject['hash'],
            catList: _instance.chosenFacetsCriteria['catList'],
            brandList: _instance.chosenFacetsCriteria['brandList'],
            ratingList: _instance.chosenFacetsCriteria['ratingList'],
          }
        });
      } // end -- if (chosenFacetsCriteria and _eventObject are valid)
    });

  },
  methods: {
    /*
     *  callback for getting back the facets data from the parent
     */
    setFacetsData: function(_data) {
      if (_data && _data['responses']) {
        this.dataFacets = _data['responses'];
      }
    },

    /*
     *  helper method to return the required "buckets" for display;
     *  based on the given "_type"
     */
    getFacetsDataByType: function(_type) {
      let _d=[];

      if (this.dataFacets) {
        let _idx=0;
        for (; _idx<this.dataFacets.length; _idx++) {
          let _facet = this.dataFacets[_idx];

          if (_facet['aggregations'][_type]) {
            _d = _facet['aggregations'][_type]['buckets'];
          } // found~
        } // end -- for(dataFacets length)
      }

      return _d;
    }


  }
};
</script>
