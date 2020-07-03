<template>
  <div class="side-bar-wrapper">
    <base-search @search="handleSearch" />
    <category-filter />
  </div>
</template>

<script>
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';

export default {
  name: 'side-bar',
  components: {
    BaseSearch, CategoryFilter
  }
};
</script>

<style>
  .side-bar-wrapper {
    border-right: 1px solid var(--color-gray-500);
    width: 25%;
    padding: 10px;
    display: flex;
    flex-flow: column;
  }
</style>
