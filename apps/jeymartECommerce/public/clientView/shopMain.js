
var Vue = require('vue')
var Shop = require('./vue/shop-main.vue')

// registration (important)
//Vue.component('lecture-code-snippet', require('./vue/lecture-code-snippet-component.vue'));
Vue.component('shop-header-navigator', require('./vue/component/shop-header-navigator.vue'));

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

let app = new Vue({
  el: '#shop-app',
  router, //routes: new Router(Routes),
  render: function (createElement) {
    return createElement(Shop)
  }
});