<template>
  <div class="side-bar-wrapper align-start">
    <base-search @search="searchHandler" class="mt-md" debounce />
    <date-picker @dateChanged="dateHandler" debounce />
    <category-filter @checked="categoryHandler" />
  </div>
</template>

<script>
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';
import DatePicker from './DatePicker';
import { format } from 'date-fns';

export default {
  name: 'side-bar',
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
    searchHandler(searchTerm) {
      this.searchParams.name = searchTerm;
      this.$emit('filter', this.searchParams);
    },
    categoryHandler(categories) {
      this.searchParams.categoryId = categories;
      this.$emit('filter', this.searchParams);
    },
    dateHandler({ startDate, endDate }) {
      this.searchParams.startDate = startDate;
      this.searchParams.endDate = endDate;
      this.$emit('filter', this.searchParams);
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
    max-width: 20%;
    height: calc(100vh - var(--navbar-height));
    grid: auto-flow auto / 1fr;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-right: 1px solid var(--color-gray-500);
    overflow-y: scroll;
  }

</style>
