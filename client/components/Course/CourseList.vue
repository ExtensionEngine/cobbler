<template>
  <div class="container">
    <ul>
      <li v-for="course in getEnrolledCourses" :key="course.id">
        <skeleton-loader
          v-if="loading"
          height="200px"
          width="80%" />
        <course-card
          v-else
          :title="course.name"
          :category="course.Category.name"
          :users="course.Users"
          enrolled
          :description="course.description"
          :end="course.endDate"
          :start="course.startDate" />
      </li>
      <li v-for="course in getNotEnrolledCourses" :key="course.id">
        <skeleton-loader
          v-if="loading"
          height="200px"
          width="80%" />
        <course-card
          v-else
          :title="course.name"
          :category="course.Category.name"
          :users="course.Users"
          :description="course.description"
          :end="course.endDate"
          :start="course.startDate" />
      </li>
    </ul>
  </div>
</template>

<script>
import CourseCard from './CourseCard';
import { mapGetters } from 'vuex';
import SkeletonLoader from '../common/SkeletonLoader';

export default {
  name: 'course-list',
  props: {
    loading: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters(['getEnrolledCourses', 'getNotEnrolledCourses'])
  },
  mounted() {
    this.$store.dispatch('getCourses');
  },
  components: {
    CourseCard,
    SkeletonLoader
  }
};
</script>

<style lang="css" scoped>
  .container {
    padding: var(--spacing-md);
    font-size: 0.7rem;
  }

  ul {
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
  }

  li {
    flex-basis: 33%;
    flex-grow: 1;
  }

</style>
