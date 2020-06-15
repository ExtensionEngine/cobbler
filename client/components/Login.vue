<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-form">
      <Input v-model="email" placeholder="Email" />
      <Input v-model="password" type="password" placeholder="Password" />
      <Button type="submit">LOGIN</Button>
    </form>
  </div>
</template>

<script>
import Button from './common/baseButton';
import Input from './common/baseInput';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    onSubmit: () => {
      console.log('submited');
    }
  },
  components: { Button, Input }
};
</script>

<style scoped>
.login-container {
  padding: 0 70px;
}
.login-form {
  display: flex;
  flex-direction: column;
}
</style>
