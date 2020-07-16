<template>
  <div class="side-bar-wrapper align-start">
    <base-search @search="inputHandler($event, 'name')" class="mt-md" debounced />
    <h4 class="mb-sm">Scheduled date</h4>
    <date-picker @date-changed="inputHandler($event, 'startDate')" />
    <date-picker @date-changed="inputHandler($event, 'endDate')" />
    <category-filter @checked="inputHandler($event, 'categoryId')" />
  </div>
</template>

<script>
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';
import DatePicker from './DatePicker';
import { format } from 'date-fns';

export default {
  name: 'search-group',
  data() {
    return {
      searchParams: {
        name: '',
        categoryId: [],
        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: ''
      }
    };
  },
  methods: {
    inputHandler(event, key) {
      this.searchParams[key] = event;
    }
  },
  watch: {
    searchParams: {
      handler() {
        this.$emit('filter', this.searchParams);
      },
      deep: true
    }
  },
  components: {
    BaseSearch,
    CategoryFilter,
    DatePicker
  }
};
</script>

<style lang="css" scoped>
.side-bar-wrapper {
  display: grid;
  height: calc(100vh - var(--navbar-height));
  grid: auto-flow auto / 1fr;
  padding: var(--spacing-sm);
  overflow-y: scroll;
  width: 100px;
}
</style>
