<template>
  <div>
    <nav class="navbar">
      <base-button
        @click="handleExpand"
        filled
        primary>
        expand
      </base-button>
      <base-button
        @click="handleLogout"
        filled
        primary>
        logout
      </base-button>
    </nav>
    <transition name="slide">
      <aside
        v-if="isSidebarExpanded"
        class="sidebar">
      </aside>
    </transition>
    <transition name="fade">
      <div
        v-if="isSidebarExpanded"
        @click="handleExpand"
        class="sidebar-backdrop"></div>
    </transition>
    <div
      class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton';

export default {
  name: 'main-layout',
  data() {
    return {
      isSidebarExpanded: false
    };
  },
  methods: {
    handleExpand() {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    },
    handleLogout() {
      this.$store.dispatch('logout');
    }
  },
  components: {
    'base-button': BaseButton
  }
};
</script>

<style scoped>
.navbar {
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 40px;
    background: #24292e;
    z-index: 1;
}
.sidebar {
    position: fixed;
    top: 40px;
    left: 0;
    width: 300px;
    height: 100%;
    background: #888888;
    z-index: 1;
}
.main-content {
}
.sidebar-backdrop {
    position: fixed;
    top: 40px;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
}
.slide-enter-active,
.slide-leave-active
{
    transition: transform 0.2s ease;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 150ms ease-in .1s;
}
.fade-enter-active {
    transition: opacity .5s;
    transition-delay: .1s;
}
.fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
