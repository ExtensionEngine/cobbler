<template>
  <div class="side-bar-wrapper">
    <base-search @search="searchHandler" class="search" />
    <category-filter @checked="categoryHandler" />
    <date-picker @dateChanged="dateHandler" />
    <base-button @click="emitFilterParams" class="filter-btn">
      Filter
    </base-button>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
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
    },
    categoryHandler(categories) {
      this.searchParams.categories = categories;
    },
    dateHandler({ startDate, endDate }) {
      this.searchParams.startDate = startDate;
      this.searchParams.endDate = endDate;
    },
    emitFilterParams() {
      this.$emit('filter', this.searchParams);
    }
  },
  components: {
    BaseButton,
    BaseSearch,
    CategoryFilter,
    DatePicker
  }
};
</script>

<style lang="css" scoped>

  .side-bar-wrapper {
    border-right: 1px solid var(--color-gray-500);
    max-width: 20%;
    padding: var(--spacing-sm);
    display: flex;
    flex-flow: column;
    height: calc(100vh - var(--navbar-height));
  }
  .side-bar-wrapper > * {
    margin-bottom: var(--spacing-xxs);
  }

  .filter-btn {
    color: var(--color-green);
    border: none;
    background-color: var(--color-accent);
    box-shadow: 0 2px 3px var(--color-gray), 0 2px 3px var(--color-gray);
    padding: var(--spacing-xs) var(--spacing-sd);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing-xxxs);
  }

  .filter-btn:focus {
    outline: none;
    box-shadow: inset 0px 0px 5px #c1c1c1;
  }

</style>
