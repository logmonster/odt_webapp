<script>
/* ------------------------------------------------------------------------
 *  aim: setup the paths and its corresponding Components for vue-router
 * ------------------------------------------------------------------------ */
var Router = require('vue-router');
var C2_QueryByEventHandler = require('./chp02/query_by_event_handler.vue');

module.exports = {
  routes: [
    { path: '/',
      name: '/',
      component: require('./lecture-help.vue')
    },
    { path: '/chp02/query_by_event_handler',
      name: '/chp02/query_by_event_handler',
      component: C2_QueryByEventHandler
    }
  ]
};
</script>
