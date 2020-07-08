<template>
  <div class="side-bar-wrapper">
    <base-search @search="searchHandler" class="mt-md" />
    <date-picker @dateChanged="dateHandler" />
    <category-filter @checked="categoryHandler" />
  </div>
</template>

<script>
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';
import DatePicker from './DatePicker';

export default {
  name: 'side-bar',
  data() {
    return {
      searchParams: {
        courseName: '',
        categories: [],
        startDate: '',
        endDate: ''
      }
    };
  },
  methods: {
    searchHandler(searchTerm) {
      this.searchParams.courseName = searchTerm;
      this.$emit('filter', this.searchParams);
    },
    categoryHandler(categories) {
      this.searchParams.categories = categories;
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
    align-items: start;
    padding: var(--spacing-xs);
    border-right: 1px solid var(--color-gray-500);
    overflow-y: scroll;
  }

</style>
