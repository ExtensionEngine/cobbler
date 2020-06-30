<template>
  <div class="container">
    <div class="cards">
      <course-card
        v-for="course in getEnrolledCourses"
        :key="course.id"
        :course="course"
        :enrolled="true" />
      <course-card
        v-for="course in getNotEnrolledCourses"
        :key="course.id"
        :course="course" />
    </div>
    <div class="page-btn">
      <button @click="paginateForward">next</button>
    </div>
  </div>
</template>

<script>
import compareAsc from 'date-fns/compareAsc';
import CourseCard from './CourseCard';
import { get } from '../../api/courses';
import parseISO from 'date-fns/parseISO';

export default {
  name: 'course-list',
  props: {
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      limit: 6,
      offset: 0,
      courses: { data: [] }
    };
  },
  computed: {
    getEnrolledCourses() {
      return this.courses.data.filter(course =>
        course.Users.find(user => user.email === this.$store.state.auth.email)
      );
    },
    getNotEnrolledCourses() {
      return this.courses.data
        .filter(
          course =>
            !course.Users.find(
              user => user.email === this.$store.state.auth.email
            )
        )
        .sort((prev, next) => {
          return compareAsc(parseISO(prev.updatedAt), parseISO(next.updatedAt));
        });
    }
  },
  methods: {
    paginateForward() {
      this.offset += this.limit;
    }
  },
  created() {
    get(`?limit=${this.limit}&offset=${this.offset}`).then(courses => {
      this.courses = courses.data;
    });
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

.page-btn {
  display: flex;
  justify-content: flex-end;
}

.cards {
  max-width: 1200px;
  margin: 20px auto;
  display: grid;
  grid: auto-flow auto / 1fr;
  grid-gap: var(--spacing-lg);
}

@media (min-width: 600px) {
  .cards {
    grid: auto-flow auto / repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cards {
    grid: auto-flow auto / repeat(3, 1fr);
  }
}
</style>
