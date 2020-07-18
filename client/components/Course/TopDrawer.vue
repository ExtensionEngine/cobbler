<template>
  <aside class="top-menu">
    <div class="search">
      <search-group @filter="handleFilterParams" class="search-group" />
    </div>
    <div class="menu-btns flex-h justify-space-between">
      <base-button @click="sendData" class="material-btn">Apply</base-button>
      <base-button @click="closeMenu" class="material-btn">Close</base-button>
    </div>
  </aside>
</template>

<script>

import BaseButton from '../common/BaseButton';
import { format } from 'date-fns';
import SearchGroup from './SearchGroup';

export default {
  name: 'top-drawer',
  data() {
    return {
      filterParams: {
        startDate: format(new Date(), 'yyyy-MM-dd')
      }
    };
  },
  methods: {
    closeMenu() {
      this.$emit('closed');
    },
    sendData() {
      this.$emit('closed', this.filterParams);
    },
    handleFilterParams(params) {
      this.filterParams = params;
    }
  },
  components: {
    SearchGroup, BaseButton
  }
};
</script>

<style lang="css" scoped>
.top-menu {
  overflow-x: hidden;
  overflow-y: auto;
  z-index: var(--z-drawer);
  width: 100%;
  position: fixed;
  padding: var(--spacing-sm);
  top: 0;
  height: 100%;
  background: var(--color-white);
  font-size: var(--text-sm);
}
.close-btn {
  padding: var(--spacing-sm);
}
.close-btn:hover {
  cursor: pointer;
}
.search-group{
  width: 100%;
}
.search {
  height: 90%;
}
.material-btn {
  padding: var(--spacing-sm) 0;
}
.material-btn:last-of-type {
  background: var(--color-error);
  color: var(--color-white);
}
.material-btn:first-of-type {
  background: var(--color-success);
  color: var(--color-white);
}
</style>
