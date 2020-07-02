<template>
  <nav class="nav">
    <span
      @click="logout"
      class="nav-item clickable">
      Logout
    </span>
    <span
      class="nav-item">
      {{ $store.getters.email }}
    </span>
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
  background: var(--color-gray);
  height: var(--spacing-xl);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 var(--spacing-md);
  box-shadow: 2px 2px 4px 0px var(--color-gray);
  z-index: var(--z-nav);
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
