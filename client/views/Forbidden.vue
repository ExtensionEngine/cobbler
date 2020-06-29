<template>
  <div class="forbidden-wrapper">
    <div class="forbidden-container">
      <h1>Forbidden route for {{ $store.state.auth.role.toLowerCase() }} role</h1>
      <base-button @click="handleClick" primary contained>Go to home</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton';
import { getBasePath } from '../router/index';

export default {
  name: 'forbidden',
  methods: {
    handleClick() {
      this.$router.push(getBasePath());
    }
  },
  components: {
    BaseButton
  }
};
</script>

<style scoped>
.forbidden-wrapper {
    display: flex;
    justify-content: center;
}
.forbidden-container {
    width: 350px;
    padding: var(--spacing-md);
    border: 1px solid var(--color-primary);
    border-radius: 3px
}
h1 {
    text-align: center;
}
</style>
