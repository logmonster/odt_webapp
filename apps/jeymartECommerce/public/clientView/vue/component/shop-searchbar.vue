<template>
  <!-- basic search textInput -->
  <div class="searchbar-container">

<!-- ### change to popup somehow -->
    <!--a class="nav-link dropdown-toggle waves-effect waves-light"
      id="navbarDropdownMenuLink" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="true">
      <span class=''> Categories</span>
    </a>
    <div class="dropdown-menu dropdown-default dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
      <div>
        <a class="dropdown-item waves-effect waves-light" href="#">all</a>
        <a class="dropdown-item waves-effect waves-light" href="#">fashion</a>
      </div>
    </div-->
<!-- ### change to popup somehow -->

    <div class="pointer searchbar-category-dropdown" @click='toggleCategoriesDropdown()'>
      Categories <i class="fa fa-caret-down" aria-hidden="true"></i>
    </div>
    <input class='searchbar-text' />
    <div class="searchbar-icon">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>

<!-- TODO get the list through query -->
    <div :class="getCssClassForCategoriesDropdown()">
      <div class="searchbar-category-dropdown-inner">
        <div class="pointer searchbar-category-dropdown-item" @click='pickCategory("all")'>all</div>
        <div class="pointer searchbar-category-dropdown-item" @click='pickCategory("fashion")'>fashion activity</div>
        <div class="pointer searchbar-category-dropdown-item">all</div>
        <div class="pointer searchbar-category-dropdown-item">fashion</div>
        <div class="pointer searchbar-category-dropdown-item">all</div>
        <div class="pointer searchbar-category-dropdown-item">fashion</div>
        <div class="pointer searchbar-category-dropdown-item">all</div>
        <div class="pointer searchbar-category-dropdown-item">fashion</div>
        <div class="pointer searchbar-category-dropdown-item">all</div>
        <div class="pointer searchbar-category-dropdown-item">fashion</div>
        <div class="pointer searchbar-category-dropdown-item">all</div>
        <div class="pointer searchbar-category-dropdown-item">fashion</div>
      </div>
    </div>

<!-- the blocking grey background to simulate modal -->
    <div :class="getCssClassForModalCanvas()">&nbsp;</div>
  </div>

  <!-- original -->
  <!-- div class="header-navigator-searchbar">
    <input class='header-navigator-searchbar-text' />
    <div class="header-navigator-searchbar-icon">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </div -->
</template>

<script>
// model
function _model_shop_searchbar(_instance) {
  return {
    'instance': _instance,
    'isDropdownVisible': false,
    'isModalCanvasVisible': false,
    'category': 'all'
  };
}

module.exports = {
  name: 'shop-searchbar',
  data: function() {
    return new _model_shop_searchbar(this);
  },
  props: [],
  methods: {
    /**
     *  method to toggle the visibility of the dropdown part
     */
    toggleCategoriesDropdown: function() {
      this.isDropdownVisible = !this.isDropdownVisible;
      if (this.isDropdownVisible) {
        this.isModalCanvasVisible = true;
      } else {
        this.isModalCanvasVisible = false;
      }
      console.log('** inside toggle category dropdown => '+this.isDropdownVisible);
    },
    
    // return the css class(s) for the dropdown
    getCssClassForCategoriesDropdown: function() {
      if (this.isDropdownVisible) {
        return {
          'searchbar-category-dropdown-outer': true,
          'hiding': false,
          'showing': true
        }
      } else {
        return {
          'searchbar-category-dropdown-outer': true,
          'hiding': true,
          'showing': false
        }
      }
    },
    // return the css class(s) for the modal canvas
    getCssClassForModalCanvas: function() {
      if (this.isModalCanvasVisible) {
        return {
          'blocking-modal-canvas': true,
          'showing': true,
          'hiding': false
        };
      } else {
        return {
          'blocking-modal-canvas': true,
          'showing': false,
          'hiding': true
        };
      }
    },

    // set the category picked plus toggle dropdown visiblity
    pickCategory: function(_category) {
      this.category=_category;
      this.toggleCategoriesDropdown();
    }

  }
};
</script>
