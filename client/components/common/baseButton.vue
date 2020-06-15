<template>
  <button
    v-on="$listeners" :type="type" :disabled="disabled" :class="{
      btn: true,
      contained,
      outlined,
      primary
    }">
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
    contained: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    primary: { type: Boolean, default: false }
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
  opacity: 0.9;
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
