<template>
  <input
    @input="onChange"
    :value="value"
    :type="type"
    :class="{
      filled,
      outlined,
      'input-filled': value
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
  color: transparent;
  position: relative;
  background: var(--color-white);
}
.filled {
  border: none;
  border-bottom: solid 1px var(--color-black);
}
.outlined {
  border: solid 1px var(--color-black);
}
.input-filled {
  color: var(--color-black);
}
input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    right: 0;
    top: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    width: 100%;
    position: absolute;
}
</style>
