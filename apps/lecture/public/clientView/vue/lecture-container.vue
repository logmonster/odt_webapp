<!--
  * ==========================================================================
  * if you follow the offical example, you would create a vue-app
  * if you want to create re-usable componets; you would need to have
  *   Vue.component('id', function() { ... });
  * to register the component and make it usable in the vue-app created beforehand
  * ==========================================================================
-->
<style>
</style>

<template>
  <div>
    <!-- :xxx="" means binding an object's value to a field; won't work if no object exists -->
    <lecture-navigator
      menu-item-selected='DEmO'></lecture-navigator>

    <div class="container lecture-container-content-div">
      <div class="row">
        <div class="col-sm-4 col-md-4">
          <lecture-container-sidemenu
            v-on:testing="testPlz"
            :pickedChapter='pickedChapter'
            :pickedItemId='pickedItemId'></lecture-container-sidemenu>
        </div>
        <div class="col-sm-8 col-md-8">
          <router-link to="/chp02/query_by_event_handler">Go to Foo</router-link>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// model (sort of vue-model)
function _model_lc() {
  return {
    pickedChapter: 'chp02',
    pickedItemId: '01',
    instance: this
  };
}
// model instance
var _model;

module.exports = {
  data: () => {
    // create the model object
    if (!_model) {
      _model = new _model_lc();
    }
    return _model;
  },
  mounted: () => {
    console.log('### being mounted');
    Vue.$on('testing', function(_chp, _itemId, _evt) {
      //console.log('*** inside container parent => '+_chp+', '+_itemId);
      _model.pickedChapter=_chp;
      _model.pickedItemId=_itemId;
      console.log(_model.pickedChapter);
    });
  },
  methods: {
    testPlz: () => {
      console.log('## inside parent finally');
      console.log(arguments);
    }
  }
}
</script>
