<template>
  <div class="search-wrapper flex-h justify-space-between">
    <base-input
      v-on="$listeners"
      v-bind="$attrs"
      type="text"
      class="search-input"
      placeholder="Search" />
    <div class="mt-xxs mr-xxs">
      <i class="material-icons">search</i>
    </div>
  </div>
</template>

<script>
import BaseInput from '../common/BaseInput';

export default {
  name: 'base-search',
  components: { BaseInput }
};
</script>

<style>
.search-wrapper {
  color: var(--color-gray);
  border: 1px solid var(--color-gray-500);
  border-radius: var(--spacing-xxs);
  padding: var(--spacing-xxs);
  width: 100%;
  background-color: var(--color-white);
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
</style>
