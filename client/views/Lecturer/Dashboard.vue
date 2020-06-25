<template>
  <div>
    <div v-for="course in courses" :key="course.id" class="course-card">
      <h3 class="course-title">{{ course.name }}</h3>
      <p>{{ course.description }}</p>
      <span>{{ parseDate(course.startDate) }} - {{ parseDate(course.endDate) }}</span>
    </div>
    <base-button
      @click="handleCreateNewCourse"
      contained
      primary>
      Create new course
    </base-button>
  </div>
</template>

<script>
import BaseButton from '../../components/common/BaseButton';
import { getMyCourses } from '../../api/courses';
import paths from '../../router/paths';

export default {
  name: 'lecturer-dashboard',
  data() {
    return ({
      courses: []
    });
  },
  methods: {
    handleCreateNewCourse() {
      this.$router.push(paths.lecturer.addCourse);
    },
    parseDate(date) {
      return new Date(date).toDateString();
    }
  },
  async mounted() {
    const { data } = await getMyCourses();
    this.courses = data;
  },
  components: {
    BaseButton
  }
};
</script>

<style>
.course-card {
  background: var(--color-gray-500);
  border: solid 2px var(--color-black);
  padding: var(--spacing-xs);
}
.course-title {
  margin: 0;
}
</style>
