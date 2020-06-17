<template>
  <layout-provider>
    <router-view />
  </layout-provider>
</template>

<script>
import 'normalize.css';
import './theme/colors.css';
import './theme/layout.css';
import './theme/typography.css';
import LayoutProvider from './layouts';

export default {
  name: 'app',
  components: { 'layout-provider': LayoutProvider }
};
</script>

<style>
</style>
