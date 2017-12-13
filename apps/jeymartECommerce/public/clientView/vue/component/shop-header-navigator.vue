<style>
</style>

<template>
  <div class='header-navigation' style="">
    <div class='header-navigation-title pull-left' style="">
      Jey-mart
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </div>
    <shop-searchbar style='margin-top: 4px;'
      :data="data"
      :dataSuggest="dataSuggest"
      ></shop-searchbar>
    <!--div class="header-navigation-subtitle" @click="homeClicked()">
      home
    </div-->
    <!--div class="header-navigation-subtitle header-navigation-subtitle-clicked">
      demo
    </div -->
    <!-- right hand side icons or menu items -->
    <div class="header-navigation-pull-right-section" >
      <div class="header-navigation-pull-right-section-vis header-navigation-pull-right-section-top-padding">
        <i class="fa fa-shopping-bag header-navigation-icon" aria-hidden="true"></i>
        <i class="fa fa-wrench header-navigation-icon" aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Categories</span>

        <i class="fa fa-envelope header-navigation-icon"></i>
        <span class="header-navigator-icon-label">Promotion</span>
        <!--i class="fa fa-user-circle header-navigation-icon" aria-hidden="true"></i>
        <i class="fa fa-info header-navigation-icon" aria-hidden="true"></i-->
      </div>
      <div class="header-navigation-pull-right-section-min">
        <i class="fa fa-navicon header-navigation-icon" aria-hidden="true"></i>
      </div>
    </div>
    <!--{{menuItemSelected}} -->
  </div>
</template>

<script>
function _model_shop_header_navigator(_instance) {
  return {
    'instance': _instance
  };
}


module.exports = {
  name: 'shop-header-navigator',
  data: function() {
    return new _model_shop_header_navigator(this);
  },
  props: [ 'menuItemSelected', 'data', 'dataSuggest' ],
  methods: {
    homeClicked: () => {
      VueRouter.push({ name: '/' });
    }
  }
};

</script>
