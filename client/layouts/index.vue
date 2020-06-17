<template>
  <div>
    <main-layout
      v-if="$store.state.layout.current === 'main'">
      <slot></slot>
    </main-layout>
    <div
      v-if="$store.state.layout.current === 'login'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MainLayout from './MainLayout';

export default {
  name: 'login-layout',
  components: {
    'main-layout': MainLayout
  }
};
</script>

<style scoped>
</style>
