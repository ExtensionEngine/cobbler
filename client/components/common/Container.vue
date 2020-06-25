<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'container'
};
</script>

<style lang="css" scoped>
  .container {
    padding: 5px;
    width: 90%;
    margin: 10px auto;
  }
</style>
