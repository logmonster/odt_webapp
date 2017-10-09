// main.js
var Vue = require('vue')
var App = require('./vue/lecture-container.vue')

// # MUST load the component(s)
// component setup
var LectNav = require('./vue/lecture-container-navigator.vue')
var LectSidemenu = require('./vue/lecture-container-sidemenu.vue');

// registration (important)
Vue.component('lecture-navigator', LectNav);
Vue.component('lecture-container-sidemenu', LectSidemenu);
Vue.component('lecture-code-snippet', require('./vue/lecture-code-snippet-component.vue'));

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
window.LectureUtil = require('./vue/LectureUtil.vue');

// this is a starting-point (app)
// setup the global Vue instance
let app = new Vue({
  el: '#lecture-container',
  router, //routes: new Router(Routes),
  render: function (createElement) {
    return createElement(App)
  }
});

// another way to communicate through "bus" concept
/*window.Vue.$on('testing', function() {
  console.log('in parent (but... the root level)');
});*/
