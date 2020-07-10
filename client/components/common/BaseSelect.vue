<template>
  <select
    @input="onChange"
    class="select">
    <option disabled value=""></option>
    <option
      v-for="option in options"
      :key="option[valueKey]"
      :value="option[valueKey]"
      :selected="isSelected(option)">
      {{ option[labelKey] }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'base-select',
  props: {
    value: { type: Object, default: () => {} },
    options: { type: Array, default: () => [] },
    labelKey: { type: String, default: 'label' },
    valueKey: { type: String, default: 'value' }
  },
  methods: {
    onChange(event) {
      const selectedOption = this.options.find(
        option => option[this.valueKey] === Number(event.target.value));
      this.$emit('input', selectedOption);
    },
    isSelected(option) {
      return this.value && option[this.labelKey] === this.value[this.labelKey];
    }
  }
};
</script>

<style lang="css" scoped>
.select {
  width: 100%;
  font-size: 1rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 3px;
  outline: none;
  background: transparent;
}
</style>
