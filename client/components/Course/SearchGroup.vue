<template>
  <div class="side-bar-wrapper align-start">
    <base-search v-model="name" class="mt-md" debounced />
    <h3 class="mt-md">Scheduled date</h3>
    <date-picker v-model="startDate" class="mt-xs" />
    <date-picker v-model="endDate" class="mt-xs" />
    <category-filter v-model="categoryId" class="mt-md" />
  </div>
</template>

<script>
import BaseSearch from '../common/BaseSearch';
import CategoryFilter from './CategoryFilter';
import DatePicker from './DatePicker';
import debounce from 'lodash/debounce';
import { format } from 'date-fns';
import pick from 'lodash/pick';

export default {
  name: 'search-group',
  data() {
    return {
      name: '',
      categoryId: [],
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: ''
    };
  },
  computed: {
    immediateFilters() {
      const filters = ['categoryId', 'startDate', 'endDate'];
      return pick(this.$data, filters);
    }
  },
  methods: {
    filter() {
      this.$emit('filter', this.$data);
    },
    debouncedFilter: debounce(function () {
      this.filter();
    }, 400)
  },
  watch: {
    name: 'debouncedFilter',
    immediateFilters: 'filter'
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
  font-size: var(--text-sm);
  height: calc(100vh - var(--navbar-height));
  grid: auto-flow max-content / 1fr;
  padding: var(--spacing-sm);
  overflow-y: scroll;
  width: 100px;
}
</style>
