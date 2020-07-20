<template>
  <div
    v-if="course"
    @click="handleCourseClick(course.id)"
    class="course-card">
    <div>
      <h3 class="course-title">{{ course.name }}</h3>
      <p>{{ course.description }}</p>
      <span v-if="course.startDate && course.endDate">
        {{ course.startDate | formatDate }} - {{ course.endDate | formatDate }}
      </span>
      <span v-else>There is no start or end date set</span>
    </div>
    <div class="category">
      <span>{{ course.category.name }}</span>
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
.course-title {
  margin: 0;
}
</style>
