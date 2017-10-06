// main.js
var Vue = require('vue')
var App = require('./vue/lecture-app.vue')

new Vue({
  el: '#lecture-app',
  render: function (createElement) {
    return createElement(App)
  }
})
