<template>
  <container>
    <course-page
      :title="course.data.name"
      :description="course.data.description"
      :category="course.data.Category.name" />
  </container>
</template>

<script>
import Container from '../components/common/Container';
import CoursePage from '../components/Course/CoursePage';
import { getById } from '../api/courses';

export default {
  data() {
    return {
      course: {}
    };
  },
  async mounted() {
    this.course = await getById(this.$route.params.id);
  },
  components: {
    CoursePage, Container
  }
};
</script>

<style>

</style>
