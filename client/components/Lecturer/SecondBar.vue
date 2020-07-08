<template>
  <div class="second-bar">
    <span @click="handleBackClick" class="back-button">Go back</span>
  </div>
</template>

<script>
export default {
  name: 'second-bar',
  methods: {
    handleBackClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.second-bar {
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
