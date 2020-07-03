<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'normalize.css';
import './theme/global.css';
import './theme/colors.css';
import './theme/layout.css';
import './theme/typography.css';

export default { name: 'app' };
</script>

<style>

#app {
  display: flex;
  flex-flow: column nowrap;
  padding-top: var(--spacing-xl);
}
</style>
