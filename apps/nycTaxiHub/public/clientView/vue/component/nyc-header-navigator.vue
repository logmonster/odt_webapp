<template>
  <div class='header-navigation' style="">
    <div class='header-navigation-title pull-left' style="" @click='handleHomeClick()' >
      NYC Taxi Hub
      <i class="fa fa-cab" aria-hidden="true"></i>
    </div>
    <!-- this is required if the shop-searchbar is hidden (need an element to be there) -->
    <span>&nbsp;</span>

    <!-- right hand side icons or menu items -->
    <div class="header-navigation-pull-right-section" >
      <div class="header-navigation-pull-right-section-vis header-navigation-pull-right-section-top-padding">
        <!--i class="fa fa-wrench header-navigation-icon"
          @click='handleAdvSearchClick()'
          aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Advance Search</span-->
        <i class="fa fa-info-circle header-navigation-icon"
          data-toggle='modal' data-target='#centralModalSm'
          style='font-size: 18px;' aria-hidden="true"></i>
        <span class="header-navigator-icon-label">Info</span>
      </div>
      <div class="header-navigation-pull-right-section-min header-navigation-pull-right-section-top-padding">
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
            <strong>NYC Taxi Hub
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
                  <li>chapter 05 “case study: geo-location"</li>
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
function _model_n_h_navigator(_inst) {
  return {
    'instance': _inst
  };
} // end -- model

module.exports={
  name: 'n_h_navigator',
  data: function() {
    return new _model_n_h_navigator(this);
  },
  props: [],
  mounted: function() {

  },
  watch: {

  },
  methods: {
    /*
     *  return to the Main page
     */
    handleHomeClick: function() {
console.log('home click');
    }
  }
};
</script>
