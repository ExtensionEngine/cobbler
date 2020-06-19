<template>
  <button
    v-on="$listeners"
    :disabled="disabled"
    :class="{
      contained,
      outlined,
      primary,
      disabled
    }"
    class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    disabled: { type: Boolean, default: false },
    contained: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    primary: { type: Boolean, default: false }
  }
};
</script>

<style lang="css" scoped>
.btn {
  padding: var(--spacing-xxs) var(--spacing-md);
  border-radius: 3px;
  width: 100%;
}
.btn:hover {
  cursor: pointer;
}
.primary {
  background: var(--color-primary);
  border: solid 2px var(--color-primary);
}
.primary:hover {
  background: var(--color-primary-500);
}
.contained {
  color: #ffff;
  border: none;
}
.disabled {
  opacity: 0.4;
}
.disabled:hover {
  cursor: default;
  opacity: 0.4;
}
</style>
