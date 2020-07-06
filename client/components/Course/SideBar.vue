<template>
  <div class="side-bar-wrapper">
    <base-search @search="handleSearch" class="search" />
    <category-filter />
    <div class="date-pick-group">
      <h3>Scheduled date</h3>
      <field label="Start Date">
        <base-input type="date" class="date-picker" outlined />
      </field>
      <field label="End Date">
        <base-input type="date" class="date-picker" outlined />
      </field>
    </div>
    <base-button class="filter-btn">
      Filter
    </base-button>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';
import Field from '../common/BaseForm/Field';

export default {
  name: 'side-bar',
  components: {
    BaseButton,
    BaseInput,
    BaseSearch,
    CategoryFilter,
    Field
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
    margin-bottom: var(--spacing-sm);
  }

  .date-pick-group .date-picker:first-of-type {
    margin-bottom: var(--spacing-sm);
  }
  .filter-btn {
    color: var(--color-green);
    border: none;
    background-color: var(--color-accent);
    box-shadow: 0 2px 3px var(--color-gray), 0 2px 3px var(--color-gray);
    padding: 8px 15px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing-xxxs);
  }

  .filter-btn:focus {
    outline: none;
    box-shadow: inset 0px 0px 5px #c1c1c1;
  }

</style>
