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
    },
    { path: '/chp02/query_by_promise',
      name: '/chp02/query_by_promise',
      component: require('./chp02/query_by_promise.vue')
    },
    { path: '/chp03/create_index_n_mapping',
      name: '/chp03/create_index_n_mapping',
      component: require('./chp03/create_index_n_mapping.vue')
    },

    { path: '/chp03/index_with_id',
      name: '/chp03/index_with_id',
      component: require('./chp03/index_with_id.vue')
    },
    { path: '/chp03/index_without_id',
      name: '/chp03/index_without_id',
      component: require('./chp03/index_without_id.vue')
    },
    { path: '/chp03/create_doc',
      name: '/chp03/create_doc',
      component: require('./chp03/create_index_n_mapping.vue')
    },
    { path: '/chp03/read_doc',
      name: '/chp03/read_doc',
      component: require('./chp03/create_index_n_mapping.vue')
    },
    { path: '/chp03/update_doc',
      name: '/chp03/update_doc',
      component: require('./chp03/create_index_n_mapping.vue')
    },
    { path: '/chp03/delete_doc',
      name: '/chp03/delete_doc',
      component: require('./chp03/create_index_n_mapping.vue')
    }

  ]
};
</script>
