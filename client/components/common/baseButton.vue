<template>
  <button v-on="$listeners" :type="type" :disabled="disabled" class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  inheritAttrs: false,
  props: {
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' }
  }
};
</script>

<style lang="css" scoped>
.btn {
  color: var(--color-accent);
}
.btn:hover {
  cursor: pointer;
}
</style>
