<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-form">
      <base-input v-model="email" @input="validateEmail" filled label="Email" class="input-element" />
      <base-alert v-if="!error.isServerSide && error.message" error>{{ error.message }}</base-alert>
      <base-input v-model="password" filled label="Password" type="password" class="input-element" />
      <base-button :disabled="!!error.message && !error.isServerSide" contained primary type="submit" class="input-element">LOGIN</base-button>
      <base-alert v-if="error.isServerSide && error.message" error>{{ error.isServerSide && error.message }}</base-alert>
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
        isServerSide: false,
        message: ''
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
        const newError = {
          isServerSide: true
        };

        if (err.status === 400) {
          newError.message = 'Short password';
        } else if (err.status === 404) {
          newError.message = 'User with email not found';
        } else if (err.status === 500) {
          newError.message = 'Something went wrong';
        }
        this.error = newError;
      }
    },
    validateEmail: function () {
      if (!validateEmail(this.email)) {
        this.error = { message: 'Invalid email format!', isServerSide: false };
        return;
      }
      this.error = { message: '', isServerSide: false };
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
}
.input-element {
  margin: 10px 0;
}
@media only screen and (max-width: 480px) {
  .login-form {
    width: 100%;
    padding: 50px 25px;
  }
}
</style>
