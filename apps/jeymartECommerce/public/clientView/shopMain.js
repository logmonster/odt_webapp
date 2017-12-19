
var Vue = require('vue')
var Shop = require('./vue/shop-main.vue')

// registration (important)
//Vue.component('lecture-code-snippet', require('./vue/lecture-code-snippet-component.vue'));
Vue.component('shop-header-navigator', require('./vue/component/shop-header-navigator.vue'));
Vue.component('shop-searchbar', require('./vue/component/shop-searchbar.vue'));
Vue.component('shop-carousel', require('./vue/component/shop-carousel.vue'));
Vue.component('shop-spy-panel', require('./vue/component/shop-spy-panel.vue'));
Vue.component('shop-facets-control', require('./vue/component/shop-facets-control.vue'));
Vue.component('shop-product-display-top5', require('./vue/component/shop-product-display-top5.vue'));
Vue.component('shop-product-item-small', require('./vue/component/shop-product-item-small.vue'));

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
window.throttleUtil = require('./vue/util/uiThrottleUtil.vue');

let app = new Vue({
  el: '#shop-app',
  router, //routes: new Router(Routes),
  render: function (createElement) {
    return createElement(Shop)
  }
});
