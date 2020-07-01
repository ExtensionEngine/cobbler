<template>
  <div class="lecture-list">
    <collapsible
      v-for="lecture in lectures"
      :key="lecture.id"
      @toggleExpand="handleExpandToggle"
      :id="lecture.id"
      :title="lecture.name"
      :expanded="lecture.expanded"
      class="lecture">
      <p>{{ lecture.description || 'No description available yet' }}</p>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media only screen and (max-width: 480px) {
  .lecture {
    flex-basis: 100%;
  }
}
</style>
