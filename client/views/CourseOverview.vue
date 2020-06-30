<template>
  <container>
    <course-page
      :id="course.id"
      :title="course.name"
      :description="course.description"
      :category="course.Category.name"
      :start="course.startDate"
      :end="course.endDate"
      :users="course.Users"
      :enrolled="true" />
  </container>
</template>

<script>
import Container from '../components/common/Container';
import CoursePage from '../components/Course/CoursePage';
import { getById } from '../api/courses';

export default {
  name: 'course-overview',
  data() {
    return {
      course: {}
    };
  },
  computed: {
  },
  async mounted() {
    await getById(this.$route.params.id).then(course => {
      this.course = course.data;
    });
    // TODO - SEE IF ENROLLED
  },
  components: {
    CoursePage, Container
  }
};
</script>

<style>

</style>
