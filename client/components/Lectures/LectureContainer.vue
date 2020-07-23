<template>
  <div>
    <h2 class="mb-md">Lectures:</h2>
    <ul class="list">
      <li v-for="{ name, description, id } in lectures" :key="id" class="lecture">
        <lecture-box
          :title="name"
          :description="description" />
      </li>
    </ul>
  </div>
</template>

<script>
import LectureBox from './LectureBox';

export default {
  name: 'lecture-container',
  props: {
    lectures: { type: Array, default: () => [] }
  },
  components: {
    LectureBox
  }
};
</script>

<style lang="css" scoped>
  .list {
    list-style-type: none;
    padding: 0;
    overflow: scroll;
  }
  .lecture {
    border-top: 1px solid var(--color-gray-500);
  }
  .lecture:first-of-type {
    border-top: none;
  }
</style>
