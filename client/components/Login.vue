<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-form">
      <base-input v-model="email" @input="validateEmail" filled label="Email" class="input-element" />
      <base-alert v-if="error.email" error>{{ error.email }}</base-alert>
      <base-input
        v-model="password" @input="validatePassword" filled label="Password"
        type="password"
        class="input-element" />
      <base-alert v-if="error.password" error>{{ error.password }}</base-alert>
      <base-button :disabled="email && password &&(!!error.email || !!error.password)" contained primary type="submit" class="input-element">LOGIN</base-button>
      <base-alert v-if="error.serverSide" error>{{ error.serverSide }}</base-alert>
    </form>
  </div>
</template>

<script>
import BaseAlert from './common/BaseAlert';
import BaseButton from './common/BaseButton';
import BaseInput from './common/BaseInput';
import { mapActions } from 'vuex';
import { validateEmail } from '../utils/validate';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      error: {
        email: '',
        password: '',
        serverSide: ''
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    onSubmit: async function () {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/');
      } catch (err) {
        const { status } = err.thwackResponse;
        if (status === 401) {
          this.error.serverSide = 'Short password';
        } else if (status === 404) {
          this.error.serverSide = 'User with this email not found';
        } else if (status === 500) {
          this.error.serverSide = 'Something went wrong';
        }
      }
    },
    validateEmail: function () {
      if (!validateEmail(this.email)) {
        this.error = { ...this.error, email: 'Entered email is not valid' };
        return;
      }
      this.error = { ...this.error, email: '' };
    },
    validatePassword: function () {
      if (this.password.length < 5) {
        this.error = { ...this.error, password: 'The password should be longer than 4 chars' };
        return;
      }
      this.error = { ...this.error, password: '' };
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
  padding: 100px 0;
  display: flex;
  justify-content: center;
}
.login-form {
  width: 350px;
  display: flex;
  flex-direction: column;
  background: rgba(204, 204, 204);
  border-radius: 3px;
  padding: 50px;
  box-shadow: 2px 6px 9px 0px #888888;
}
.input-element {
  margin: 10px 0;
  box-shadow: 2px 2px 5px 0px #888888;
}
@media only screen and (max-width: 480px) {
  .login-form {
    width: 100%;
    padding: 50px 25px;
  }
}
</style>
