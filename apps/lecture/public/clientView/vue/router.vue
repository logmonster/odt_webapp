<script>
var Router = require('vue-router');
var C2_QueryByEventHandler = require('./chp02/query_by_event_handler.vue');

module.exports = {
  routes: [
    { path: '/',
      name: '/',
      component: C2_QueryByEventHandler
    },
    { path: '/chp02/query_by_event_handler',
      name: '/chp02/query_by_event_handler',
      component: C2_QueryByEventHandler
    }
  ]
};
</script>
