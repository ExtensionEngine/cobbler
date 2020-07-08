<template>
  <div>
    <h4 class="mb-sm">Categories</h4>
    <div
      v-for="category in categories"
      :key="category.id"
      class="filter-element mb-sm">
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
import debounce from 'lodash/debounce';
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
    propagateChoice: debounce(function () {
      this.$emit('checked', this.checkedCategories);
    }, 400)
  },
  mounted() {
    get().then(categories => {
      this.categories = categories.data.data;
    });
  }
};
</script>

<style lang="css" scoped>
  .filter-element {
    display: flex;
    justify-content: flex-start;
    font-size: var(--text-sd);
  }

  span {
    margin-left: var(--spacing-xs);
  }

</style>
