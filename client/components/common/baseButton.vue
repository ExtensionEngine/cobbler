<template>
  <button v-on="$listeners" :type="type" :disabled="disabled" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  inheritAttrs: false,
  props: {
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'contained' },
    color: { type: String, default: 'primary' }
  },
  computed: {
    buttonClass: cmp => ({
      btn: true,
      contained: cmp.variant === 'contained',
      outlined: cmp.variant === 'outlined',
      primary: cmp.color === 'primary'
    })
  }
};
</script>

<style lang="css" scoped>
.btn {
  padding: 5px 15px;
  outline: none;
  border-radius: 3px;
}
.btn:hover {
  cursor: pointer;
}
.primary {
  background: var(--color-primary);
  border: solid 2px var(--color-primary);
}
.contained {
  color: #ffff;
  border: none;
}
</style>
