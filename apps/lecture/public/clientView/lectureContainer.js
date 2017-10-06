// main.js
var Vue = require('vue')
var App = require('./vue/lecture-container.vue')

// MUST load the component(s)
// component setup
var LectNav = require('./vue/lecture-container-navigator.vue')
var LectSidemenu = require('./vue/lecture-container-sidemenu.vue');

// registration (important)
Vue.component('lecture-navigator', LectNav);
Vue.component('lecture-container-sidemenu', LectSidemenu);

// setup Router
var Router = require('vue-router');
var Routes = require('./vue/router.vue');

Vue.use(Router);

var router = new Router(Routes);
//console.log(router);

// this is a starting-point (app)
// setup the global Vue instance
window.Vue = new Vue();

let app = new Vue({
  el: '#lecture-container',
  //routes: new Router(Routes),
  router,
  render: function (createElement) {
    return createElement(App)
  }
});

// another way to communicate through "bus" concept
/*window.Vue.$on('testing', function() {
  console.log('fuck yeah, in parent (but... the root level)');
});*/
