<template>
  <!--Carousel Wrapper-->
  <!-- class="flex-center" style="max-height: 180px;" -->
  <!-- class='d-flex justify-content-center' -->
  <div  >
    <div id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">
      <!--Indicators-->
      <ol class="carousel-indicators">
        <li data-target="#carousel-example-1z" data-slide-to="0" class="active" ></li>
        <li data-target="#carousel-example-1z" data-slide-to="1"></li>
        <li data-target="#carousel-example-1z" data-slide-to="2"></li>
        <li data-target="#carousel-example-1z" data-slide-to="3"></li>
      </ol>
      <!--/.Indicators-->
      <!--Slides-->
      <div class="carousel-inner" role="listbox">
        <!--First slide-->
        <div class="carousel-item active" @click="fwdToListingViewByCategory('fashion');">
          <div class="view _s_pointer">
            <img :src='images[0]' alt="First slide" class="carousel_image_dimen">
            <div class="mask pattern-4"></div>
          </div>
          <!-- ### caption for the carousel -->
          <div class="carousel-caption">
            <h3 class="h3-responsive">Fashion and footwear</h3>
            <p>checkout our latest trendy summer collections</p>
          </div>
        </div>
        <!--/First slide-->
        <!--Second slide-->
        <div class="carousel-item" @click="fwdToListingViewByCategory('fashion');">
          <div class="view _s_pointer">
            <img :src='images[1]' alt="2nd slide" class="carousel_image_dimen">
            <div class="mask pattern-4"></div>
          </div>
          <div class="carousel-caption">
            <h3 class="h3-responsive">Bags and accessories</h3>
            <p>new arrivals for this summer~</p>
          </div>
        </div>
        <!--/Second slide-->
        <!--Third slide-->
        <div class="carousel-item" @click="fwdToListingViewByCategory('fashion');">
          <div class="view _s_pointer">
            <img :src='images[2]' alt="3rd slide" class="carousel_image_dimen">
            <div class="mask pattern-2"></div>
          </div>
          <div class="carousel-caption">
            <h3 class="h3-responsive">Food and groceries</h3>
            <p>grab a basket of the best food in town</p>
          </div>
        </div>
        <!--/Third slide-->
        <!--4th slide-->
        <div class="carousel-item" @click="fwdToListingViewByCategory('fashion');">
          <div class="view _s_pointer">
            <img :src='images[3]' alt="4th slide" class="carousel_image_dimen">
            <div class="mask pattern-3"></div>
          </div>
          <div class="carousel-caption">
            <h3 class="h3-responsive">Cakes and pastries</h3>
            <p>sweet tooth time</p>
          </div>
        </div>
        <!--/4th slide-->
      </div>
      <!--/.Slides-->
      <!--Controls-->
      <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
      <!--/.Controls-->
    </div>
    <!--/.Carousel Wrapper-->
  </div>
</template>

<script>
// model
function _model_shop_carousel(_instance) {
  return {
    'instance': _instance
  };
}

module.exports = {
  name: 'shop-carousel',
  data: function() {
    return new _model_shop_carousel(this);
  },
  props: [ 'images' ],
  methods: {
    fwdToListingViewByCategory: function(_category) {
// TODO: change the vue router to show the correct page
      console.log('* category selected => '+_category);
    }

  }
};




</script>
