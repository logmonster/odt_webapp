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
    },
    { path: '/help',
      name: '/help',
      component: require('./shop-help.vue')
    }
  ]
};
</script>
