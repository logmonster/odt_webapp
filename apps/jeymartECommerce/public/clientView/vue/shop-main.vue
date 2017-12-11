<style></style>

<template>
  <div>
    <!-- common header -->
    <shop-header-navigator></shop-header-navigator>
    <div class="main-container">
      <shop-searchbar></shop-searchbar>
      <p/>main content
    </div>
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
    //console.log(window.ajaxUtil);
    // run a msearch query so that multiple init query(s) could be run during the "mounted" event
    window.ajaxUtil.GET(
      '/api/shopInitGet',
      null,
      function(_data, _status, _jqXHR) {
        console.log(_data);
      },
      function(_jqXHR, _status, _err) {
        console.log('* shit happened');
        console.log(_err);
      }
    );


  },
  methods: {
    testing: function() {
      return this;
    }
  }
};

</script>
