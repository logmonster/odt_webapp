<style></style>

<template>
  <div style="margin-top: 20px; margin-bottom: 20px;">
    <div class="jumbotron">
      <h2 class="h1-responsive">
        about the lecture app:
        <i class="fa fa-binoculars" aria-hidden="true" style="font-size: 24px;"></i>
      </h2>
      <div style="margin-bottom: 4px;">&nbsp;</div>
      <p class="lead text-justify">
        The lecture app contains all demo queries and javascript code snippets
        illustrated throughout the course. The examples are ordered by chapters,
        simply click on the side menu and pick the corresponding entry you are
        interested in.
      </p>
      <!--hr class="my-2">
      <p>It uses utility classes for typography and spacing to space content out within the larger
        container.
      </p-->
      <a class="btn btn-secondary btn-lg" role="button" @click="getStartedClick()">Get started</a>
    </div>

  </div>
</template>

<script>

module.exports = {
  name: 'lecture-help',
  data: () => {
    return {
      'testing': 'testing-message'
    };
  },
  methods: {
    getStartedClick: () => {
      Vue.$emit('getStartedFromHelpComponent');
      VueRouter.push({ name: '/chp02/query_by_event_handler' });
    }
  }
  //,props: [ 'menuItemSelected' ]
};

</script>
