<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './Navbar';

export default {
  name: 'layout',
  components: {
    Navbar
  }
};
</script>
