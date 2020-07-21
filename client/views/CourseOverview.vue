<template>
  <container>
    <course-page
      :course="course" />
  </container>
</template>

<script>
import Container from '../components/common/Container';
import CoursePage from '../components/Course/CoursePage';
import { getCourse } from '../api/courses';

export default {
  name: 'course-overview',
  data() {
    return {
      course: { Category: {} }
    };
  },
  computed: {
    getAuthors() {
      if (!this.course.Users) return;
      return this.course.Users.filter(user => user.role === 'LECTURER');
    }
  },
  async created() {
    await getCourse(this.$route.params.id).then(course => {
      this.course = course.data;
    });
  },
  components: {
    CoursePage, Container
  }
};
</script>

<style>

</style>
