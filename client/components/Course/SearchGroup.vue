<template>
  <div class="side-bar-wrapper align-start">
    <base-search v-model="name" class="mt-md" debounced />
    <h4 class="mb-sm">Scheduled date</h4>
    <date-picker v-model="startDate" />
    <date-picker v-model="endDate" />
    <category-filter v-model="categoryId" />
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
      name: '',
      categoryId: [],
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: ''
    };
  },
  methods: {
    inputHandler(event, key) {
      this.searchParams[key] = event;
    }
  },
  watch: {
    $data: {
      handler() {
        this.$emit('filter', this.$data);
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
</style>
