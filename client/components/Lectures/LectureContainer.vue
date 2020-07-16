<template>
  <div>
    <h2 class="mb-md">Lectures:</h2>
    <ul class="list">
      <li v-for="lecture in testLectures" :key="lecture.id" class="lecture">
        <lecture-box
          :title="lecture.name"
          :description="lecture.description" />
      </li>
    </ul>
  </div>
</template>

<script>
import LectureBox from './LectureBox';

export default {
  name: 'lecture-container',
  data() {
    return {
      testLectures: [
        { id: 1, name: 'Introduction', description: 'text that is a good description of number 1' },
        { id: 2, name: 'C# Basics', description: 'text that is a good description of number 2' },
        { id: 3, name: 'Events and Delegates', description: 'text that is a good description of number 3' },
        { id: 4, name: 'Why C# is bad and you should switch to js', description: 'text that is a good description of number 4' },
        { id: 5, name: 'Introduction', description: 'text that is a good description of number 1' },
        { id: 6, name: 'C# Basics', description: 'text that is a good description of number 2' },
        { id: 7, name: 'Events and Delegates', description: 'text that is a good description of number 3' },
        { id: 8, name: 'Why C# is bad and you should switch to js', description: 'text that is a good description of number 4' }
      ]
    };
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
