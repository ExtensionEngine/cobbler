<template>
  <validation-observer
    v-slot="{ invalid }"
    mode="eager"
    tag="div">
    <form @submit.prevent="onSubmit">
      <slot :isFormInvalid="invalid">
      </slot>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'base-form',
  methods: {
    onSubmit() {
      this.$emit('submit');
    }
  },
  components: {
    ValidationObserver
  }
};
</script>
