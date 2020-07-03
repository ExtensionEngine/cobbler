<template>
  <div class="search-wrapper">
    <input
      v-model="search"
      @input="doSearch"
      type="text"
      class="search-input"
      placeholder="Search">
    <figure>
      <i class="material-icons">search</i>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'base-search',
  data() {
    return {
      search: ''
    };
  },
  methods: {
    doSearch() {
      this.$emit('search', this.search);
    }
  }
};
</script>

<style>
  .search-wrapper {
    color: var(--color-gray);
    border: 1px solid var(--color-gray-500);
    border-radius: 3px;
    padding: 5px;
    width: fit-content;
    display: flex;
    background-color: white;
  }

  .search-wrapper:focus-within {
    box-shadow: 0 0 0 2px var(--color-primary);
  }

  .search-input {
    border:none;
    vertical-align: middle;
    height: 30px;
    padding: 10px;
    margin: 0 10px;
    font-size: 0.8rem;
  }
  .search-input:focus {
    outline: none;
  }

  figure {
    margin: 0;
    margin-top: 2%;
  }
</style>
