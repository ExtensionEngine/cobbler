<template>
  <div>
    <h4 class="mb-sm">Categories</h4>
    <div
      v-for="category in categories"
      :key="category.id"
      class="filter-element flex-h justify-start mb-sm">
      <input
        v-model="checkedCategories"
        @change="propagateChoice"
        :value="category.id"
        type="checkbox"
        class="mr-xxs">
      <span class="ml-xs">{{ category.name }}</span>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { getAll } from '../../api/categories';

export default {
  name: 'category-filter',
  data() {
    return {
      categories: [],
      checkedCategories: []
    };
  },
  methods: {
    propagateChoice() {
      this.$emit('checked', this.checkedCategories);
    }
  },
  mounted() {
    getAll().then(categories => {
      this.categories = categories.data.data;
    });
  }
};
</script>
