<style>
</style>

<template>
  <div class='header-navigation' style="">
    <div class='header-navigation-title' style="">
      Jey-mart
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </div>

    <!-- basic search textInput -->
    <div class="header-navigator-searchbar">

<!-- ### change to popup somehow -->
      <a class="nav-link dropdown-toggle waves-effect waves-light _s_header_font_color"
        id="navbarDropdownMenuLink" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="true">
        <span class='_s_header_font_color'> Categories</span>
      </a>
      <div class="dropdown-menu dropdown-default dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
        <div>
          <a class="dropdown-item waves-effect waves-light" href="#">all</a>
          <a class="dropdown-item waves-effect waves-light" href="#">fashion</a>
        </div>
      </div>
<!-- ### change to popup somehow -->

      <input class='header-navigator-searchbar-text' />
      <div class="header-navigator-searchbar-icon">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    </div>
    <!-- original -->
    <!-- div class="header-navigator-searchbar">
      <input class='header-navigator-searchbar-text' />
      <div class="header-navigator-searchbar-icon">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    </div -->

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
  props: [ 'menuItemSelected' ],
  methods: {
    homeClicked: () => {
      VueRouter.push({ name: '/' });
    }
  }
};

</script>
