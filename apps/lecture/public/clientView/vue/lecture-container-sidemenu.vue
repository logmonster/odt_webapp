<style></style>

<template>
  <div>
    sidemenu here~
    <p/>
    {{pickedChapter}} > {{pickedItemId}}
    <button @click='testNotifyParent("chapter03", $event)' class='btn btn-secondary'>change to chapter03 > 99</button>
  </div>
</template>

<script>
module.exports = {
  name: 'lecture-container-sidemenu',
  data: () => {
    return {
      'testing': 'testing-message'
    };
  },
  props: [ 'pickedChapter', 'pickedItemId' ],
  methods: {
    testNotifyParent: (_chp, _evt) => {
      Vue.$emit('testing', _chp, '99', _evt);
    }
  }
};
</script>
