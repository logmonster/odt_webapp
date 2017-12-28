<style>
</style>

<template>
  <div class='header-navigation' style="">
    <div class='header-navigation-title pull-left' style="" @click='handleHomeClick()' >
      Jey-mart
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </div>
    <span :class='getSearchbarVisibleClass()'>
      <shop-searchbar style='margin-top: 4px;'
        :data="data"
        :dataSuggest="dataSuggest"
        ></shop-searchbar>
    </span>
    <!-- this is required if the shop-searchbar is hidden (need an element to be there) -->
    <span>&nbsp;</span>

    <!-- right hand side icons or menu items -->
    <div class="header-navigation-pull-right-section" >
      <div class="header-navigation-pull-right-section-vis header-navigation-pull-right-section-top-padding">
        <!--i class="fa fa-shopping-bag header-navigation-icon" aria-hidden="true"></i>
        <i class="fa fa-wrench header-navigation-icon" aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Categories</span>

        <i class="fa fa-envelope header-navigation-icon"></i>
        <span class="header-navigator-icon-label">Promotion</span-->

        <i class="fa fa-wrench header-navigation-icon"
          @click='handleAdvSearchClick()'
          aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Advance Search</span>
        <i class="fa fa-info-circle header-navigation-icon" style='font-size: 18px;' aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Info</span>
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
    'instance': _instance,
    'searchbarVisibility': true
  };
}

module.exports = {
  name: 'shop-header-navigator',
  data: function() {
    return new _model_shop_header_navigator(this);
  },
  props: [ 'menuItemSelected', 'data', 'dataSuggest' ],
  methods: {
    /*
     *  go back to "home"
     */
    handleHomeClick: function() {
      this.searchbarVisibility=true;
      window.VueRouter.push({
        name: "main"
      });
      //clientView/view/shop.html
    },

    handleAdvSearchClick: function() {
      //window.Vue.$emit('setSearchbarVisibility', { 'visibility': false });
      this.searchbarVisibility=false;
      window.VueRouter.push({
        name: '/advanceSearch'
      });
    },

    getSearchbarVisibleClass: function() {
      let _css={};
      if (this.searchbarVisibility==true) {
        _css['showing-inline']=true;
        _css['hiding']=false;
      } else {
        _css['showing-inline']=false;
        _css['hiding']=true;
      }
      return _css;
    }

  }
};

</script>
