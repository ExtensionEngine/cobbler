<template>
  <div class="navigation-helper-bar">
    <span @click="goBack" class="back-button">Go back</span>
  </div>
</template>

<script>
export default {
  name: 'navigation-helper-bar',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.navigation-helper-bar {
  background: var(--color-gray-500);
  padding: var(--spacing-sm) var(--spacing-lg);
}
.back-button {
  background: var(--color-gray);
  border-radius: 3px;
  padding: var(--spacing-xxs) var(--spacing-xs);
  cursor: pointer;
  color: var(--color-white)
}
.back-button:hover {
  opacity: .8;
}
</style>
