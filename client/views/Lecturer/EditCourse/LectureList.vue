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
      <base-button
        @click="toEdit(lecture.id)"
        class="edit-btn mb-xs">
        Edit
      </base-button>
    </collapsible>
    <p v-if="!lectures.length">No lectures added yet!</p>
  </div>
</template>

<script>
import BaseButton from '../../../components/common/BaseButton';
import Collapsible from '../../../components/common/Collapsible';
import paths from '../../../router/paths';

export default {
  name: 'lecture-list',
  props: {
    lectures: { type: Array, required: true }
  },
  methods: {
    handleExpandToggle(lectureId) {
      this.$emit('expand', lectureId);
    },
    toEdit(lectureId) {
      this.$router.push(paths.lecturer.editLecture(lectureId));
    }
  },
  components: {
    BaseButton,
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
.edit-btn {
  background: var(--color-gray-500);
  color: var(--color-black);
}
@media only screen and (max-width: 480px) {
  .lecture {
    flex-basis: 100%;
  }
}
</style>
