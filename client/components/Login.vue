<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-form">
      <base-input
        v-model="email"
        @input="validateEmail"
        class="input-element"
        label="Email"
        filled />
      <base-alert
        v-if="formError.email"
        error>
        {{ formError.email }}
      </base-alert>
      <base-input
        v-model="password"
        @input="validatePassword"
        class="input-element"
        label="Password"
        type="password"
        filled />
      <base-alert
        v-if="formError.password"
        error>
        {{ formError.password }}
      </base-alert>
      <base-button
        :disabled="email && password &&(!!formError.email || !!formError.password)"
        class="input-element"
        type="submit"
        contained primary>
        LOGIN
      </base-button>
      <base-alert
        v-if="requestError"
        error>
        {{ requestError }}
      </base-alert>
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
      formError: {
        email: null,
        password: null
      },
      requestError: null
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
          this.requestError = 'Short password';
        } else if (status === 404) {
          this.requestError = 'User with this email not found';
        } else if (status === 500) {
          this.requestError = 'Something went wrong';
        }
      }
    },
    validateEmail: function () {
      if (!validateEmail(this.email)) {
        this.formError = { ...this.formError, email: 'Entered email is not valid' };
        return;
      }
      this.formError = { ...this.formError, email: null };
    },
    validatePassword: function () {
      if (this.password.length < 5) {
        this.formError = {
          ...this.formError,
          password: 'The password should be longer than 4 chars'
        };
        return;
      }
      this.formError = {
        ...this.formError,
        password: null
      };
    }
  },
  beforeMount() {
    this.$store.dispatch('changeLayout', 'login');
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
  background: var(--color-neutral-gray-light);
  border-radius: 3px;
  padding: 50px;
  box-shadow: 2px 6px 9px 0px var(--color-neutral-gray);
}
.input-element {
  margin: 10px 0;
  box-shadow: 2px 2px 5px 0px var(--color-neutral-gray);
}
@media only screen and (max-width: 480px) {
  .login-form {
    width: 100%;
    padding: 50px 25px;
  }
}
</style>
