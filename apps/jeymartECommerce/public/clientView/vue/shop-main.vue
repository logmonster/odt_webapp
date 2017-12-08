<style></style>

<template>
  <div>
    <shop-header-navigator></shop-header-navigator>


main content


    <!--router-view></router-view-->


  </div>
</template>

<script>
/*
 *  model
 */
function _model_shop_main(_instance) {
  return {
    'instance': _instance
  };
}

module.exports={
  data: function() {
    return new _model_shop_main(this);
  },
  mounted: function() {
    // anything you need to load during mounted event (sort of like when the view is attached)
  },
  methods: {
    testing: function() {
      return this;
    }
  }
};

</script>
