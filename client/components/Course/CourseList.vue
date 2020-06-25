<template>
  <div class="container">
    <ul>
      <li v-for="course in getEnrolledCourses" :key="course.id">
        <course-card
          :id="course.id"
          :title="course.name"
          :category="course.Category.name"
          :users="course.Users"
          enrolled
          :description="course.description"
          :end="course.endDate"
          :start="course.startDate" />
      </li>
      <li v-for="course in getNotEnrolledCourses" :key="course.id">
        <course-card
          :id="course.id"
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
import { mapActions, mapGetters } from 'vuex';
import CourseCard from './CourseCard';

export default {
  name: 'course-list',
  props: {
    loading: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters(['getEnrolledCourses', 'getNotEnrolledCourses']),
    ...mapActions(['getCourses'])
  },
  mounted() {
    this.getCourses();
  },
  components: {
    CourseCard
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
    flex-basis: 30%;
    flex-grow: 1;
    margin: var(--spacing-xxs);
  }

</style>
