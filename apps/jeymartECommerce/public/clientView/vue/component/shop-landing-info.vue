<template>
  <div>
    landing info page~~~~
    TBD<p/>
    <router-link to="listing">
      fwd to "help.vue" again
    </router-link>
  </div>
</template>

<script>
function _model_shop_landing_info(_inst) {
  return {
    'instance': _inst
  };
}

module.exports={
  name: 'shop_landing_info',
  data: function() {
    return new _model_shop_landing_info(this);
  },
  props: [],
  methods: {

  }
};
</script>
