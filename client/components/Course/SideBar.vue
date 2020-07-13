<template>
  <aside class="side-menu">
    <i @click="closeMenu" class="material-icons close-btn">close</i>
    <search-group @filter="handleFilterParams" />
  </aside>
</template>

<script>

import { format } from 'date-fns';
import SearchGroup from './SearchGroup';

export default {
  name: 'side-bar',
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      filterParams: {
        startDate: format(new Date(), 'yyyy-MM-dd')
      }
    };
  },
  methods: {
    closeMenu() {
      this.show = false;
      this.$emit('closed', this.filterParams);
    },
    handleFilterParams(params) {
      this.filterParams = params;
    }
  },
  components: {
    SearchGroup
  }
};
</script>

<style lang="css" scoped>
.side-menu {
  margin-top: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 300;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0%;
  background: var(--color-white);
  font-size: 0.7rem;
}
.close-btn {
  padding: 10px;
}
.close-btn:hover {
  cursor: pointer;
}

</style>
