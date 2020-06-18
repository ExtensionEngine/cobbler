<template>
  <validation-provider
    v-slot="{ errors }" :rules="rules"
    :name="name"
    tag="div">
    <label class="input-wrapper">
      <slot :on="{ input }" :value="value"></slot>
      <span
        :class="{ 'field-filled': value }"
        class="input-label">
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
    rules: { type: String, default: null }
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
.input-wrapper {
  position: relative;
}
.input-label {
  position: absolute;
  top: 0;
  left: 16px;
  font-size: 16px;
  transition: all 0.15s ease;
}
.input:focus + .input-label,
.field-filled {
  font-size: 11px;
  top: -25px;
  left: 5px;
  padding: 2px 7px;
  background: var(--color-neutral-white);
  border-radius: 3px 3px 0 0;
}
</style>
