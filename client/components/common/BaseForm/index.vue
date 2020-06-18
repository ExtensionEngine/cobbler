<template>
  <validation-observer v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <slot>
      </slot>
      <base-button
        :disabled="invalid"
        class="input-element"
        type="submit"
        contained primary>
        {{ submitLabel }}
      </base-button>
    </form>
  </validation-observer>
</template>

<script>
import BaseButton from '../BaseButton';
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'base-form',
  props: {
    submitLabel: { type: String, required: true }
  },
  methods: {
    onSubmit() {
      this.$emit('submit');
    }
  },
  components: {
    ValidationObserver,
    BaseButton
  }
};
</script>

<style>
</style>
