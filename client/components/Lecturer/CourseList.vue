<template>
  <div>
    <template v-if="loading">
      <div v-for="n in 5" :key="n" class="course-card"></div>
    </template>
    <div v-else-if="!courses.length" class="no-content">There are no courses so far</div>
    <course-card
      v-for="course in courses"
      :key="course.id"
      :course="course"
      clickable />
  </div>
</template>

<script>
import CourseCard from './CourseCard';
import { getMyCourses } from '../../api/courses';

export default {
  name: 'lecturer-course-list',
  data: () => ({ courses: [], loading: true }),
  async created() {
    try {
      const { data } = await getMyCourses();
      this.courses = data;
    } catch (err) {
      this.$toasted.global.formError({ message: 'Something went wrong while getting you courses' });
    } finally {
      this.loading = false;
    }
  },
  components: {
    CourseCard
  }
};
</script>

<style scoped>
.course-card {
  background: var(--color-gray-500);
  border: solid 2px var(--color-black);
  padding: var(--spacing-xs);
  position: relative;
  cursor: pointer;
}
.course-card:empty {
  height: 90px;
  padding: 0
}
.course-card:empty:after {
  content: '';
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: linear-gradient(var(--color-gray), var(--color-gray)),
      linear-gradient(var(--color-gray), var(--color-gray)),
      linear-gradient(var(--color-gray), var(--color-gray)),
      linear-gradient(var(--color-gray), var(--color-gray));
  background-size: 160px 25px,
    350px 15px,
    200px 15px,
    65px 15px;
  background-position: 10px 8px,
    10px 40px,
    10px 62px,
    99% 90%;
  background-repeat: no-repeat;
  animation: loadingGradient 1.5s infinite;
}
.no-content {
  text-align: center;
  padding: var(--spacing-sm) 0;
}
@media only screen and (max-width: 480px) {
  .course-card:empty:after {
    background-size: 160px 25px,
    230px 15px,
    150px 15px,
    55px 15px;
  }
}
@keyframes loadingGradient {
  0% {
    opacity: .3;
  }
  100% {
    opacity: .8;
  }
}
</style>
