<template>
  <nav class="nav flex-h align-center justify-space-between">
    <button v-if="!$isTablet" class="menu-btn"><i class="material-icons">menu</i></button>
    <div class="nav-title flex-h justify-space-between">
      <i class="material-icons">analytics</i>
      <span class="mt-xxs ml-sm">Cobbler LMS</span>
    </div>
    <div v-if="$isSmallScreen" class="flex-h justify-end">
      <base-button
        @click="logout"
        class="nav-item clickable material-btn auth-btn">
        Logout
      </base-button>
      <span
        class="nav-item ">
        {{ $store.state.auth.email }}
      </span>
    </div>
  </nav>
</template>

<script>
import BaseButton from '../common/BaseButton';

export default {
  name: 'navbar',
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  components: {
    BaseButton
  }
};
</script>

<style lang="css" scoped>

.menu-btn {
  background: none;
  border: none;
  padding: 0;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-primary);
  height: var(--spacing-xl);
  padding: 0 var(--spacing-md);
  box-shadow: 2px 2px 4px 0px var(--color-gray);
  z-index: var(--z-nav);
}
.nav-item {
  background: var(--color-gray-500);
  border-radius: var(--spacing-xxs);
  margin: 0 var(--spacing-xs);
  padding: var(--spacing-xxs) var(--spacing-xs);
  box-shadow: 2px 2px 2px 0px var(--color-gray-500);
}
.nav-title i {
  color: var(--color-accent);
}
.nav-title span {
  color: var(--color-white);
}
.auth-btn {
  background-color: var(--color-success);
  color: var(--color-white);
  box-shadow: 0 2px 3px var(--color-primary), 0 2px 3px var(--color-gray);
}
.clickable {
  cursor: pointer;
}
</style>
