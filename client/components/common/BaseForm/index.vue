<template>
  <validation-observer
    v-slot="{ invalid }"
    @submit.prevent="onSubmit"
    mode="eager"
    tag="form">
    <slot :isFormInvalid="invalid">
    </slot>
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
