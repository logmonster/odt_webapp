// app.vue
<style>
  .title-img {
    width: 40%;

    padding-top: 4px; padding-bottom: 12px;
    padding-left: 6px; padding-right: 6px;
  }
  .welcome-msg {
    color: #aaa;
    font-size: 18px;
  }
</style>

<!-- html template -->
<template>
  <div class="d-flex justify-content-center">
    <!--Card-->
    <div class="card">
      <!--Card image-->
      <img class="title-img" src="/image/es_title.jpeg" alt="Card image cap">

      <!--Card content-->
      <div class="card-body" style="padding-left: 4px; padding-right: 4px;">
        <!--Title-->
        <h4 class="card-title">Chapters</h4>
        <!--Text-->
        <ul class="normal_ul">
          <li> <a href='lectureContainer.html'>chp02 -- elasticsearch.js</a> </li>
          <li> <a href='chp02.html'>chp02 -- elasticsearch.js</a> </li>
        </ul>

      </div>

    </div>
    <!--/.Card-->
  </div>
</template>

<!-- variables and methods -->
<script>
module.exports = {
  data () {
    return {
      msg: 'lecture app ~'
    }
  }
}
</script>
