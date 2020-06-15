<template>
  <label class="input-wrapper">
    <input
      @change="onChange"
      :type="type"
      :value="value"
      :class="{
        input: true,
        filled,
        outlined
      }">
    <span :class="{'input-label': true,'field-filled': value}">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'base-input',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
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
  font-size: 16px;
  padding: 12px 16px 14px;
  border-width: 1px;
  border-radius: 3px;
  outline: none;
  width: calc(100% - 32px);
}
.input:hover {
  border-color: rgba(0, 0, 0);
}
.input:focus {
  border-color: var(#227093);
}
.filled {
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, 0.5);
}
.outlined {
  border: solid 1px rgba(0, 0, 0, 0.5);
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
  padding: 2px 7px;
  background: white;
  border-radius: 3px 3px 0 0;
}
</style>
