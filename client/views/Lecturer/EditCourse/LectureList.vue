<template>
  <div class="lecture-list flex-h justify-center">
    <collapsible
      v-for="{ id, name, expanded, description } in lectures"
      :key="id"
      @toggle-expand="handleExpandToggle"
      :id="id"
      :title="name"
      :expanded="expanded"
      class="lecture">
      <p>{{ description || 'No description available yet' }}</p>
    </collapsible>
    <p v-if="!lectures.length">No lectures added yet!</p>
  </div>
</template>

<script>
import Collapsible from '../../../components/common/Collapsible';

export default {
  name: 'lecture-list',
  props: {
    lectures: { type: Array, required: true }
  },
  methods: {
    handleExpandToggle(lectureId) {
      this.$emit('expand', lectureId);
    }
  },
  components: {
    Collapsible
  }
};
</script>

<style scoped>
.lecture {
  margin: var(--spacing-sm) 0;
  flex-basis: 50%;
}
.lecture-list {
  flex-wrap: wrap;
}
@media only screen and (max-width: 480px) {
  .lecture {
    flex-basis: 100%;
  }
}
</style>
