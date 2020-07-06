<template>
  <div class="side-bar-wrapper">
    <base-search @search="handleSearch" class="search" />
    <category-filter />
    <div class="date-pick-group">
      <h3>Start Date</h3>
      <field label="Start">
        <base-input type="date" class="date-picker" outlined />
      </field>
      <field label="End">
        <base-input type="date" class="date-picker" outlined />
      </field>
    </div>
  </div>
</template>

<script>
import BaseInput from '../common/BaseInput';
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';
import Field from '../common/BaseForm/Field';

export default {
  name: 'side-bar',
  components: {
    BaseSearch, CategoryFilter, BaseInput, Field
  }
};
</script>

<style lang="css" scoped>

  .side-bar-wrapper {
    border-right: 1px solid var(--color-gray-500);
    width: 25%;
    padding: var(--spacing-sm);
    display: flex;
    flex-flow: column;
    height: calc(100vh - var(--navbar-height));
  }
  .side-bar-wrapper > * {
    margin-bottom: var(--spacing-md);
  }

  .date-pick-group .date-picker:first-of-type {
    margin-bottom: var(--spacing-sm);
  }

</style>
