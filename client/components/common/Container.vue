<template>
  <div class="container flex-v">
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
    position: relative;
    min-height: calc(100% - var(--navbar-height));
    width: 100%;
    padding: var(--spacing-lg);
  }
</style>
