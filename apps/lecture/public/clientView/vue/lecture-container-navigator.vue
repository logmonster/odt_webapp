<style>
</style>

<template>
  <div class='lecture-container-navigation' style="">
    <div class='lecture-container-navigation-title' style="">
      lecture
      <i class="fa fa-book" aria-hidden="true"></i>
    </div>
    <div class="lecture-container-navigation-subtitle">
      home
    </div>
    <div class="lecture-container-navigation-subtitle lecture-container-navigation-subtitle-clicked">
      demo
    </div>
    <!-- right hand side icons or menu items -->
    <div class="lecture-container-navigation-pull-right-section" style="">
      <div class="lecture-container-navigation-pull-right-section-vis">
        <i class="fa fa-user-circle lecture-container-navigation-icon" aria-hidden="true"></i>
        <i class="fa fa-info lecture-container-navigation-icon" aria-hidden="true"></i>
      </div>
      <div class="lecture-container-navigation-pull-right-section-min">
        <i class="fa fa-navicon lecture-container-navigation-icon" aria-hidden="true"></i>
      </div>
    </div>
    {{menuItemSelected}}
  </div>
</template>

<script>

module.exports = {
  //name: 'lecture-navigator',
  data: () => {
    return {
      'testing': 'testing-message'
    };
  },
  props: [ 'menuItemSelected' ]
};

</script>
