<script>
/* ------------------------------------------------------------------------
 *  aim: setup the paths and its corresponding Components for vue-router
 * ------------------------------------------------------------------------ */
var Router = require('vue-router');

module.exports = {
  routes: [
    { path: '/',
      name: '/',
      component: require('./shop-landing.vue')
      /* useful when you need multiple router-view(s) to be shown at the same level
      components: {
        default: require('./shop-landing.vue'),
        rvSpyPanel: require('./shop-help.vue')
      }*/
    },
    { path: '/help',
      name: '/help',
      component: require('./shop-help.vue')
    }
  ]
};
</script>
