
var Vue = require('vue')
var NYC = require('./vue/nyc-main.vue')

// registration (important)
Vue.component('nyc-header-navigator', require('./vue/component/nyc-header-navigator.vue'));
Vue.component('nyc-control-panel', require('./vue/component/nyc-control-panel.vue'));
Vue.component('nyc-gmap', require('./vue/component/nyc-gmap.vue'));
Vue.component('nyc-spy-panel', require('./vue/component/spy-panel.vue'));

// setup Router
var Router = require('vue-router');
var Routes = require('./vue/router.vue');

// # let vue-router operationable
// # need to create an instance of the vue-router to work
Vue.use(Router);
var router = new Router(Routes);

// # setup a "bus" for inter-components communication (MUST for bundled apps)
window.Vue = new Vue();
window.VueRouter = router;
window.ajaxUtil = require('./vue/util/jQueryAjaxUtil.vue');
window.gmapUtil = require('./vue/util/gmapUtil.vue');
//window.windowEventUtil = require('./vue/util/windowEventUtil.vue');
//window.collectionUtil = require('./vue/util/collectionUtil.vue');
//window.lectureUtil = require('./vue/util/LectureUtil.vue');

let app = new Vue({
  el: '#nyc-app',
  router, //routes: new Router(Routes),
  render: function (createElement) {
    return createElement(NYC)
  }
});
