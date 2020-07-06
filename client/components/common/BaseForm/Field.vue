<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="rules"
    :name="name"
    :debounce="debounce"
    tag="div">
    <label class="field-wrapper">
      <slot :on="{ input }" :value="value"></slot>
      <span
        :class="{ 'field-filled': value }"
        class="field-label">
        {{ label }}
      </span>
    </label>
    <base-error>{{ errors[0] }}</base-error>
  </validation-provider>
</template>

<script>
import BaseError from '../BaseError';
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'form-field',
  props: {
    label: { type: String, default: null },
    name: { type: String, required: true },
    value: { type: String, default: null },
    rules: { type: [Object, String], default: null },
    debounce: { type: Number, default: 300 }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  },
  components: {
    ValidationProvider,
    BaseError
  }
};
</script>

<style scoped>
.field-wrapper {
  position: relative;
}
.field-label {
  position: absolute;
  top: 0;
  left: 16px;
  font-size: 16px;
  transition: all 0.15s ease;
}
.input:focus + .field-label,
.text-area:focus + .field-label,
.select:focus + .field-label,
.field-filled {
  font-size: 11px;
  top: -26px;
  left: 5px;
  padding: var(--spacing-xxs) var(--spacing-xs);
  background: var(--color-white);
  border-radius: 3px 3px 0 0;
}
</style>
