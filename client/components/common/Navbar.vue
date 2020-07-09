<template>
  <nav class="nav flex-h align-center justify-space-between">
    <div class="nav-title">
      <i class="material-icons">analytics</i>
      Cobbler LMS
    </div>
    <div>
      <span
        @click="logout"
        class="nav-item clickable">
        Logout
      </span>
      <span
        class="nav-item">
        {{ $store.state.auth.email }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
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
  background: var(--color-primary);
  height: var(--spacing-xl);
  padding: 0 var(--spacing-md);
  box-shadow: 2px 2px 4px 0px var(--color-gray);
  z-index: 5;
}
.nav-item {
  background: var(--color-gray-500);
  border-radius: 3px;
  margin: 0 var(--spacing-xs);
  padding: var(--spacing-xxs) var(--spacing-xs);
  box-shadow: 2px 2px 2px 0px var(--color-gray-500);
}
.nav-title {
  color: var(--color-accent);
}
.nav-title i {
  vertical-align: middle;
}
.clickable {
  cursor: pointer;
}

</style>
