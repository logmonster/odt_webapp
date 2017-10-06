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

// this is a starting-point (app)
// setup the global Vue instance
window.Vue = new Vue();

let app = new Vue({
  el: '#lecture-container',
  render: function (createElement) {
    return createElement(App)
  }
});

// another way to communicate through "bus" concept
/*window.Vue.$on('testing', function() {
  console.log('fuck yeah, in parent (but... the root level)');
});*/
