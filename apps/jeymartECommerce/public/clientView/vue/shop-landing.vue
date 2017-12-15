<template>
  <div>
    <shop-carousel :images='carouselImages' ></shop-carousel>
  </div>
</template>

<script>
function _model_shop_landing(_instance) {
  return {
    'instance': _instance,
    'carouselImages': [
      '/image/carousel/carousel01.jpeg',
      '/image/carousel/carousel02.jpeg',
      '/image/carousel/carousel03.jpeg',
      '/image/carousel/carousel04.jpeg'
    ]
  };
}

module.exports = {
  name: 'shop-landing',
  data: function() {
    return new _model_shop_landing(this);
  },
  props: [],
  methods: {

  }
};
</script>
