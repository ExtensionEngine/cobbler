<template>
  <container>
    <course-page
      :course="course"
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
      course: { Category: {} },
      enrolled: false
    };
  },
  computed: {
    getAuthors() {
      if (!this.course.Users) return;
      return this.course.Users.filter(user => user.role === 'LECTURER');
    }
  },
  async created() {
    await getById(this.$route.params.id).then(course => {
      this.course = course.data.data;
    });
    await checkIfEnrolled(this.course.id).then(course => {
      const { enrolled } = course.data;
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
