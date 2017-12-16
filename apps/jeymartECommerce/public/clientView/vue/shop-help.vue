<style></style>

<template>
  <div>
    so called shop-help component (empty for now)
    <p/>
    {{testMessage()}}<p/>
    <router-link to="help">
      fwd to "help.vue" again
    </router-link>

  </div>
</template>

<script>
/*
 *  model (if any for this component)
 */
function _model_shop_help(_instance) {
  return {
    'instance': _instance,
    'testMsg': 'this is a testing message for shop-help.vue'
  };
}

module.exports = {
  name: 'shop_help',
  data: function() {
    return new _model_shop_help(this);
  },
  mounted: function() {
    // ** do something for the mounted event, e.g. load config file(s)
    //let _instance=this;
  },
  methods: {
    testMessage: function() {
      return this.testMsg;
    }

  }
};
</script>
