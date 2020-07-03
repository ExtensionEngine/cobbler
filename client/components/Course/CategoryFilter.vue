<template>
  <div>
    <h3>Categories</h3>
    <div
      v-for="category in categories"
      :key="category.id"
      class="filter-element">
      <input type="checkbox" class="mr-xxs">
      {{ category.name }}
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { get } from '../../api/categories';

export default {
  name: 'category-filter',
  data() {
    return {
      categories: []
    };
  },
  created() {
    get().then(categories => {
      this.categories = categories.data.data;
    });
  }
};
</script>

<style lang="css">
  .filter-element {
    margin: 5px;
    display: flex;
    justify-content: start;
  }

</style>
