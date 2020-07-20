<template>
  <div
    class="error-wrapper flex-h justify-center align-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'base-error'
};
</script>

<style lang="css" scoped>
.error-wrapper {
  padding: var(--spacing-xxs) 0;
  border-radius: 3px;
  color: var(--color-error-500);
}
</style>
