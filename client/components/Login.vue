<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-form">
      <base-input v-model="email" outlined label="Email" class="input-element" />
      <base-input v-model="password" outlined label="Password" type="password" class="input-element" />
      <base-button contained primary type="submit" class="input-element">LOGIN</base-button>
      <base-alert v-if="error" error>{{ error }}</base-alert>
    </form>
  </div>
</template>

<script>
import BaseAlert from './common/BaseAlert';
import BaseButton from './common/BaseButton';
import BaseInput from './common/BaseInput';
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
  components: {
    'base-alert': BaseAlert,
    'base-button': BaseButton,
    'base-input': BaseInput
  }
};
</script>

<style scoped>
.login-container {
  padding: 50px 70px;
}
.login-form {
  display: flex;
  flex-direction: column;
}
.input-element {
  margin: 10px 0;
}
</style>
