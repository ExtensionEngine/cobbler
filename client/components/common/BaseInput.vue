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
  color: transparent;
}
.filled {
  border: none;
  border-bottom: solid 1px var(--color-black));
}
.outlined {
  border: solid 1px var(--color-black);
}
.input-filled {
  color:var(--color-black);
}
</style>
