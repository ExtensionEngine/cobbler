<template>
  <div
    class="error-wrapper">
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xxs) 0;
  border-radius: 3px;
  color: var(--color-error-500);
}
</style>
