<template>
  <div>
    <div v-for="course in courses" :key="course.id" class="course-card">
      <span class="category">{{ course.Category.name }}</span>
      <h3 class="course-title">{{ course.name }}</h3>
      <p>{{ course.description }}</p>
      <span>{{ getDateRange(course) }}</span>
    </div>
  </div>
</template>

<script>
import { getMyCourses } from '../../api/courses';

export default {
  name: 'lecturer-course-list',
  data() {
    return ({
      courses: []
    });
  },
  methods: {
    getDateRange({ startDate, endDate }) {
      if (!startDate || !endDate) {
        return 'The start date, end date or both are not defined yet!';
      }
      return `${new Date(startDate).toDateString()} - ${new Date(endDate).toDateString()}`;
    }
  },
  async mounted() {
    const { data } = await getMyCourses();
    this.courses = data;
  }
};
</script>

<style scoped>
.category {
  position: absolute;
  top: 0;
  right: 0;
}
.course-card {
  background: var(--color-gray-500);
  border: solid 2px var(--color-black);
  padding: var(--spacing-xs);
  position: relative;
}
.course-title {
  margin: 0;
}
</style>
