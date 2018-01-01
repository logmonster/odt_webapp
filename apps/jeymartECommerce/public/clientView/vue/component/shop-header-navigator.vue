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
        <i class="fa fa-info-circle header-navigation-icon"
          data-toggle='modal' data-target='#centralModalSm'
          style='font-size: 18px;' aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Info</span>
      </div>
      <div class="header-navigation-pull-right-section-min">
        <i class="fa fa-navicon header-navigation-icon" aria-hidden="true"></i>
      </div>
    </div>

    <!-- modal dialog for help -->
    <div class="modal fade" id="centralModalSm" tabindex="-1"
      role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <!--Jumbotron-->
        <div class="jumbotron text-center blue-grey lighten-5 " style="border-radius: 3px;">
          <!--Title-->
          <h1 class="card-title h2-responsive font-bold mt-3">
            <strong>Jey-mart eCommerce website
              <i class="fa fa-copyright" aria-hidden="true"></i>
            </strong></h1>
          <!--Subtitle-->
          <p class="pt-2 font-bold indigo-text">
            <strong>Backend and UI Engineer: Jason Wong</strong></p>
          <!--Text-->
          <div class="d-flex justify-content-center">
              <p class="card-text my-3" style="max-width: 43rem;">
                <ul>
                  <li>elasticsearch Javascript client</li>
                  <li>chapter 04 “case study - eCommerce website"</li>
                </ul>
                2018, January
              </p>
          </div>
          <hr class="my-4 pb-2">
          <!--button class="btn blue-gradient btn-rounded">Buy now <i class="fa fa-diamond ml-1"></i></button>
          <button class="btn btn-indigo btn-rounded">Download <i class="fa fa-download ml-1"></i></button-->
        </div>
        <!--Jumbotron-->

      </div>
    </div>





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
