<template>
  <div class="forbidden-wrapper">
    <div class="forbidden-container">
      <h1>Forbidden route for {{ $store.getters.role | lowercase }} role</h1>
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
  filters: {
    lowercase: role => role ? role.toLowerCase() : 'guest'
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
