<template>
  <container>
    <course-page
      :id="course.data.id"
      :title="course.data.name"
      :description="course.data.description"
      :category="course.data.Category.name"
      :start="course.data.startDate"
      :end="course.data.endDate"
      :users="course.data.Users"
      :enrolled="enrolled" />
  </container>
</template>

<script>
import Container from '../components/common/Container';
import CoursePage from '../components/Course/CoursePage';
import { getById } from '../api/courses';
import { mapGetters } from 'vuex';

export default {
  name: 'course-overview',
  data() {
    return {
      course: {}
    };
  },
  computed: {
    ...mapGetters(['getEnrolledCourses', 'getNotEnrolledCourses']),
    enrolled() {
      for (const i in this.getEnrolledCourses) {
        if (this.getEnrolledCourses[i].id === this.course.data.id) {
          return true;
        }
      }
      return false;
    }
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
