<template>
  <input @change="onChange" :placeholder="placeholder" :type="type" :value="value" :class="inputClass">
</template>

<script>
export default {
  name: 'base-input',
  inheritAttrs: false,
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    variant: { type: String, default: 'filled' },
    placeholder: { type: String, default: '' }
  },
  computed: {
    inputClass: cmp => ({
      input: true,
      filled: cmp.variant === 'filled',
      outlined: cmp.variant === 'outlined'
    })
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
    padding: 12px 16px 14px;
    border-width: 1px;
    border-radius: 3px;
    outline: none;
}
.input:hover {
    border-color: rgba(0,0,0);
}
.input:focus {
    border-color: var(#227093);
}
.filled {
    border: none;
    border-bottom: solid 1px rgba(0,0,0,.5);
}
.outlined {
    border: solid 1px rgba(0,0,0,.5);
}
.filled:focus {
    background: rgba(204, 204, 204)
}
</style>
