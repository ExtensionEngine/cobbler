<template>
  <div class="side-bar-wrapper align-start">
    <base-search @search="searchHandler" class="mt-md" debounce />
    <date-picker @dateChanged="dateHandler" />
    <category-filter @checked="categoryHandler" />
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
    searchHandler(searchTerm) {
      this.searchParams.name = searchTerm;
    },
    categoryHandler(categories) {
      this.searchParams.categoryId = categories;
    },
    dateHandler({ startDate, endDate }) {
      this.searchParams.startDate = startDate;
      this.searchParams.endDate = endDate;
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

  .side-bar-wrapper > * {
    max-width: 100%;
  }

</style>
