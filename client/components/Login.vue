<template>
  <div>
    <h1>Login</h1>
    <Button @click="onClick" type="submit">Login</Button>
  </div>
</template>

<script>
import Button from './common/baseButton';

export default {
  name: 'login',
  methods: {
    onClick: () => {
      console.log('clicked');
    },
    onSubmit: () => {
      console.log('submited');
    }
  },
  components: { Button }
};
</script>

<style scoped>
</style>
