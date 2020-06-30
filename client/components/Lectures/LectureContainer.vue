<template>
  <div class="lecture-container">
    <ul class="lecture-list">
      <li v-for="lecture in dummyLectures" :key="lecture.id">
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
      dummyLectures: [
        { id: 1, name: 'Introduction', description: 'text that is a good description of number 1' },
        { id: 2, name: 'C# Basics', description: 'text that is a good description of number 2' },
        { id: 3, name: 'Events and Delegates', description: 'text that is a good description of number 3' },
        { id: 4, name: 'Why C# is trash and you should switch to js', description: 'text that is a good description of number 4' },
        { id: 5, name: 'Introduction', description: 'text that is a good description of number 1' },
        { id: 6, name: 'C# Basics', description: 'text that is a good description of number 2' },
        { id: 7, name: 'Events and Delegates', description: 'text that is a good description of number 3' },
        { id: 8, name: 'Why C# is trash and you should switch to js', description: 'text that is a good description of number 4' }
      ]
    };
  },
  components: {
    LectureBox
  }
};
</script>

<style lang="css" scoped>
  .lecture-container {
    background: rgb(247, 247, 247);
  }
  .lecture-list {
    list-style-type: none;
    padding: 0;
    height : 300px;
    overflow: scroll;
  }

</style>
