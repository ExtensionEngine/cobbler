<template>
  <div>
    <h1>Home</h1>
    <course-list />
  </div>
</template>

<script>
import CourseList from '../components/Course/CourseList';

export default {
  name: 'home',
  components: {
    CourseList
  }
};
</script>

<style scoped>

</style>
