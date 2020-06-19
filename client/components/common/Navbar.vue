<template>
  <div>
    <nav class="nav">
      <span
        @click="logout"
        class="nav-item clickable">
        Logout
      </span>
      <span
        class="nav-item">
        {{ getUserEmail }}
      </span>
    </nav>
    <router-view />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  name: 'navbar',
  computed: {
    getUserEmail() {
      const decodedToken = jwtDecode(this.$store.state.auth.token);
      return decodedToken.sub;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="css" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-gray);
  height: var(--spacing-xl);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 var(--spacing-md);
  box-shadow: 2px 2px 4px 0px var(--color-gray);
}
.nav-item {
  background: var(--color-gray-500);
  border-radius: 3px;
  margin: 0 var(--spacing-xs);
  padding: var(--spacing-xxs) var(--spacing-xs);
  box-shadow: 2px 2px 2px 0px var(--color-gray-500);
}
.clickable {
  cursor: pointer;
}
</style>
