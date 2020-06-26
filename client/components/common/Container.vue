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
    padding: var(--spacing-xs);
    width: 90%;
    margin: var(--spacing-sm) auto;
  }
</style>
