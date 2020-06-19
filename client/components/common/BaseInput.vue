<template>
  <input
    @input="onChange"
    :value="value"
    :type="type"
    :class="{
      filled,
      outlined
    }"
    class="input">
</template>

<script>
export default {
  name: 'base-input',
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    filled: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false }
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style lang="css" scoped>
.input {
  width: 100%;
  font-size: 16px;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 3px;
  outline: none;
}
.filled {
  border: none;
  border-bottom: solid 1px var(--color-black));
}
.outlined {
  border: solid 1px var(--color-black);
}
.input-wrapper {
  position: relative;
}
.input-label {
  position: absolute;
  top: 11px;
  left: 16px;
  font-size: 16px;
  transition: all 0.15s ease;
}
.input:focus + .input-label,
.field-filled {
  font-size: 11px;
  top: -12px;
  left: 5px;
  background: var(--color-white);
  border-radius: 3px 3px 0 0;
}
</style>
