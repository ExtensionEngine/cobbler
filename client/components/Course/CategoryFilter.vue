<template>
  <div>
    <h3>Categories</h3>
    <div
      v-for="category in categories"
      :key="category.id"
      class="filter-element">
      <input
        v-model="checkedCategories"
        @change="propagateChoice"
        :value="category.id"
        type="checkbox"
        class="mr-xxs">
      <span>{{ category.name }}</span>
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
      categories: [],
      checkedCategories: []
    };
  },
  methods: {
    propagateChoice() {
      this.$emit('checked', this.checkedCategories);
    }
  },
  created() {
    get().then(categories => {
      this.categories = categories.data.data;
    });
  }
};
</script>

<style lang="css" scoped>
  .filter-element {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    font-size: var(--text-sm);
  }

  span {
    margin-left: var(--spacing-xs);
  }

</style>
