<template>
  <h1>Home</h1>
</template>

<script>
export default {
  name: 'home',
  beforeMount() {
    this.$store.dispatch('changeLayout', 'main');
  }
};
</script>

<style scoped>

</style>
