<template>
  <div
    v-if="course"
    @click="handleCourseClick(course.id)"
    class="course-card">
    <div class="card-info">
      <h3 class="course-title">{{ course.name }}</h3>
      <p>{{ course.description }}</p>
      <span>{{ getDateRange(course) }}</span>
    </div>
    <div class="category">
      <span>{{ course.Category.name }}</span>
    </div>
  </div>
</template>

<script>
import paths from '../../router/paths';

export default {
  name: 'course-card',
  props: {
    course: { type: Object, required: true }
  },
  methods: {
    getDateRange({ startDate, endDate }) {
      if (!startDate || !endDate) {
        return 'The start date, end date or both are not defined yet!';
      }
      return `${new Date(startDate).toDateString()} - ${new Date(endDate).toDateString()}`;
    },
    handleCourseClick(id) {
      this.$router.push(paths.lecturer.editCourse(id));
    }
  }
};
</script>

<style scoped>
.category {
  align-self: flex-end;
  flex-basis: 150px;
  text-align: end;
}
.card-info {
  flex-grow: 1;
}
.course-title {
  margin: 0;
}
</style>
