<template>
  <div class="search-wrapper">
    <input
      v-model="search"
      @input="doSearch"
      type="text"
      class="search-input"
      placeholder="Search">
    <div class="mt-xxs mr-xxs">
      <i class="material-icons">search</i>
    </div>
  </div>
</template>

<script>

import debounce from 'lodash/debounce';

export default {
  name: 'base-search',
  props: {
    debounce: { type: Boolean, default: false }
  },
  data() {
    return {
      search: ''
    };
  },
  methods: {
    doSearch: debounce(function () {
      this.$emit('search', this.search);
    }, debounce ? 400 : 0)
  }
};
</script>

<style>
  .search-wrapper {
    color: var(--color-gray);
    border: 1px solid var(--color-gray-500);
    border-radius: var(--spacing-xxs);
    padding: var(--spacing-xxs);
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
  }

  .search-wrapper:focus-within {
    box-shadow: 0 0 0 2px var(--color-info);
  }

  .search-input {
    border:none;
    vertical-align: middle;
    height: var(--spacing-lg);
    padding: var(--spacing-sm);
    width: 70%;
  }
  .search-input:focus {
    outline: none;
  }

  div {
    margin: 0;
  }
</style>
