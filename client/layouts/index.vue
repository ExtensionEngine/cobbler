<template>
  <div>
    <default-layout
      v-if="$store.state.layout.current === 'default'">
      <slot></slot>
    </default-layout>
    <login-layout
      v-else-if="$store.state.layout.current === 'login'">
      <slot></slot>
    </login-layout>
    <default-layout
      v-else>
      <slot></slot>
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from './DefaultLayout';
import LoginLayout from './LoginLayout';

export default {
  name: 'layout-provider',
  components: {
    'default-layout': DefaultLayout,
    'login-layout': LoginLayout
  }
};
</script>

<style scoped>
</style>
