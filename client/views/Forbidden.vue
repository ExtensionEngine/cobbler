<template>
  <div class="flex-h justify-center">
    <div class="forbidden-container">
      <h1>Access to this page is forbidden</h1>
      <base-button @click="handleClick" primary contained>Go to home</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton';
import { getBasepath } from '../router/index';

export default {
  name: 'forbidden',
  methods: {
    handleClick() {
      this.$router.push(getBasepath());
    }
  },
  components: {
    BaseButton
  }
};
</script>

<style scoped>
.forbidden-container {
    max-width: var(--measure-sm);
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid var(--color-primary);
    border-radius: 3px
}
.forbidden-container h1 {
    text-align: center;
}
</style>
