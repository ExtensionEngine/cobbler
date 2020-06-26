<template>
  <div class="container">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'lecture-box',
  props: {
    title: { type: String, default: '' }
  }
};
</script>

<style lang="css" scoped>

.container {
    border-top: 1px solid black;
    padding: 10px 15px;
  }

</style>
