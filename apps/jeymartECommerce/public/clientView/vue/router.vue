<script>
/* ------------------------------------------------------------------------
 *  aim: setup the paths and its corresponding Components for vue-router
 * ------------------------------------------------------------------------ */
var Router = require('vue-router');

module.exports = {
  routes: [
    { path: '/',
      name: '/',
      component: require('./shop-landing.vue'),
      children: [
        { path: 'main',
          name: 'main',
          component: require('./component/shop-landing-info.vue')
        },
        { path: 'listing/:hash',
          name: 'listing/:hash',
          component: require('./component/shop-landing-listing.vue')
        }
      ]
      /* useful when you need multiple router-view(s) to be shown at the same level
      components: {
        default: require('./shop-landing.vue'),
        rvSpyPanel: require('./shop-help.vue')
      }*/
    },
    { path: '/itemDetails/:hash',
      name: '/itemDetails/:hash',
      component: require('./component/shop-item-details.vue')
    },
    { path: '/help',
      name: '/help',
      component: require('./shop-help.vue')
    }
  ]
};
</script>
