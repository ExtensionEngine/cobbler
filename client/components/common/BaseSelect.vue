<template>
  <select
    @input="onChange"
    :value="value"
    class="select">
    <option selected disabled value=""></option>
    <option
      v-for="option in options"
      :key="option.id"
      :selected="isSelected(option)"
      :value="option.name">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'base-select',
  props: {
    value: { type: String, default: '' },
    options: { type: Array, default: () => [] }
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    },
    isSelected(option) {
      return option.name === this.value;
    }
  }
};
</script>

<style lang="css" scoped>
.select {
  width: 100%;
  font-size: 16px;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 3px;
  outline: none;
  background: transparent;
}
</style>
