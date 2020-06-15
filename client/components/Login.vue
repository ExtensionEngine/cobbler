<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-form">
      <Input v-model="email" placeholder="Email" class="input-element" />
      <Input v-model="password" type="password" class="input-element" placeholder="Password" />
      <Button type="submit" class="input-element">LOGIN</Button>
      <Alert v-if="error" severity="error" class="input-element">{{ error }}</Alert>
    </form>
  </div>
</template>

<script>
import Alert from './common/baseAlert';
import Button from './common/baseButton';
import Input from './common/baseInput';
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    onSubmit: async function () {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  },
  components: { Button, Input, Alert }
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
.input-element {
  margin: 10px 0;
}
</style>
