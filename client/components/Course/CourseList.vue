<template>
  <div class="container">
    <ul>
      <li v-for="course in courses.courses.data" :key="course.id">
        <skeleton-loader
          v-if="loading"
          height="200px"
          width="80%" />
        <course-card
          v-else
          :title="course.name"
          :description="course.description"
          :end="course.endDate"
          :start="course.startDate" />
      </li>
    </ul>
  </div>
</template>

<script>
import CourseCard from './CourseCard';
import { mapState } from 'vuex';
import SkeletonLoader from '../common/SkeletonLoader';

export default {
  name: 'course-list',
  props: {
    loading: { type: Boolean, default: false }
  },
  computed: {
    ...mapState(['courses'])
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
    font-size: 70%;
  }

  ul {
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  li {
    flex-basis: 33%;
  }

</style>
