<template>
  <div class="login-container">
    <base-form
      v-slot="{ isFormInvalid }"
      @submit="onSubmit"
      submit-label="Login"
      class="login-form">
      <field
        v-model="email"
        name="email"
        label="Email"
        rules="required|email">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            class="input-element"
            filled />
        </template>
      </field>
      <field
        v-model="password"
        name="password"
        label="Password"
        rules="required|min:5">
        <template v-slot="{ on, value }">
          <base-input
            v-on="on"
            :value="value"
            class="input-element"
            type="password"
            filled />
        </template>
      </field>
      <base-button
        :disabled="isFormInvalid"
        type="submit"
        contained primary>
        Login
      </base-button>
      <base-error>{{ error }}</base-error>
    </base-form>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton';
import BaseError from '../components/common/BaseError';
import BaseForm from '../components/common/BaseForm';
import BaseInput from '../components/common/BaseInput';
import Field from '../components/common/BaseForm/Field';
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      this.$toasted.global.formSubmitting();
      try {
        await this.login({ email: this.email, password: this.password });
        this.$toasted.global.formSuccess({ message: 'Login successful!' });
        this.$router.push('/');
      } catch (err) {
        this.$toasted.global.formError({ message: 'Login failed!' });
        const { status } = err.thwackResponse;
        if (status === 401) {
          this.error = 'Short password';
        } else if (status === 404) {
          this.error = 'User with this email not found';
        } else if (status === 500) {
          this.error = 'Something went wrong';
        }
      }
    }
  },
  components: {
    BaseInput,
    BaseError,
    BaseButton,
    BaseForm,
    Field
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
  width: 400px;
  display: flex;
  flex-direction: column;
  background: var(--color-gray-500);
  border-radius: 3px;
  padding: 50px;
  box-shadow: 2px 6px 9px 0px var(--color-gray);
}
.input-element {
  margin: 10px 0;
  box-shadow: 2px 2px 5px 0px var(--color-gray);
}
@media only screen and (max-width: 480px) {
  .login-form {
    width: 100%;
    padding: var(--spacing-xl) var(--spacing-lg);
  }
}
</style>
