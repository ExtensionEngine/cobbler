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
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    min-height: calc(100vh - var(--navbar-height));
    width: 100%;
  }
</style>
