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
      :enrolled="enrolled" />
  </container>
</template>

<script>
import { checkIfEnrolled, getById } from '../api/courses';
import Container from '../components/common/Container';
import CoursePage from '../components/Course/CoursePage';

export default {
  name: 'course-overview',
  data() {
    return {
      course: {},
      enrolled: false
    };
  },
  async created() {
    await getById(this.$route.params.id).then(course => {
      this.course = course.data.data;
    });
    await checkIfEnrolled(this.course.id).then(result => {
      const { enrolled } = result.data;
      this.enrolled = enrolled;
    });
  },
  components: {
    CoursePage, Container
  }
};
</script>

<style>

</style>
