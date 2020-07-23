<template>
  <div>
    <h3 class="mb-sm">Categories</h3>
    <div
      v-for="category in categories"
      :key="category.id"
      class="filter-element flex-h justify-start mb-sm">
      <label class="ml-xs">
        <input
          v-model="checkedCategories"
          @change="$emit('input', checkedCategories)"
          :value="category.id"
          type="checkbox"
          class="mr-xxs">
        {{ category.name }}
      </label>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { getAllCategories } from '../../api/categories';

export default {
  name: 'category-filter',
  data() {
    return {
      categories: [],
      checkedCategories: []
    };
  },
  mounted() {
    getAllCategories().then(categories => {
      this.categories = categories.data;
    });
  }
};
</script>
